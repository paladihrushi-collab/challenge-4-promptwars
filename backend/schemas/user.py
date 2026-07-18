from pydantic import BaseModel, EmailStr
from typing import Optional
from models.user import RoleEnum

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str
    role: Optional[RoleEnum] = RoleEnum.fan

class UserResponse(UserBase):
    id: int
    role: RoleEnum
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None