from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database URL for PostgreSQL
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:test123@localhost/Tomato"

# Create the SQLAlchemy engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a base class for declarative models
Base = declarative_base()

# Dependency function to get a database session
def get_db():
    """
    Dependency function to get a database session.

    Yields:
    sqlalchemy.orm.Session: Database session.

    Finally:
    - Closes the database session after use.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
