# Multi-stage build for React frontend and Python backend
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Python backend stage
FROM python:3.9-slim

WORKDIR /app

# Install backend dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy built frontend
COPY --from=frontend-build /app/frontend/build ./frontend/build

# Expose ports
EXPOSE 8000 3000

# Start script
COPY start.sh ./
RUN chmod +x start.sh

RUN useradd -U -u 1000 appuser && \
    chown -R 1000:1000 /app
USER 1000

CMD ["./start.sh"]