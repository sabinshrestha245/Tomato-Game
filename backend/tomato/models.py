from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, TIMESTAMP, text
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    """
    SQLAlchemy model representing a user.

    Attributes:
    - id (int): Primary key ID for the user.
    - username (str): Username of the user.
    - email (str): Email address of the user (unique and indexed).
    - password (str): Password of the user.
    - is_active (bool): Flag indicating whether the user is active (default is True).
    - created_at (datetime): Timestamp of user creation.

    Relationships:
    - Scores (relationship): One-to-many relationship with Score model.
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))

    # Scores = relationship("Score", back_populates="owner")

class Score(Base):
    """
    SQLAlchemy model representing a score.

    Attributes:
    - id (int): Primary key ID for the score.
    - score (str): Score value.
    - created_at (datetime): Timestamp of score creation.
    - owner_id (int): Foreign key referencing the User model's ID.

    Relationships:
    - Owner (relationship): Many-to-one relationship with User model.
    """
    __tablename__ = "scores"

    id = Column(Integer, primary_key=True, nullable=False)
    score = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    owner = relationship("User")
