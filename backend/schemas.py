from sqlmodel import SQLModel, Field


class UserCreate(SQLModel):
    full_name: str = Field(min_length=1)


class UserRead(SQLModel):
    full_name: str
    initials: str
    game_count: int


class GameCreate(SQLModel):
    game_name: str = Field(min_length=1)
    player_limit: int = Field(ge=1, le=10)
    genre: str = Field(min_length=1)
    platform: str = Field(min_length=1)


class GameRead(SQLModel):
    game_name: str
    player_limit: int
    genre: str
    platform: str