#!/bin/bash

# Prompting for PostgreSQL admin user (superuser, typically 'postgres' on Windows) OR your macOS username for PostgreSQL on mac OS
read -p "Enter your PostgreSQL admin user [e.g. postgres]: " adminUser

# Prompting for PostgreSQL database name [smart-brain]
read -p "Enter your PostgreSQL database name [e.g. smart-brain]: " dbName

# Display all psql users in this database [smart-brain]
psql -U $adminUser -d $dbName -c "\du";
