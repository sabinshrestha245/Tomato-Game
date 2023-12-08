from fastapi import Depends, HTTPException, APIRouter, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from demo_tomato_game.backend.tomato import database, models, utils, oauth2, schemas

router = APIRouter(tags=['Authentication'])

@router.post('/login', response_model=schemas.Token)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    """
    Endpoint to authenticate a user and generate an access token.

    Parameters:
    - user_credentials (OAuth2PasswordRequestForm): User credentials (username and password).
    - db (Session): Database session.

    Returns:
    schemas.Token: Token information.
    """
    # Query the user by email
    user = db.query(models.User).filter(models.User.email == user_credentials.username).first()

    # Check if the user exists
    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials")

    # Verify the password
    if not utils.verify_password(user_credentials.password, user.password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid credentials")

    # Create an access token
    access_token = oauth2.create_access_token(data={"user_id": user.id})

    return {"access_token": access_token, "token_type": "bearer"}
