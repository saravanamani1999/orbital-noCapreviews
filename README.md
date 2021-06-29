# noCapReviews
<a href="https://nocap-reviews.herokuapp.com/">
<img src="github_imgs/github-banner.png" alt="Project Banner" >
</a>
<p float="left">
<img src="github_imgs/js.png" alt="Javascript Logo" width="40" height="40">
<img src="github_imgs/nodejs.png" alt="Javascript Logo" width="60" height="40">
<img src="github_imgs/html.png" alt="Html Logo" width="40" height="40">
<img src="github_imgs/css.png" alt="CSS Logo" width="40" height="40">
<img src="github_imgs/mongodb.png" alt="MongoDB Logo" width="40" height="40">
</p>

<!-- ABOUT THE PROJECT -->
## About

noCapReviews is a simple web application aiming to provide insightful information to undergraduates about modules they are interested in, enabling them to make more informed decisions when it comes to module planning

This project is developed for a 1st year summer self-directed, independent work course [Orbital](https://orbital.comp.nus.edu.sg/) by the School of Computing at the National University of Singapore

## Features

* Search for Modules
* Web-based Forum
* Rating of Modules through Sentimental Analysis (Stil in development)


## Getting Started

noCapReviews is currently hosted on Heroku and can be found [here](https://nocap-reviews.herokuapp.com/)

However if you want to get a local copy up and running, follow these simple steps

### Prerequisites

* [node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/wuchuank/orbital-noCapreviews.git
   ```

2. Install npm packages

   ```sh
   npm install
   ```

### Setup

1. Start the MongoDB database on ur terminal and leave it running
  
    ```sh
    mongod
    ```

2. Run seeds.js on another terminal.\
Wait for a response "seed finished running" on the console.
(*this only needs to be run once*)

    ```sh
    node seeds.js
    ```
  
3. To run the web application call the following command and navigate to http://localhost:3000/

    ```sh
    node app.js
    ```

## More about the project

To learn more about the project, follow these links

[readme](https://drive.google.com/file/d/1f1AS1vjUYV06J2cjqtrh6IK-8UCjg9pa/view?usp=sharing) |
[poster](https://drive.google.com/file/d/1HZKVawQxFTziEO7I7tvN-j6oPbasZ-MT/view?usp=sharing) |
[video](https://drive.google.com/file/d/1QS7aH8rX26W99Z8chZaHqEWJvpfPOV5y/view?usp=sharing)
