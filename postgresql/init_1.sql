CREATE USER PSQL_USER_FOR_DJANGO WITH PASSWORD 'PSQL_USER_PASSWORD_FOR_DJANGO';
CREATE DATABASE pandatch_db;
GRANT ALL PRIVILEGES ON DATABASE pandatch_db TO PSQL_USER_FOR_DJANGO