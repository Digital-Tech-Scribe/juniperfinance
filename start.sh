#!/bin/bash

# Start the FastAPI backend
cd /app/backend
python server.py &

# Serve the React frontend (you can also use nginx)
cd /app/frontend/build
python -m http.server 3000 &

# Keep container running
wait