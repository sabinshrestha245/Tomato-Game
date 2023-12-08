from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from demo_tomato_game.backend.tomato.models import Base
from demo_tomato_game.backend.tomato.database import engine
from demo_tomato_game.backend.tomato.routers import user, auth, score

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app instance
app = FastAPI()

# CORS (Cross-Origin Resource Sharing) settings
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers for different components
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(score.router)

@app.get("/")
def root():
    """
    Root endpoint of the FastAPI application.

    Returns:
    dict: A welcome message.
    """
    return {"message": "Hello, welcome to the Tomato API game!"}
