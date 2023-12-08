from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserBase(BaseModel):
    """
    Base model for user with email.
    """
    email: EmailStr

class UserCreate(UserBase):
    """
    Model for creating a new user.

    Inherits:
    - UserBase
    """
    username: str
    password: str

class UserUpdate(BaseModel):
    """
    Model for updating user information.

    Inherits:
    - UserBase
    """
    email: EmailStr
    username: str
    password: str

class UserDelete(UserUpdate):
    """
    Model for deleting a user.

    Inherits:
    - UserUpdate
    """
    pass

class UserOut(BaseModel):
    """
    Model for user data to be returned in responses.

    Attributes:
    - id (int): User ID.
    - email (EmailStr): User email address.
    - username (str): Username.
    - created_at (datetime): Timestamp of user creation.

    Config:
    - from_attributes (bool): Convert snake_case attribute names to camelCase.
    """
    id: int
    email: EmailStr
    username: str
    created_at: datetime

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    """
    Model for user login.

    Attributes:
    - email (EmailStr): User email address.
    - password (str): User password.
    """
    email: EmailStr
    password: str

class Token(BaseModel):
    """
    Model for token response.

    Attributes:
    - access_token (str): Access token.
    - token_type (str): Token type.
    """
    access_token: str
    token_type: str

class TokenData(BaseModel):
    """
    Model for token data.

    Attributes:
    - id (Optional[str]): Optional user ID.
    """
    id: Optional[str] = None

class ScoreBase(BaseModel):
    """
    Base model for a score.

    Attributes:
    - score (int): Score value.
    """
    score: int

class ScoreCreate(ScoreBase):
    """
    Model for creating a new score.

    Inherits:
    - ScoreBase
    """
    pass

class Score(ScoreBase):
    """
    Model for representing a score.

    Attributes:
    - id (int): Score ID.
    - created_at (datetime): Timestamp of score creation.
    - owner_id (int): ID of the score owner.
    - owner (UserOut): Owner of the score.

    Config:
    - from_attributes (bool): Convert snake_case attribute names to camelCase.
    """
    id: int
    created_at: datetime
    owner_id: int
    owner: UserOut

    class Config:
        from_attributes = True
