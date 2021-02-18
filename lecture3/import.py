import csv
import os

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

DATABASE_URL="postgresql://monique:monique@localhost:5432/monique"

engine = create_engine(DATABASE_URL)
db = scoped_session(sessionmaker(bind=engine))

def main():
    f = open("passengers.csv")
    reader = csv.reader(f)
    for name, flight_id in reader:
        db.execute("INSERT INTO passengers2 (name, flight_id) VALUES (:name, :flight_id)", {"name": name, "flight_id":flight_id})
        print(f"Added Passenger {name} to flight number {flight_id}.")
    db.commit()

if __name__ == "__main__":
    main()