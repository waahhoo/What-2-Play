"""Import the game-night form responses into the database.

Run from the backend directory:
    python responses.py

The import is idempotent: existing users, games, and ownership links are kept.
"""

from sqlmodel import Session, SQLModel

from database import engine
from models import Game, User, UserGame


# game_name: (player_limit, genre, comma-separated PC platforms)
# Player limits are practical group limits for this app, rather than every
# game's absolute server limit. PEAK and Lethal Company use the modded limit.
GAME_METADATA = {
    "CS2": (5, "Competitive shooter", "Steam"),
    "War Selection": (4, "Real-time strategy", "Steam"),
    "Rocket League": (8, "Sports", "Steam, Epic Games"),
    "BTD6": (4, "Tower defense", "Steam, Epic Games, Xbox"),
    "Valorant": (5, "Competitive shooter", "Riot Games"),
    "Deep Rock Galactic": (4, "Co-op shooter", "Steam, Xbox"),
    "7 Days to Die": (8, "Survival", "Steam, Xbox"),
    "War Dogs": (4, "Action", "Steam"),
    "Civ 6": (12, "Turn-based strategy", "Steam, Epic Games, Xbox"),
    "Lethal Company": (10, "Horror co-op", "Steam"),
    "Fortnite": (4, "Battle royale", "Epic Games, Xbox"),
    "Subnautica": (1, "Survival", "Steam, Epic Games, Xbox"),
    "The Finals": (3, "Competitive shooter", "Steam, Xbox"),
    "Minecraft": (10, "Sandbox survival", "Xbox"),
    "Valheim": (10, "Survival", "Steam, Xbox"),
    "Fall Guys": (4, "Party", "Epic Games, Xbox"),
    "Palworld": (32, "Survival", "Steam, Xbox"),
    "Jump Space": (4, "Co-op adventure", "Steam, Xbox"),
    "Helldivers 2": (4, "Co-op shooter", "Steam"),
    "Grounded": (4, "Survival", "Steam, Xbox"),
    "Subnautica 2": (4, "Survival", "Steam"),
    "Overwatch": (5, "Competitive shooter", "Blizzard"),
    "Among Us": (15, "Social deduction", "Steam, Xbox"),
    "Sea of Thieves": (4, "Adventure", "Steam, Xbox"),
    "Terraria": (8, "Sandbox adventure", "Steam, Xbox"),
    "The Forest": (8, "Survival horror", "Steam"),
    "Sons of the Forest": (8, "Survival horror", "Steam"),
    "Ark": (10, "Survival", "Steam, Xbox"),
    "Raft": (10, "Survival", "Steam, Xbox"),
    "Mordhau": (64, "Action", "Steam, Xbox"),
    "Rust": (100, "Survival", "Steam, Xbox"),
    "Stick Fight": (4, "Fighting", "Steam, Xbox"),
    "Overcooked! 2": (4, "Co-op cooking", "Steam, Epic Games, Xbox"),
    "Human Fall Flat": (8, "Puzzle platformer", "Steam, Epic Games, Xbox"),
    "Stranded Deep": (2, "Survival", "Steam, Xbox"),
    "Ultimate Chicken Horse": (4, "Party platformer", "Steam, Xbox"),
    "Puck": (4, "Sports", "Steam"),
    "Arc Raiders": (3, "Extraction shooter", "Steam, Epic Games, Xbox"),
    "Bodycam": (3, "Tactical shooter", "Steam"),
    "PEAK": (10, "Co-op adventure", "Steam"),
}


OWNERSHIP = {
    "Kai": [
        "CS2",
        "War Selection",
        "Rocket League",
        "BTD6",
        "Valorant",
        "Deep Rock Galactic",
        "7 Days to Die",
        "War Dogs",
    ],
    "Gus": [
        "War Selection",
        "Civ 6",
        "Lethal Company",
        "Rocket League",
        "Fortnite",
        "Subnautica",
        "Overwatch",
        "The Finals",
        "Minecraft",
        "Deep Rock Galactic",
        "Valheim",
        "Fall Guys",
        "Palworld",
        "Jump Space",
        "Helldivers 2",
    ],
    "Trippy Trig": [
        "CS2",
        "War Selection",
        "Civ 6",
        "Lethal Company",
        "Rocket League",
        "Fortnite",
        "Grounded",
        "Subnautica",
        "Subnautica 2",
        "BTD6",
        "Overwatch",
        "Valorant",
        "The Finals",
        "Minecraft",
        "Among Us",
        "Deep Rock Galactic",
        "Sea of Thieves",
        "Terraria",
        "Valheim",
        "The Forest",
        "Sons of the Forest",
        "7 Days to Die",
        "Raft",
        "Fall Guys",
        "Stick Fight",
        "Human Fall Flat",
        "War Dogs",
        "Stranded Deep",
        "Ultimate Chicken Horse",
        "Puck",
        "Arc Raiders",
        "Bodycam",
    ],
    "Otto": [
        "CS2",
        "War Selection",
        "Civ 6",
        "Lethal Company",
        "Rocket League",
        "Fortnite",
        "Overwatch",
        "Minecraft",
        "Among Us",
        "Deep Rock Galactic",
        "Terraria",
        "Valheim",
        "7 Days to Die",
        "Raft",
        "Fall Guys",
        "Mordhau",
        "Rust",
    ],
    "Briss": [
        "CS2",
        "Civ 6",
        "Lethal Company",
        "Rocket League",
        "Overwatch",
        "Minecraft",
        "Among Us",
        "Deep Rock Galactic",
        "Sea of Thieves",
    ],
    "Al the Pal": [
        "CS2",
        "War Selection",
        "Civ 6",
        "Lethal Company",
        "Rocket League",
        "Fortnite",
        "Grounded",
        "Subnautica",
        "Subnautica 2",
        "BTD6",
        "Overwatch",
        "Valorant",
        "The Finals",
        "Minecraft",
        "Among Us",
        "Deep Rock Galactic",
        "Sea of Thieves",
        "Terraria",
        "Valheim",
        "The Forest",
        "Sons of the Forest",
        "Ark",
        "7 Days to Die",
        "Raft",
        "Fall Guys",
        "Stick Fight",
        "Overcooked! 2",
        "Human Fall Flat",
        "PEAK",
    ],
}


def add_data() -> None:
    SQLModel.metadata.create_all(engine)

    with Session(engine) as session:
        for full_name in OWNERSHIP:
            if session.get(User, full_name) is None:
                session.add(User(full_name=full_name))

        for game_name, (player_limit, genre, platform) in GAME_METADATA.items():
            if session.get(Game, game_name) is None:
                session.add(
                    Game(
                        game_name=game_name,
                        player_limit=player_limit,
                        genre=genre,
                        platform=platform,
                    )
                )

        session.commit()

        for full_name, game_names in OWNERSHIP.items():
            for game_name in dict.fromkeys(game_names):
                if session.get(UserGame, (full_name, game_name)) is None:
                    session.add(
                        UserGame(
                            user_full_name=full_name,
                            game_name=game_name,
                        )
                    )

        session.commit()

    print(
        f"Imported {len(OWNERSHIP)} users, "
        f"{len(GAME_METADATA)} games, and their ownership links."
    )


if __name__ == "__main__":
    add_data()
