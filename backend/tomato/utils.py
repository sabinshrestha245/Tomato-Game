from passlib.context import CryptContext

# Create a CryptContext instance using the bcrypt hashing scheme
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """
    Hash a password using bcrypt.

    Parameters:
    - password (str): The plaintext password to be hashed.

    Returns:
    str: The hashed password.
    """
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plaintext password against a hashed password using bcrypt.

    Parameters:
    - plain_password (str): The plaintext password to be verified.
    - hashed_password (str): The hashed password to compare against.

    Returns:
    bool: True if the plaintext password matches the hashed password, False otherwise.
    """
    return pwd_context.verify(plain_password, hashed_password)
