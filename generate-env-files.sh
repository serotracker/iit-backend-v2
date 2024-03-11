#!/bin/bash

env_local_etl_file="./.env-local-etl"
if ! [ -f $env_local_etl_file ]; then
  touch $env_local_etl_file
  echo "AIRTABLE_API_KEY=PLEASE_SPECIFY" >> $env_local_etl_file
  echo "AIRTABLE_ARBO_BASE_ID=PLEASE_SPECIFY" >> $env_local_etl_file
  echo "AIRTABLE_SARSCOV2_BASE_ID=PLEASE_SPECIFY" >> $env_local_etl_file
  echo "AIRTABLE_EMPLOYEE_BASE_ID=PLEASE_SPECIFY" >> $env_production_etl_file
  echo "GEOCODING_API_ENABLED=true" >> $env_local_etl_file
  echo "MONGODB_URI=PLEASE_SPECIFY" >> $env_local_etl_file
  echo "MAPBOX_ACCESS_TOKEN=PLEASE_SPECIFY" >> $env_local_etl_file
  echo "DATABASE_NAME=PLEASE_SPECIFY" >> $env_local_etl_file
  echo "ENVIRONMENT=LOCAL" >> $env_local_etl_file
fi

env_production_etl_file="./.env-production-etl"
if ! [ -f $env_production_etl_file ]; then
  touch $env_production_etl_file
  echo "AIRTABLE_API_KEY=PLEASE_SPECIFY" >> $env_production_etl_file
  echo "AIRTABLE_ARBO_BASE_ID=PLEASE_SPECIFY" >> $env_production_etl_file
  echo "AIRTABLE_SARSCOV2_BASE_ID=PLEASE_SPECIFY" >> $env_production_etl_file
  echo "AIRTABLE_EMPLOYEE_BASE_ID=PLEASE_SPECIFY" >> $env_production_etl_file
  echo "GEOCODING_API_ENABLED=true" >> $env_production_etl_file
  echo "MONGODB_URI=PLEASE_SPECIFY" >> $env_production_etl_file
  echo "MAPBOX_ACCESS_TOKEN=PLEASE_SPECIFY" >> $env_production_etl_file
  echo "DATABASE_NAME=PLEASE_SPECIFY" >> $env_production_etl_file
  echo "ENVIRONMENT=PRODUCTION" >> $env_production_etl_file
fi

vercel_local_env_file="./.env.local"
if ! [ -f $vercel_local_env_file ]; then
  touch $vercel_local_env_file
  truncate -s 0 $vercel_local_env_file
  echo "DATABASE_NAME=\"PLEASE_SPECIFY\"" >> $vercel_local_env_file
  echo "MONGODB_URI=\"PLEASE_SPECIFY\"" >> $vercel_local_env_file
  echo "NX_DAEMON=\"\"" >> $vercel_local_env_file
  echo "TURBO_REMOTE_ONLY=\"\"" >> $vercel_local_env_file
  echo "TURBO_RUN_SUMMARY=\"\"" >> $vercel_local_env_file
  echo "VERCEL=\"1\"" >> $vercel_local_env_file
  echo "VERCEL_ENV=\"development\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_COMMIT_AUTHOR_LOGIN=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_COMMIT_AUTHOR_NAME=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_COMMIT_MESSAGE=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_COMMIT_REF=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_COMMIT_SHA=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_PREVIOUS_SHA=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_PROVIDER=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_PULL_REQUEST_ID=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_REPO_ID=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_REPO_OWNER=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_REPO_SLUG=\"\"" >> $vercel_local_env_file
  echo "VERCEL_URL=\"\"" >> $vercel_local_env_file
fi