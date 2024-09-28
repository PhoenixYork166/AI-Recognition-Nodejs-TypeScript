#!/bin/bash

# Prompting the user to enter postgreSQL Root account
read -p "Enter your PostgreSQL admin account name: " postgresRoot
psql -p 5432 -U $postgresRoot -d 'smart-brain';
