# FTF - Fast Trend Fashion
* Designed UI/UX with Figma, developed a full-stack AI-powered web app for fashion e-commerce using React, Node.js, Express.js, MongoDB, Python, Pytorch, CuPy, FastAPI, and tunneled AI server with Ngrok. 
* Trained and integrated AI try-on models into the web app, assisting customers in finding products that look good on them with AI as if they are trying on clothes in fashion stores. Improved page speed by 40% by optimizing image loading on backend and AI servers.

# Run code
Step 1: Download the GitHub repo or clone the repo

Step 2: cd FTF-Fast-Trend-Fashion

Step 3: Backend:

* cd backend
* npm install
* node ./index.js

Step 4: AI FastAPI

* Upload folder AI-Tryon/KiseKloset to Google Drive
* Upload file AI-Tryon/DMVTON fast app.ipynb to Google Drive
* Run file DMVTON fast app.ipynb on Google Colab. When we run the last cell of this file, it will generate a public URL link for FastAPI. Copy this link. For example, the link can be https:/somethinghere.ngrok-free.app/

Step 5: Run frontend:

* Change the URL in file ProjectView.jsx to https:/somethinghere.ngrok-free.app/try-on/image (https:/somethinghere.ngrok-free.app/ is the link we copied from the previous step). This will make the frontend connect with AI FastAPI to send HTTP post requests to FastAPI, and FastAPI will return the try-on result.
* cd frontend
* npm install
* npm start

# Architecture
![new architecture 491 - Copy](https://github.com/user-attachments/assets/1bd4b97c-5e14-4b2f-a9ea-6682218314a5)
