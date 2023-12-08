from sqlalchemy.orm import Session
from . import models

def get_user(db: Session, user_id: int):
    """
    Get a user by user ID.

    Parameters:
    - db (Session): Database session.
    - user_id (int): User ID.

    Returns:
    models.User: User model corresponding to the given user ID.
    """
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    """
    Get a user by email.

    Parameters:
    - db (Session): Database session.
    - email (str): User email.

    Returns:
    models.User: User model corresponding to the given email.
    """
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    """
    Get a list of users with optional pagination.

    Parameters:
    - db (Session): Database session.
    - skip (int): Number of records to skip (for pagination).
    - limit (int): Maximum number of records to retrieve (for pagination).

    Returns:
    List[models.User]: List of User models.
    """
    return db.query(models.User).offset(skip).limit(limit).all()
