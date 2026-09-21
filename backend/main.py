from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import SQLModel
from database import engine

SQLModel.metadata.create_all(engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"status": "ok"}