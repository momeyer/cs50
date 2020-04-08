from flask import Flask, render_template, request
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

DATABASE_URL="postgresql://monique:monique@localhost:5432/monique"

engine = create_engine(DATABASE_URL)
db = scoped_session(sessionmaker(bind=engine))

app = Flask(__name__)

def select_best_books():
    books = db.execute("select * from books where goodreads_avg_review>4.5 order by goodreads_avg_review desc;").fetchmany(15)
    books_list = []
    prev = 0
    for i in range(5,16,5):
        books_list.append(books[prev:i])
        prev = i

    return books_list

def select_all_books():
    all_books = db.execute("select * from books order by title").fetchmany(5001)
    all_books_list = []
    prev = 0
    for i in range(5,5001,5):
        all_books_list.append(all_books[prev:i])
        prev = i

    return all_books_list

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/home")
def home():
    books_list = select_best_books()
    return render_template("home.html", num=3, books_list=books_list)


@app.route("/all-books")
def all_books():
    all_books_list = select_all_books()
    return render_template("all_books.html", num=1001, books_list=all_books_list)

# @app.route("/all-books/<int:book_id>")
# def more(book_id):
#     all_books_list = select_all_books()
#     return render_template("all_books.html", num=1001, books_list=all_books_list)