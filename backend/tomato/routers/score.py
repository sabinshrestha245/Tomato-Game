from fastapi import Depends, status, HTTPException, APIRouter
from sqlalchemy.orm import Session
from typing import List
from demo_tomato_game.backend.tomato import models, schemas, oauth2
from demo_tomato_game.backend.tomato.database import get_db

router = APIRouter(
    prefix="/score",
    tags=['Scores']
)

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Score)
def create_score(score: schemas.ScoreCreate, db: Session = Depends(get_db), current_user: models.User = Depends(oauth2.get_current_user)):
    """
    Create a new score.

    Parameters:
    - score (schemas.ScoreCreate): Score creation data.
    - db (Session): Database session.
    - current_user (models.User): Current authenticated user.

    Returns:
    schemas.Score: Created score information.
    """
    new_score = models.Score(owner_id=current_user.id, **score.dict())
    db.add(new_score)
    db.commit()
    db.refresh(new_score)

    return new_score

@router.get("/", response_model=List[schemas.Score])
def get_scores(db: Session = Depends(get_db), current_user: models.User = Depends(oauth2.get_current_user)):
    """
    Get a list of scores.

    Parameters:
    - db (Session): Database session.
    - current_user (models.User): Current authenticated user.

    Returns:
    List[schemas.Score]: List of score information.
    """
    db_scores = db.query(models.Score).all()

    if not db_scores:
        raise HTTPException(status_code=404, detail="No scores found")
    return db_scores

@router.get("/{id}", response_model=schemas.Score)
def get_score(id: int, db: Session = Depends(get_db), current_user: models.User = Depends(oauth2.get_current_user)):
    """
    Get a score by ID.

    Parameters:
    - id (int): Score ID.
    - db (Session): Database session.
    - current_user (models.User): Current authenticated user.

    Returns:
    schemas.Score: Score information.
    """
    db_score = db.query(models.Score).filter(models.Score.id == id).first()

    if db_score is None:
        raise HTTPException(status_code=404, detail=f"Score with id: {id} was not found")
    return db_score
