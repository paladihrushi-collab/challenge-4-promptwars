from sqlalchemy import Column, Integer, String, Boolean, Enum
from core.database import Base
import enum

class RoleEnum(str, enum.Enum):
    admin = "admin"
    operations = "operations"
    security = "security"
    medical = "medical"
    volunteer = "volunteer"
    fan = "fan"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    role = Column(Enum(RoleEnum), default=RoleEnum.fan)
    is_active = Column(Boolean, default=True)