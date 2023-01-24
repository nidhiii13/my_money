# my_money
MONEY TRACKER - MY_MONEY

## Tech Stack Used
1. React (for frontend development)
2. Django (for backend development)
3. SQLite (for database)

## Steps to run the project.

1. Clone the repository  - 
```
git clone https://github.com/nidhiii13/my_money.git
cd my_money
```
2. To start the frontend : (React application)<br/>
Open Terminal and run the following commands: 

```
cd frontend
npm install 
npm start (to run the frontend application)
```
Open browser : http://localhost:3000/ for homepage

3. To start the backend: (Django)<br/>
Open Terminal and run the following commands
```
cd money_tracker_backend
virtualenv venv (create virtual environment)
venv\Scripts\activate 
pip install -r requirements.txt  (install the python dependencies)
python manage.py makemigrations
python manage.py migrate
python manage.py runserver  (to start the backend server)
```
