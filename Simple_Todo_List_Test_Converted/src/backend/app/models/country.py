from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app import db

class Country(db.Model):
    __tablename__ = 'country'

    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(String(255))
    name = Column(String(255))
    
    states = relationship("State", back_populates="country")

    def __repr__(self):
        return f"<Country(id={self.id}, code='{self.code}', name='{self.name}')>"

    def to_dict(self):
        return {
            'id': self.id,
            'code': self.code,
            'name': self.name
        }