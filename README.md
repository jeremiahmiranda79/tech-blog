# tech-blog
    
  ## License
  ![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg) 
 
  (https://www.gnu.org/licenses/gpl-3.0)

  ## Description
  - GIVEN a CMS-style blog site
  - WHEN I visit the site for the first time
  - THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
  - WHEN I click on the homepage option
  - THEN I am taken to the homepage
  - WHEN I click on any other links in the navigation
  - THEN I am prompted to either sign up or sign in
  - WHEN I choose to sign up
  - THEN I am prompted to create a username and password
  - WHEN I click on the sign-up button
  - THEN my user credentials are saved and I am logged into the site
  - WHEN I revisit the site at a later time and choose to sign in
  - THEN I am prompted to enter my username and password
  - WHEN I am signed in to the site
  - THEN I see navigation links for the homepage, the dashboard, and the option to log out
  - WHEN I click on the homepage option in the navigation
  - THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created

  - WHEN I click on an existing blog post
  - THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment

  - WHEN I enter a comment and click on the submit button while signed in
  - THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created

  - WHEN I click on the dashboard option in the navigation
  - THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post

  - WHEN I click on the button to add a new blog post
  - THEN I am prompted to enter both a title and contents for my blog post
  - WHEN I click on the button to create a new blog post
  - THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
  - WHEN I click on one of my existing posts in the dashboard
  - THEN I am able to delete or update my post and taken back to an updated dashboard
  - WHEN I click on the logout option in the navigation
  - THEN I am signed out of the site
  - WHEN I am idle on the site for more than a set time
  - THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments

  ## Table of Contents
  - [License](#license)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribution](#contribution)
  - [Test](#test)
  - [Badges](#badges)
  - [Features](#features)

  ## Installation
  Clone: https://github.com/jeremiahmiranda79/tech-blog

  Install packages: at the root of the project open a console and run: npm i

  Run the app: npm start

  View: open a browser and view on localhost:3001

  ## Usage
  Find the app live on Heroku here: https://tech-blog-jm79-c1f6fd0a03b3.herokuapp.com/

  ## Contribution
  I used my README.md file generator to create this README.md 😉

  GitHub: https://github.com/jeremiahmiranda79/Pro-README-FILE-Generator

  Email: jeremiahmiranda79@gmail.com

  ## Test
  We use Insomnia to test!

  https://insomnia.rest/download

  ## Badges
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white) ![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

  ## Features
  TODO: Manually add you features here(for now 😉)!

  - API POST Posts 
  ![Alt text](public/assets/Screenshot%202023-08-16%20011306.png)
  - API Login/CreateUser
  ![Alt text](public/assets/Screenshot%202023-08-16%20011354.png)
  - API Create a comment
  ![Alt text](public/assets/Screenshot%202023-08-16%20011436.png)
  - API Create a post
  ![Alt text](public/assets/Screenshot%202023-08-16%20011517.png)