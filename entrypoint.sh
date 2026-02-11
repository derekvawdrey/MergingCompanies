#!/bin/sh
set -euo pipefail

# Run migrations (use compiled output; src/ is not present in the runner image)
node ./dist/database/migrator.js

# If migrations succeeded, run the main container command
exec "$@"