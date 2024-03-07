# Frontend challenge - Imgur

This repository aims to implement a simple web app that allows browsing the Imgur gallery. The app is 
developed using ReactJS and Typescript. These are the main features the app
supports:
- show gallery images in a grid of thumbnails;
- show image description in the thumbnail, top or bottom;
- allow selecting the gallery section: hot, top, user;
- allow including/excluding viralimages from the result set;
- when clicking an image in the gallery - show its details: big image, title, description,
upvotes, downvotes and score;
- apply search by keyword;

The project is made of two sub-repositories found here: imgur-api and portal. As the name implies imgur-api handles fetching data from the original Imgur REST API while portal is the React application showing such data. Each project has its own stack and instructions for correct execution. The final result is a combination of two projects.

## Check out the final result at: https://imgur-portal.fly.dev/