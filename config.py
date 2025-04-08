import os
from dotenv import load_dotenv
import mysql.connector

load_dotenv()


DB_CONFIG = {
    "host": "localhost",
    "user": os.getenv("DATABASE_USER"),
    "password": os.getenv("DATABASE_PASSWD"),
    "database": os.getenv("DATABASE_NAME"),
}

def Get_db_connection():
    return mysql.connector.connect(**DB_CONFIG)

