import csv
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
import requests

DATABASE_URL="postgresql://monique:monique@localhost:5432/monique"

engine = create_engine(DATABASE_URL)
db = scoped_session(sessionmaker(bind=engine))



def add_books():
    f = open("books.csv")
    reader = csv.reader(f)
    for isbn, title, author, year in reader:
        db.execute("INSERT INTO books (isbn, title, author, year) VALUES (:isbn, :title, :author, :year)", {"isbn":isbn, "title":title, "author":author, "year":year})
        print(f"ISBN: {isbn} TITLE: {title}, AUTOR: {author}, YEAR: {year}.")
    db.commit()

def get_isbns_list(size_of_split=500):
    f = open("books.csv")
    reader = csv.reader(f)
    isbn_list = [isbn for isbn, _, _, _ in reader]

    list_to_return = []
    for i in range(0, len(isbn_list), size_of_split):
        l = isbn_list[i:i+size_of_split]
        string = ','.join(l)
        list_to_return.append(string)

    return list_to_return


def add_reviews():
    list_of_isbn_batches = get_isbns_list()
    for isbn_batch in list_of_isbn_batches:
        res = requests.get("https://www.goodreads.com/book/review_counts.json", params={"key": "lFpB9zGJWlX67eLwpNAXLQ", "isbns":isbn_batch})

        json_res = res.json()
        print(len(json_res['books']))

        for book_dict in json_res['books']:
            isbn = book_dict["isbn"]
            goodreads_avg_review = book_dict["average_rating"]
            goodreads_num_of_reviews = book_dict["work_ratings_count"]
            db.execute("UPDATE books SET goodreads_avg_review = :goodreads_avg_review, goodreads_num_of_reviews = :goodreads_num_of_reviews WHERE isbn=:isbn;", {"goodreads_avg_review":goodreads_avg_review, "goodreads_num_of_reviews":goodreads_num_of_reviews, "isbn":isbn})
            # print(f"ISBN: {isbn}, avg: {goodreads_avg_review}, num reviews: {goodreads_num_of_reviews}.")
        print("batch finished----")
    db.commit()


def main():
    # add_books()
    add_reviews()
if __name__ == "__main__":
    main()