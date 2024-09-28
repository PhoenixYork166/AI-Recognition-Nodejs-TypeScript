#!/bin/bash

# Prompting for PostgreSQL admin user (superuser, typically 'postgres' on Windows) OR your macOS username for PostgreSQL on mac OS
read -p "Enter your PostgreSQL admin user [e.g. postgres]: " adminUser

read -p "Enter your PostgreSQL database name [e.g. smart-brain]: " dbName

# Prompting to enter postgreSQL username for checking
read -p "Enter new psql username for our checking: " psqlUser
psql -U $psqlUser -d $psqlUser -tAc "SELECT 1 FROM pg_roles WHERE rolname='$psqlUser'"

if [[ $? -ne 0 ]]; 
then
    echo "";
    echo "$psqlUser was not found";
    echo "Creating psqlUser: $psqlUser";

    read -sp "Enter your desired psql password for $psqlUser: " psqlPassword
    # Create the psql user
    psql -U $adminUser -d $dbName -c "CREATE ROLE $psqlUser WITH LOGIN PASSWORD '$psqlPassword' SUPERUSER CREATEDB CREATEROLE;";

else
    echo "";
    echo "$psqlUser was found, no need to recreate this user";
    echo "Exiting...";
    exit 0;
fi