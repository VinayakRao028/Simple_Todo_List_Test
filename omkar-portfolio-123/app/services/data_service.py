import json
from typing import Dict, List, Any
from app.models.portfolio_data import PortfolioData

class DataService:
    """
    Service class for handling data operations in the portfolio application.
    """

    @staticmethod
    def load_portfolio_data() -> PortfolioData:
        """
        Load portfolio data from a JSON file.

        Returns:
            PortfolioData: An instance of PortfolioData containing the loaded data.
        """
        try:
            with open('app/models/portfolio_data.json', 'r') as file:
                data = json.load(file)
            return PortfolioData(**data)
        except FileNotFoundError:
            raise FileNotFoundError("Portfolio data file not found.")
        except json.JSONDecodeError:
            raise ValueError("Invalid JSON format in portfolio data file.")

    @staticmethod
    def get_about_data() -> Dict[str, Any]:
        """
        Retrieve about section data from the portfolio data.

        Returns:
            Dict[str, Any]: A dictionary containing about section data.
        """
        portfolio_data = DataService.load_portfolio_data()
        return portfolio_data.about

    @staticmethod
    def get_skills_data() -> List[Dict[str, Any]]:
        """
        Retrieve skills data from the portfolio data.

        Returns:
            List[Dict[str, Any]]: A list of dictionaries containing skills data.
        """
        portfolio_data = DataService.load_portfolio_data()
        return portfolio_data.skills

    @staticmethod
    def get_projects_data() -> List[Dict[str, Any]]:
        """
        Retrieve projects data from the portfolio data.

        Returns:
            List[Dict[str, Any]]: A list of dictionaries containing projects data.
        """
        portfolio_data = DataService.load_portfolio_data()
        return portfolio_data.projects

    @staticmethod
    def get_recommendations_data() -> List[Dict[str, Any]]:
        """
        Retrieve recommendations data from the portfolio data.

        Returns:
            List[Dict[str, Any]]: A list of dictionaries containing recommendations data.
        """
        portfolio_data = DataService.load_portfolio_data()
        return portfolio_data.recommendations

    @staticmethod
    def add_recommendation(recommendation: Dict[str, str]) -> None:
        """
        Add a new recommendation to the portfolio data.

        Args:
            recommendation (Dict[str, str]): A dictionary containing the new recommendation data.

        Raises:
            ValueError: If the recommendation data is invalid.
        """
        if not all(key in recommendation for key in ['name', 'text']):
            raise ValueError("Invalid recommendation data. 'name' and 'text' are required.")

        portfolio_data = DataService.load_portfolio_data()
        portfolio_data.recommendations.append(recommendation)

        with open('app/models/portfolio_data.json', 'w') as file:
            json.dump(portfolio_data.dict(), file, indent=2)