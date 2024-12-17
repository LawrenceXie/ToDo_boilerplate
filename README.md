# Boilerplate for new projects

This template provides a minimal setup to get a Django backend working with React frontend

## Backend setup
Create and activate a virtual environment

`python -m venv venv`
`source venv/bin/activate`

Install Python packages
`pip install -r requirements.txt`

Initialize the database
`python manage.py migrate`

## Frontend setup
`npm install`
or
`yarn install`

For local development
`npm run dev`

## Deployment
Under /front, `npm run build`
This will generate the /dist folder including the index.html, .js, .css

Copy this to the backend under /backend/backend_app/static/
Django will then serve this at the base domain