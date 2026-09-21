from sqlmodel import Session, delete
from database import engine
from models import UserGame, User, Game

with Session(engine) as session:
    session.exec(delete(UserGame))
    session.exec(delete(User))
    session.exec(delete(Game))
    session.commit()

print("All data cleared.")