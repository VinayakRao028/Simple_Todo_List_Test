from typing import List, Dict, Union

class PortfolioData:
    def __init__(self):
        self.name: str = "omkar-portfolio"
        self.type: str = "folder"
        self.children: List[Dict[str, Union[str, List]]] = [
            {
                "name": "html_finalprojimages",
                "type": "folder",
                "children": [
                    {
                        "name": "temp.html",
                        "type": "file",
                        "content": "\n",
                        "language": "html"
                    }
                ]
            },
            {
                "name": "index.html",
                "type": "file",
                "content": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>V Omkareshwar - Portfolio</title>\n    <link rel=\"stylesheet\" href=\"./style.css\"/>\n    <script src=\"./script.js\"></script>\n  </head>\n  <body>\n    <!-- Navigation Bar -->\n    <nav>\n      <div id=\"home\">\n        <div class=\"profile_name\">\n          V Omkareshwar\n          <div class=\"contact_info\">\n            <img src=\"html_finalprojimages/envelope.png\" alt=\"https://icons8.com/icon/124377/circled-envelope\"/>\n          omkar@v.com\n        </div>\n        <div style=\"clear:both;\"></div>\n        <div class=\"contact_info\">\n          <img src=\"html_finalprojimages/phone.png\" alt=\"https://icons8.com/icon/124377/circled-envelope\"/>\n          +91 0000000000\n\n        </div>\n        </div>\n        <div class=\"topdiv\">\n          <a class=\"topmenu\" href=\"#about-me\">About Me</a>\n          <!-- Add the links for Skills, Projects and Recommendation here -->\n          <a href=\"#skills\" class=\"topmenu\">Skills</a>\n          <a href=\"#projects\" class=\"topmenu\">Projects</a>\n          <a href=\"#recommendations\" class=\"topmenu\">Recommendations</a>\n        </div>\n      </div>    \n    </nav>\n\n    <!-- About Me -->\n    <section id=\"about-me\" class=\"container\">\n      <div>\n        <img src=\"https://cdn.dribbble.com/users/4274213/screenshots/7636870/media/7dd95123f40f605de295f95ed623c9b1.gif\" class=\"profile_image\"/>\n      </div>\n\n      <div>\n          <h1>\n            Hi, I'm V Omkar!  &#127774;\n          </h1>\n          <p>\n            I want to become a full stack developer with good skills in both application and presentation layers.\n            I want to work on applications and microservices deployed on IBM Cloud. \n            I am an avid user of IBM Watson Services and want to work on Watson Assistant, NLU, Sentiment analyzer to name a few.\n          </p>\n      </div>\n    </section>\n              \n    <!-- Skills -->\n    <section id=\"skills\">\n      <h2>Skills</h2>\n      <div style=\"clear:both;\"></div>\n\n      <div class=\"all_skills\">\n        <div class=\"skill\">\n          <img src=\"html_finalprojimages/html5.png\"/>\n          <h6>HTML</h6>\n          <p>2 years experience</p>\n        </div>\n\n        <div class=\"skill\">\n          <img src=\"html_finalprojimages/js.jpeg\"/>\n          <h6>JavaScript</h6>\n          <p>3 years experience</p>\n        </div>  \n\n        <!-- Add more skills here -->\n\n        <div class=\"skill\">\n          <img src=\"html_finalprojimages/php.png\"/>\n          <h6>PHP</h6>\n          <p>1 years experience</p>\n        </div>\n\n        <div class=\"skill\">\n          <img src=\"html_finalprojimages/mysql.png\"/>\n          <h6>MYSQL</h6>\n          <p>3 years experience</p>\n        </div>\n\n        <div class=\"skill\">\n          <img src=\"html_finalprojimages/python.png\"/>\n          <h6>Python</h6>\n          <p>4 years experience</p>\n        </div>\n\n        <div class=\"skill\">\n          <img src=\"html_finalprojimages/c++.png\"/>\n          <h6>C++</h6>\n          <p>2 years experience</p>\n        </div>\n\n      </div>\n    </section>\n          \n    <!-- Projects -->\n    <section class=\"project-card\" id=\"projects\">\n      <h2>\n        Projects\n      </h2>\n      <div style=\"clear:both;\"></div>\n\n        <div id=\"projects-container\" class=\"projects-container\">\n          <div class=\"project-card\">\n            <h3>calculator</h3>\n            <ul>\n              <li>Developed and deployed a secure and portable calculator for usage of my friends and family HTML, CSS, JavaScript</li>\n            </ul>\n          </div>\n          <hr>\n          <div class=\"project-card\">\n            <h3>Tic-Tac-Toe</h3>\n            <ul>\n              <li>Developed and deployed a Tic - Tac - Toe game for entertainment of my friends and family using HTML, CSS,JavaScript</li>\n            </ul>\n          </div>\n          <hr>\n          <div class=\"project-card\">\n            <h3>Fashion Website</h3>\n            <ul>\n              <li>Created a styled multi-page website for my brother who want's to enter into fashion industry and integrated it with a shopping cart</li>\n            </ul>\n          </div>\n    </div>\n    </section>\n    <div style=\"clear:both;\"></div>\n\n    <!-- Recommendations -->\n    <section id=\"recommendations\">\n      <h2>Recommendations</h2>\n      <div style=\"clear:both;\"></div>\n      <div class=\"all_recommendations\" id=\"all_recommendations\">\n        <div class=\"recommendation\">\n          <span>&#8220;</span>\n          he takes initiative within a team and has potentials to lead the team.\n          he has a curious mind and asks the right question. \n          For any future projects that need her expertise I would definitely want to work with him again.\n          he will be an asset for any organisation!\n\n          <span>&#8221;</span>\n        </div>\n        <div class=\"recommendation\">\n          <span>&#8220;</span>\n          he is a committed resource who has in depth knowledge about the domain. \n          he got a great attitude & she is an excellent team player.\n          he is highly knowledgable and always goes the extra step to make sure everything is right. \n          <span>&#8221;</span>\n        </div>\n        <div class=\"recommendation\">\n          <span>&#8220;</span>\n          omkar is a very quick learner and quickly grasps key concepts of Web development. \n          Working with omkar has been an awesome experience. \n          I had worked along with omkar during the initial phase of our venture which needed Web development.  \n          <span>&#8221;</span>\n        </div>\n      </div>\n    </section>\n\n    <!-- Recommendation Form -->\n    <section id=\"contact\">\n      <div class=\"flex_center\">\n        <fieldset>\n          <legend class=\"introduction\">Leave a Recommendation</legend>          \n          <input type=\"text\" placeholder=\"Name (Optional)\"> <br/>\n          <textarea id=\"new_recommendation\" cols=\"500\" rows=\"10\" placeholder=\"Message\"></textarea>\n          <div class=\"flex_center\">\n            <button id=\"recommend_btn\" onclick=\"addRecommendation()\">Submit</button>\n          </div>\n        </fieldset>\n      </div>\n    </section>\n\n    <div class=\"iconbutton\">\n      <a href=\"#home\">\n        <!--Add the code here for the logo to appear and the icon to be actionable-->\n        <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"white\" width=\"63px\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />\n        </svg>\n      </a>\n    </div>\n\n    <div class=\"popup\" id=\"popup\" class=\"flex_center\">\n      <img src=\"html_finalprojimages/checkmark--outline.svg\"/>\n      <h3>Thanks for leaving a recommendation!</h3>\n      <button onclick=\"showPopup(false)\">Ok</button>\n    </div>\n  </body>\n</html>\n",
                "language": "html"
            },
            {
                "name": "script.js",
                "type": "file",
                "content": "function addRecommendation() {\n  // Get the message of the new recommendation\n  let recommendation = document.getElementById(\"new_recommendation\");\n  // If the user has left a recommendation, display a pop-up\n  if (recommendation.value != null && recommendation.value.trim() != \"\") {\n    console.log(\"New recommendation added\");\n    //Call showPopup here\n    \n    showPopup(true);\n    \n    // Create a new 'recommendation' element and set it's value to the user's message\n    var element = document.createElement(\"div\");\n    element.setAttribute(\"class\",\"recommendation\");\n    element.innerHTML = \"\\<span\\>&#8220;\\</span\\>\" + recommendation.value + \"\\<span\\>&#8221;\\</span\\>\";\n    // Add this element to the end of the list of recommendations\n    document.getElementById(\"all_recommendations\").appendChild(element); \n    \n    // Reset the value of the textarea\n    recommendation.value = \"\";\n\n  }\n}\n\nfunction showPopup(bool) {\n  if (bool) {\n    document.getElementById('popup').style.visibility = 'visible';\n    document.getElementById('popup').style.backgroundColor = '#D4EDFF';\n    document.getElementById('popup').style.padding = '20px';\n    document.getElementById('popup').style.borderRadius = '8px';\n    document.getElementById('popup').style.textAlign = 'center';\n  } else {\n    document.getElementById('popup').style.visibility = 'hidden';\n  }\n}\n",
                "language": "javascript"
            }
        ]
        self.git_url: str = "https://github.com/omkareshwar9849/omkar-portfolio"
        self.branch: str = "main"

    def get_file_content(self, file_name: str) -> Union[str, None]:
        """
        Retrieve the content of a specific file from the portfolio data.

        Args:
            file_name (str): The name of the file to retrieve.

        Returns:
            Union[str, None]: The content of the file if found, None otherwise.
        """
        for child in self.children:
            if child["name"] == file_name and child["type"] == "file":
                return child["content"]
        return None

    def get_file_language(self, file_name: str) -> Union[str, None]:
        """
        Retrieve the language of a specific file from the portfolio data.

        Args:
            file_name (str): The name of the file to retrieve the language for.

        Returns:
            Union[str, None]: The language of the file if found, None otherwise.
        """
        for child in self.children:
            if child["name"] == file_name and child["type"] == "file":
                return child.get("language")
        return None

    def add_file(self, name: str, content: str, language: str) -> None:
        """
        Add a new file to the portfolio data.

        Args:
            name (str): The name of the new file.
            content (str): The content of the new file.
            language (str): The programming language of the new file.
        """
        new_file = {
            "name": name,
            "type": "file",
            "content": content,
            "language": language
        }
        self.children.append(new_file)

    def update_file(self, name: str, content: str) -> bool:
        """
        Update the content of an existing file in the portfolio data.

        Args:
            name (str): The name of the file to update.
            content (str): The new content for the file.

        Returns:
            bool: True if the file was updated successfully, False otherwise.
        """
        for child in self.children:
            if child["name"] == name and child["type"] == "file":
                child["content"] = content
                return True
        return False

    def delete_file(self, name: str) -> bool:
        """
        Delete a file from the portfolio data.

        Args:
            name (str): The name of the file to delete.

        Returns:
            bool: True if the file was deleted successfully, False otherwise.
        """
        for i, child in enumerate(self.children):
            if child["name"] == name and child["type"] == "file":
                del self.children[i]
                return True
        return False