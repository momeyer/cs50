import os

from flask import Flask, render_template, request, flash
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

app = Flask(__name__)


DATABASE_URL="postgresql://monique:monique@localhost:5432/monique"
engine = create_engine(DATABASE_URL)
db = scoped_session(sessionmaker(bind=engine))

        
def registration_form_info_is_correct(name, lastname, username, password, password_confirmation, avatar):
    if name.isspace() or lastname.isspace() or username.isspace() or password.isspace():
        render_template("error.html", message="Please make sure to provide all the information and try again")
        return False
   
    if not Database.check_if_username_is_available(username):
        render_template("error.html", message="username not available")
        return False

    if password != password_confirmation:
        render_template("error.html", message="Password confirmation doesn't match")
        return False

    if avatar == '':
        render_template("error.html", message="Please choose an avatar")
        return False
    
    return True


class Database():

    @staticmethod
    def select_all_users():
        return db.execute("select * from users")

    @staticmethod
    def select_username_password(username, password):
       return db.execute("SELECT * FROM users WHERE username = :username", {"username": username}).fetchone()

    @staticmethod
    def insert_into_users(name, lastname, password, username, avatar):
            db.execute("INSERT INTO users (first_name, last_name, pw, username, avatar) VALUES (:fname, :lname, :pw, :username, :avatar)",
                {"fname":name, "lname": lastname, "pw": password, "username":username, "avatar":avatar})
            db.commit()
    
    @staticmethod
    def check_if_username_is_available(username):
        return db.execute("SELECT * FROM users WHERE username=:username", {"username": username}).rowcount == 0

    @staticmethod
    def insert_into_reviews(user_id, review, rate, book_id):
        db.execute("INSERT INTO reviews (user_id, review, rate, book_id) VALUES (:user_id, :review, :rate, :book_id)",
                    {"user_id":user_id, "review": review, "rate": rate, "book_id":book_id})
        db.commit()

    @staticmethod
    def select_reviews(book_id):
        reviews = db.execute(f"SELECT * FROM reviews WHERE book_id='{book_id}'").fetchall()
        user_name_avatar = Database.get_users_name_avatar(reviews)
        return reviews, user_name_avatar

    @staticmethod
    def get_users_name_avatar(reviews):
        user_name_avatar = {}
        for review in reviews:    
            user = db.execute(f"SELECT username, avatar FROM users WHERE id='{review.user_id}'").fetchone()
            user_name_avatar[review.user_id] = [user.username, user.avatar]      
        
        return user_name_avatar

    @staticmethod
    def select_best_books(avg_review=4.5):
        return db.execute(f"select * from books where goodreads_avg_review>{avg_review} order by goodreads_avg_review desc;").fetchall()

    @staticmethod
    def select_all_books():
        return db.execute("select * from books order by title").fetchall()
    
    @staticmethod
    def search_all_books_with(search_content):
        where = ['author', 'title', 'isbn']
        result = []
        for query_name in where:
            sql = f"SELECT * FROM books WHERE {query_name} Like '%{search_content}%'"
            books = db.execute(sql).fetchall()
            for book in books:
                result.append(book)
        return result

    @staticmethod
    def select_book_by_id(book_id):
        return db.execute("SELECT * FROM books WHERE id = :id", {"id": book_id}).fetchone()



@app.route("/")
def index():
    return render_template("index.html")


@app.route("/success", methods=["POST"])
def register():
    name = request.form.get("name")
    lastname = request.form.get("lname")
    username = request.form.get("username")
    password = request.form.get("password")
    password_confirmation = request.form.get("password_confirmation")
    avatar = request.form.get("avatar")

    if registration_form_info_is_correct(name, lastname, username, password, password_confirmation, avatar):
        Database.insert_into_users(name, lastname, password, username, avatar)
        return render_template("index.html")
    else:
        return render_template("error.html", message="provide correct info")


@app.route("/welcome", methods=["POST"])
def login():
    username = request.form.get("username")
    password = request.form.get("password")
    
    user_info = Database.select_username_password(username, password)

    if user_info != None:
        if password == user_info.pw:
            books_list = Database.select_best_books()
            return render_template("home.html", books_list=books_list, pagetitle="Best Books")
        else:
            return render_template("error.html", message="Wrong password.")    
    else:    
        return render_template("error.html", message="You are not a member")


@app.route("/search-result",methods=["POST"])
def search():
    search_content = request.form.get("search")

    result = Database.search_all_books_with(search_content)

    pagetitle = f" Result for '{search_content}'"

    return render_template("search_result.html", books_list=result, pagetitle=pagetitle)


@app.route("/all-books")
def all_books():
    all_books_list = Database.select_all_books()
    return render_template("all_books.html", books_list=all_books_list, pagetitle="All Books A-Z")

@app.route("/all-books/<int:book_id>")
def more(book_id):
    # Make sure flight exists.
    book = Database.select_book_by_id(book_id)
    
    if book is None:
        return render_template("error.html")
    else:
        reviews_list, username_avatar = Database.select_reviews(book_id)
        return render_template("book.html", book=book,reviews_list=reviews_list, user_info=username_avatar, pagetitle="Reviews from others")


@app.route("/submited/<int:book_id>", methods=["POST"])
def submit_review(book_id):
    user_id = 1
    review = request.form.get("review")
    rate = request.form.get("rate")
    
    if review == '':
        return render_template("error.html")
    
    else:
        Database.insert_into_reviews(user_id, review, rate, book_id)
        
        return render_template("all_books.html")
