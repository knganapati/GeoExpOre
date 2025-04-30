from pydantic import BaseModel, EmailStr, UUID4
from typing import Optional
from datetime import datetime

class EmployeeBase(BaseModel):
    user_id: str
    name: str
    email: EmailStr
    address: Optional[str] = None
    role: Optional[str] = None

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: UUID4
    created_at: datetime

    class Config:
        from_attributes = True

class ProjectBase(BaseModel):
    title: str
    commodity: Optional[str] = None
    toposheet_no: Optional[str] = None
    total_area: Optional[float] = None
    forest_cover_private: Optional[float] = None
    forest_cover_barren: Optional[float] = None
    forest_cover_forest: Optional[float] = None
    status: Optional[str] = "draft"
    employee_id: UUID4

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: UUID4
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ProjectCoordinateBase(BaseModel):
    project_id: UUID4
    name: str
    latitude: float
    longitude: float

class ProjectCoordinateCreate(ProjectCoordinateBase):
    pass

class ProjectCoordinate(ProjectCoordinateBase):
    id: UUID4
    created_at: datetime

    class Config:
        from_attributes = True

class ProjectFileBase(BaseModel):
    project_id: UUID4
    file_type: str
    file_name: str
    file_url: str
    uploaded_by: UUID4

class ProjectFileCreate(ProjectFileBase):
    pass

class ProjectFile(ProjectFileBase):
    id: UUID4
    uploaded_at: datetime

    class Config:
        from_attributes = True