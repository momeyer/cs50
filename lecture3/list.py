import os

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

DATABASE_URL="postgresql://monique:monique@localhost:5432/monique"
# mysql://scott:tiger@hostname/dbname"

engine = create_engine(DATABASE_URL)
db = scoped_session(sessionmaker(bind=engine))

def main():
    passengers2 = db.execute("SELECT name, flight_id FROM passengers2").fetchall()
    for passenger in passengers2:
        print(f"Passenger {passenger.name} fliyng to {passenger.flight_id}")


if __name__ == "__main__":
    main()