#!/bin/sh
set -euo pipefail

# Run migrations (use compiled output; src/ is not present in the runner image)
node ./dist/database/migrator.js

# Seed database if empty
node ./dist/database/seeder.js

# If migrations and seed succeeded, run the main container command
exec "$@"