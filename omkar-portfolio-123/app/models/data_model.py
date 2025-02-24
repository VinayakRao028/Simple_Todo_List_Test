from typing import List, Dict, Any
from pydantic import BaseModel, Field

class Skill(BaseModel):
    name: str
    level: int = Field(..., ge=1, le=100)

class Project(BaseModel):
    title: str
    description: str
    technologies: List[str]
    image_url: str
    project_url: str

class Recommendation(BaseModel):
    name: str
    relationship: str
    comment: str

class PortfolioData(BaseModel):
    name: str
    title: str
    about: str
    skills: List[Skill]
    projects: List[Project]
    recommendations: List[Recommendation]
    contact_info: Dict[str, str]

    class Config:
        schema_extra = {
            "example": {
                "name": "John Doe",
                "title": "Full Stack Developer",
                "about": "Passionate developer with 5 years of experience...",
                "skills": [
                    {"name": "Python", "level": 90},
                    {"name": "JavaScript", "level": 85}
                ],
                "projects": [
                    {
                        "title": "Portfolio Website",
                        "description": "A responsive portfolio website...",
                        "technologies": ["HTML", "CSS", "JavaScript"],
                        "image_url": "/images/portfolio.jpg",
                        "project_url": "https://example.com/portfolio"
                    }
                ],
                "recommendations": [
                    {
                        "name": "Jane Smith",
                        "relationship": "Project Manager",
                        "comment": "John is an excellent developer..."
                    }
                ],
                "contact_info": {
                    "email": "john@example.com",
                    "phone": "+1234567890"
                }
            }
        }

def create_portfolio_data(data: Dict[str, Any]) -> PortfolioData:
    """
    Create a PortfolioData instance from a dictionary.

    Args:
        data (Dict[str, Any]): Dictionary containing portfolio data.

    Returns:
        PortfolioData: An instance of PortfolioData.
    """
    return PortfolioData(**data)

def validate_portfolio_data(data: Dict[str, Any]) -> bool:
    """
    Validate the portfolio data against the PortfolioData model.

    Args:
        data (Dict[str, Any]): Dictionary containing portfolio data.

    Returns:
        bool: True if the data is valid, False otherwise.
    """
    try:
        PortfolioData(**data)
        return True
    except ValueError:
        return False