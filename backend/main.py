from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func
from sqlmodel import Session, select

from database import engine, get_session
from models import SQLModel, User, Game, UserGame
from schemas import UserCreate, UserRead, GameCreate, GameRead

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SQLModel.metadata.create_all(engine)


def get_initials(full_name: str) -> str:
    first_name = full_name.strip().split()[0]
    return first_name[:2].upper()


@app.get("/")
def read_root():
    return {"status": "ok"}


# ---------- Users ----------

@app.post("/users", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, session: Session = Depends(get_session)):
    full_name = user.full_name.strip()

    if session.get(User, full_name):
        raise HTTPException(status_code=409, detail="User already exists")

    session.add(User(full_name=full_name))
    session.commit()

    return UserRead(full_name=full_name, initials=get_initials(full_name), game_count=0)


@app.get("/users", response_model=list[UserRead])
def list_users(session: Session = Depends(get_session)):
    users = session.exec(select(User)).all()
    results = []
    for user in users:
        count = session.exec(
            select(func.count()).select_from(UserGame).where(UserGame.user_full_name == user.full_name)
        ).one()
        results.append(UserRead(full_name=user.full_name, initials=get_initials(user.full_name), game_count=count))
    return results


@app.get("/users/{full_name}/games", response_model=list[GameRead])
def list_user_games(full_name: str, session: Session = Depends(get_session)):
    if not session.get(User, full_name):
        raise HTTPException(status_code=404, detail="User not found")

    statement = (
        select(Game)
        .join(UserGame, UserGame.game_name == Game.game_name)
        .where(UserGame.user_full_name == full_name)
    )
    return session.exec(statement).all()


# ---------- Games ----------

@app.post("/games", response_model=GameRead, status_code=status.HTTP_201_CREATED)
def create_game(game: GameCreate, session: Session = Depends(get_session)):
    game_name = game.game_name.strip()

    if session.get(Game, game_name):
        raise HTTPException(status_code=409, detail="Game already exists")

    db_game = Game(
        game_name=game_name,
        player_limit=game.player_limit,
        genre=game.genre.strip(),
        platform=game.platform.strip(),
    )
    session.add(db_game)
    session.commit()
    session.refresh(db_game)
    return db_game


@app.get("/games", response_model=list[GameRead])
def list_games(session: Session = Depends(get_session)):
    return session.exec(select(Game)).all()


# ---------- Ownership ----------

@app.post("/users/{full_name}/games/{game_name}", status_code=status.HTTP_201_CREATED)
def add_owned_game(full_name: str, game_name: str, session: Session = Depends(get_session)):
    if not session.get(User, full_name):
        raise HTTPException(status_code=404, detail="User not found")
    if not session.get(Game, game_name):
        raise HTTPException(status_code=404, detail="Game not found")

    if session.get(UserGame, (full_name, game_name)):
        return {"message": "User already owns this game"}

    session.add(UserGame(user_full_name=full_name, game_name=game_name))
    session.commit()
    return {"message": f"{full_name} now owns {game_name}"}