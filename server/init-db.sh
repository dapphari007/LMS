#!/bin/bash
set -e

# The database is already created by PostgreSQL based on POSTGRES_DB environment variable
# This script is just to ensure any additional setup is done

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create extensions or additional setup if needed
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL

echo "Database initialization completed"