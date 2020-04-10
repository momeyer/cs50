import os

from flask import Flask, render_template, request, flash
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

app = Flask(__name__)


DATABASE_URL="postgresql://monique:monique@localhost:5432/monique"
engine = create_engine(DATABASE_URL)
db = scoped_session(sessionmaker(bind=engine))



class User():

    def register(self, first_name, last_name, username, password):
        registration_form = {'first_name' : first_name, "last_name" : last_name, "username": username, "password":password}

        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.password = password

        return registration_form
        
    def login(self):
        pass
    
    def logout(self):
        pass


class AnimalBooks():

    def __init__(self):

        self.users = db.execute("select * from users")
        self.usernames_list = []

        for user in self.users:
            self.usernames_list.append(user.username)
            print(self.usernames_list)

    def _check_if_available(self, username):
        print(">>>>>>")
        if username in self.usernames_list:
            print("false")
            return False
        else:
            print('true')
            return True

    def register_new_user(self, registration_form):
        
        username = registration_form["username"]
    
        if self._check_if_available(username):
            # new_user = db.execute("INSERT INTO users (first_name, last_name, pw, username) VALUES (:first_name, :last_name, :password, :username)", {"first_name": registration_form["first_name"], "last_name": registration_form["last_name"], "password":registration_form["password"], "username":registration_form["username"]})
            print(f"first_name: {registration_form['first_name']} , last_name: {registration_form['last_name']}, password: {registration_form['password']}, username: {registration_form['username']}")
            # db.commit()
            return True
        else:
            print("username NOT available")
            return None

    @staticmethod
    def select_best_books(number_of_books=16, number_of_col=5):
        books = db.execute("select * from books where goodreads_avg_review>4.5 order by goodreads_avg_review desc;").fetchmany(number_of_books)
        books_list = []
        prev = 0
        for i in range(number_of_col,number_of_books,number_of_col):
            books_list.append(books[prev:i])
            prev = i

        return books_list

    @staticmethod
    def select_all_books(number_of_books=5001, number_of_col=5):
        all_books = db.execute("select * from books order by title").fetchmany(number_of_books)
        all_books_list = []
        prev = 0
        for i in range(number_of_col,number_of_books,number_of_col):
            all_books_list.append(all_books[prev:i])
            prev = i

        return all_books_list

    @staticmethod
    def search_books(search_content, number_of_col=5):
        where = ['author', 'title', 'isbn']
        result = []
        result_list = []
        for query_name in where:
            sql = f"SELECT * FROM books WHERE {query_name} Like '%{search_content}%'"
            books = db.execute(sql).fetchall()
            for book in books:
                result.append(book)
        prev = 0
        number_of_books = len(result)
        for i in range(number_of_col,number_of_books,number_of_col):
            result_list.append(result[prev:i])
            prev = i
        return result_list


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/success", methods=["POST"])
def register():
    # Get form information.
    name = request.form.get("name")
    lastname = request.form.get("lname")
    username = request.form.get("username")
    password = request.form.get("password")
    password_confirmation = request.form.get("password_confirmation")
    if name == '' or lastname == '' or username == '' or password == '':
        return render_template("index.html")
    
    else:
        if db.execute("SELECT * FROM users WHERE username = :username", {"username": username}).rowcount > 0:
            return render_template("error.html")
        else:
            if password != password_confirmation:
                return render_template("index.html")
            else:
                db.execute("INSERT INTO users (first_name, last_name, pw, username) VALUES (:fname, :lname, :pw, :username)",
                    {"fname":name, "lname": lastname, "pw": password, "username":username})
            db.commit()

    return render_template("index.html")


@app.route("/welcome", methods=["POST"])
def login():
    # Get form information.
    username = request.form.get("username")
    password = request.form.get("password")
   
    if username == '' or password == '':
        return render_template("index.html")
    
    else:
        if db.execute("SELECT * FROM users WHERE username = :username", {"username": username}).rowcount == 0:
            return render_template("index.html", message="you are not a member")
        else:
            user_info = db.execute("SELECT * FROM users WHERE username = :username", {"username": username}).fetchone()
            correct = user_info.pw
            if password != correct:
                return render_template("error.html")
            else:
                books_list = AnimalBooks.select_best_books()
                return render_template("home.html", num=3, books_list=books_list, pagetitle="Best Books")


@app.route("/search-result",methods=["POST"])
def search():
    search_content = request.form.get("search")

    result = AnimalBooks.search_books(search_content)

    num = len(result)//5
 
    pagetitle = f" Result for '{search_content}'"
    return render_template("search_result.html", num=num, books_list=result, pagetitle=pagetitle)


@app.route("/all-books")
def all_books():
    all_books_list = AnimalBooks.select_all_books()
    return render_template("all_books.html", num=1001, books_list=all_books_list, pagetitle="All Books A-Z")

@app.route("/all-books/<int:book_id>")
def more(book_id):

    # Make sure flight exists.
    book = db.execute("SELECT * FROM books WHERE id = :id", {"id": book_id}).fetchone()
    if book is None:
        return render_template("error.html")

    return render_template("book.html", book=book)




# # # print("hello")
# # new_user = User()
# # # print(new_user)
# # form1 = new_user.register("a", "b", "c", "d")
# # bookStore = AnimalBooks()
# # print(bookStore)
# # # bookStore.register_new_user(form1)
# # print(bookStore.users)
