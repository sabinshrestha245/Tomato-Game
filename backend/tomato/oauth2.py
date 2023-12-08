from jose import JWTError, jwt
from datetime import datetime, timedelta
from demo_tomato_game.backend.tomato import database, models, schemas
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

# OAuth2PasswordBearer is used for handling token authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')

# Secret key, algorithm, and token expiration time
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def create_access_token(data: dict):
    """
    Create an access token based on the input data.

    Parameters:
    - data (dict): Data to be encoded into the token.

    Returns:
    str: Encoded JWT access token.
    """
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_access_token(token: str, credentials_exception):
    """
    Verify the provided access token and retrieve user data.

    Parameters:
    - token (str): JWT access token.
    - credentials_exception (HTTPException): Exception to raise in case of credential validation failure.

    Returns:
    schemas.TokenData: Token data including user ID.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        if user_id is None:
            raise credentials_exception
        token_data = schemas.TokenData(id=str(user_id))  # Ensure id is treated as a string
    except JWTError:
        raise credentials_exception

    return token_data

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    """
    Dependency function to get the current user based on the provided access token.

    Parameters:
    - token (str): JWT access token.
    - db (Session): Database session.

    Returns:
    models.User: Current user.
    """
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                          detail="Could not validate credentials",
                                          headers={"WWW-Authenticate": "Bearer"})

    token_data = verify_access_token(token, credentials_exception)

    user = db.query(models.User).filter(models.User.id == int(token_data.id)).first()  # Convert id to integer for query
    return user
