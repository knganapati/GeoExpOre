from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database
from database import engine, SessionLocal
from datetime import datetime

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="GeoExpOre API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/employees/", response_model=schemas.Employee)
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    db_employee = models.Employee(
        user_id=employee.user_id,
        name=employee.name,
        email=employee.email,
        address=employee.address,
        role=employee.role
    )
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

@app.get("/employees/{user_id}", response_model=schemas.Employee)
def get_employee(user_id: str, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.user_id == user_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

@app.post("/projects/", response_model=schemas.Project)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    db_project = models.Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@app.get("/projects/", response_model=List[schemas.Project])
def get_projects(db: Session = Depends(get_db)):
    return db.query(models.Project).all()

@app.post("/coordinates/", response_model=schemas.ProjectCoordinate)
def create_coordinate(coordinate: schemas.ProjectCoordinateCreate, db: Session = Depends(get_db)):
    db_coordinate = models.ProjectCoordinate(**coordinate.dict())
    db.add(db_coordinate)
    db.commit()
    db.refresh(db_coordinate)
    return db_coordinate

@app.get("/projects/{project_id}/coordinates/", response_model=List[schemas.ProjectCoordinate])
def get_project_coordinates(project_id: str, db: Session = Depends(get_db)):
    return db.query(models.ProjectCoordinate).filter(models.ProjectCoordinate.project_id == project_id).all()

@app.post("/files/", response_model=schemas.ProjectFile)
def create_file(file: schemas.ProjectFileCreate, db: Session = Depends(get_db)):
    db_file = models.ProjectFile(**file.dict())
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    return db_file

@app.get("/projects/{project_id}/files/", response_model=List[schemas.ProjectFile])
def get_project_files(project_id: str, db: Session = Depends(get_db)):
    return db.query(models.ProjectFile).filter(models.ProjectFile.project_id == project_id).all()