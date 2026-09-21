from typing import Optional
from sqlmodel import SQLModel, Field


class User(SQLModel, table=True):
    full_name: str = Field(primary_key=True)


class Game(SQLModel, table=True):
    game_name: str = Field(primary_key=True)
    player_limit: int
    genre: str
    platform: str

class UserGame(SQLModel, table=True):
    user_full_name: str = Field(foreign_key="user.full_name", primary_key=True)
    game_name: str = Field(foreign_key="game.game_name", primary_key=True)