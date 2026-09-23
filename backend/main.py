
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import time

app = FastAPI(
    title="MindCare Backend API",
    description="Cognitive Engagement & Memory Support API for Dementia Care",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserAuth(BaseModel):
    email: str
    password: str
    role: str = "player"
    name: Optional[str] = None

class MemoryItem(BaseModel):
    id: Optional[int] = None
    type: str
    name: str
    relation: str
    description: Optional[str] = None
    photo: Optional[str] = None

class GameSessionRecord(BaseModel):
    gameId: int
    gameName: str
    category: str
    level: int
    accuracy: float
    activeSeconds: int
    hits: int
    mistakes: int

class ActivityItem(BaseModel):
    id: Optional[int] = None
    title: str
    time: str
    completed: bool = False
    category: str = "Daily"
db_users = {}
db_game_sessions = []
db_activities = [
    {"id": 1, "title": "Daily Check-in", "time": "9:00 AM", "completed": True, "category": "Health"},
    {"id": 2, "title": "Memory Match Game", "time": "10:00 AM", "completed": True, "category": "Cognitive"},
    {"id": 3, "title": "Drink Water (Glass 3)", "time": "10:30 AM", "completed": False, "category": "Health"},
    {"id": 4, "title": "Walk in Park", "time": "11:30 AM", "completed": False, "category": "Physical"}
]

@app.get("/")
def read_root():
    return {
        "status": "online",
        "app": "MindCare API",
        "version": "1.0.0",
        "message": "MindCare AI Cognitive Games & Memory Support Backend Service"
    }

@app.post("/api/auth/login")
def login(auth: UserAuth):
    return {
        "token": "jwt-mindcare-sample-token-12345",
        "user": {
            "email": auth.email,
            "role": auth.role,
            "name": auth.name or "Didi Devi"
        }
    }

@app.get("/api/activities")
def get_activities():
    return db_activities

@app.post("/api/activities")
def create_activity(item: ActivityItem):
    new_id = len(db_activities) + 1
    act = item.dict()
    act["id"] = new_id
    db_activities.append(act)
    return act

@app.post("/api/games/sessions")
def log_game_session(session: GameSessionRecord):
    A = min(100.0, max(0.0, session.accuracy))
    T = 100.0 if session.activeSeconds <= 25 else max(20.0, 100.0 - (session.activeSeconds - 25) * 2)
    H = 100.0 if session.hits > 0 else 0.0
    M = max(0.0, 100.0 - (session.mistakes * 15))
    
    score = round(0.40 * A + 0.20 * T + 0.20 * H + 0.20 * M)
    suggested_level = session.level
    if score >= 80:
        suggested_level = min(3, session.level + 1)
    elif score < 30:
        suggested_level = max(1, session.level - 1)

    record = {
        "id": int(time.time()),
        "gameId": session.gameId,
        "gameName": session.gameName,
        "category": session.category,
        "level": session.level,
        "score": score,
        "suggestedLevel": suggested_level,
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
    }
    db_game_sessions.append(record)
    return record

@app.get("/api/caregiver/reports")
def get_caregiver_report():
    return {
        "player": "Didi Devi",
        "status": "Connected",
        "caregiver": "Anita Sharma",
        "gamesCompleted": len(db_game_sessions) + 8,
        "avgScore": 85.5,
        "activePlayTime": "25 min",
        "sessions": db_game_sessions
    }
