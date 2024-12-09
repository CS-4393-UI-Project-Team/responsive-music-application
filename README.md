# responsive-music-application

## Table of Contents

1. [Overview](#Overview)
2. [Project Description](#Project-Description)
3. [Access to Our UX Research Survey](#Access-Our-UX-Research-Survey)
4. [Figma Prototypes](#Figma-Prototypes)
5. [Our Tech Stack](#Our-Tech-Stack)
6. [Link to Deployed Application](#Link-to-Deployed-Application)
7. [Video Walkthrough](#Video-Walkthrough)

## Overview

Develop a comprehensive music streaming web platform that allows users to create accounts, log in, and manage their music libraries. There will be search and filtering options, allowing users to find songs by genre, lyrics, release date, etc. The platform will also have e-commerce functionalities such as a shopping cart, check-out process, and subscription tiers.

## Project Description

- Login
  - Create account
  - Existing user
  - \*\*possible login with existing account from other apps
- Songs
  - Lyrics
  - Album, Artist
  - Release Date
  - Price
- Search
  - Genre
  - Lyrics
  - Album, Artist
  - Release Date
  - Users (usernames)
- Organizing and filtering
  - Genre
  - Sort alphabetically
- Inspect details
  - Owned/saved
  - Price
  - Recommended songs
- Shopping cart
  - Check-out
  - Subscription tiers
- User Profiles
  - Username
  - Top Song

## Access to Our UX Research Survey

Link to our UX Research Survey:
https://docs.google.com/forms/d/e/1FAIpQLSdlhO_tCgjRzPqiF3Nrh0CIGYTxJ2Rzk78__p57yMKQF6JG6A/viewform?usp=sf_link

## Figma Prototypes

Link to our Figma prototypes before coding:
https://www.figma.com/design/Rshx9rLqZSDbKyKyqeCJkM/Music-Application-Prototypes?node-id=0-1&node-type=canvas&t=UyN8dWxb0fBaK2jS-0

## Our Tech Stack

UX Design and Research Tools:

![Figma](#https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

Front-end:

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

Back-end:

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

Database Management:

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## Prerequisites

Ensure the following tools are installed:

- Node.js (v16 or later)
- MongoDB (local instance or cloud connection)
- A package manager (npm or yarn)

## Steps to Run Locally

- Clone the Repository
- Install Dependencies:
  Visit each of the 3 main directories and run npm install
- Set Up Environment Variables
  in responsive-music-application you need a .env with "VITE_AUTH0_DOMAIN=dev-k5wtcdx4dwo3han3.us.auth0.com
  VITE_AUTH0_CLIENT_ID=hl1RlR4S6NaoNvKWM2rqVxbSHkZkVKy5"
  in music-app-back-end you need a .env file with "CLOUDINARY_NAME = "dxjsxe7a5"
  CLOUDINARY_API_KEY = "675443672967721"
  CLOUDINARY_SECRET_KEY = "vISFnyCzY1IGGvBBQ61LQiIAfXw"
  MONGODB_URI = "mongodb+srv://jaemg8:jmg033121@cluster0.la4zf.mongodb.net""
- Run the Backend Server
  "npm run server"
- Run the Frontend Server
  for admin panel go to music_app-admin and run "npm run dev"
  for the application run "npm run dev" in the responsive-music-application directory
- Access the Application
  You should be able to see the site on your localhost:5173

## Link to Deployed Application
Deployed via Vercel
https://responsive-music-application.vercel.app/login

## Application Images

