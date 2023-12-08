from fastapi import Depends, status, HTTPException, APIRouter
from sqlalchemy.orm import Session
from demo_tomato_game.backend.tomato import models, crud, utils, schemas
from demo_tomato_game.backend.tomato.database import get_db
from demo_tomato_game.backend.tomato.oauth2 import get_current_user

router = APIRouter(
    prefix="/users",
    tags=['Users']
)

@router.get("/get-current-user", response_model=schemas.UserOut)
def get_current_authenticated_user(current_user: models.User = Depends(get_current_user)):
    """
    Get information about the current authenticated user.
    
    Parameters:
    - current_user (models.User): The current authenticated user.

    Returns:
    schemas.UserOut: User information.
    """
    return current_user

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Create a new user.

    Parameters:
    - user (schemas.UserCreate): User creation data.
    - db (Session): Database session.

    Returns:
    schemas.UserOut: Created user information.
    """
    # Hash the password
    hashed_password = utils.hash_password(user.password)
    user.password = hashed_password

    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.get("/{user_id}", response_model=schemas.UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    """
    Get user by user ID.

    Parameters:
    - user_id (int): User ID.
    - db (Session): Database session.

    Returns:
    schemas.UserOut: User information.
    """
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.get("/", response_model=list[schemas.UserOut])
def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Get a list of users with optional pagination.

    Parameters:
    - skip (int): Number of records to skip (for pagination).
    - limit (int): Maximum number of records to retrieve (for pagination).
    - db (Session): Database session.

    Returns:
    List[schemas.UserOut]: List of user information.
    """
    db_users = crud.get_users(db, skip=skip, limit=limit)
    if not db_users:
        raise HTTPException(status_code=404, detail="No users found")
    return db_users

@router.put("/{user_id}", response_model=schemas.UserOut)
def update_user(user_id: int, user_update: schemas.UserUpdate, db: Session = Depends(get_db)):
    """
    Update user information.

    Parameters:
    - user_id (int): User ID.
    - user_update (schemas.UserUpdate): Updated user information.
    - db (Session): Database session.

    Returns:
    schemas.UserOut: Updated user information.
    """
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    for field, value in user_update.dict().items():
        if field == "password" and value is not None:
            # Hash the new password
            hashed_password = utils.hash_password(value)
            setattr(db_user, field, hashed_password)
        else:
            if value is not None:
                setattr(db_user, field, value)

    db.commit()
    db.refresh(db_user)
    return db_user

@router.delete("/{user_id}", response_model=schemas.UserDelete)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """
    Delete a user.

    Parameters:
    - user_id (int): User ID.
    - db (Session): Database session.

    Returns:
    schemas.UserDelete: Deleted user information.
    """
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(db_user)
    db.commit()
    return db_user
