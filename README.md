# AI Week 5 Homework Project

## Overview

This project consists of a FastAPI backend and a Next.js frontend. The backend is responsible for handling server-side logic and serves as an API endpoint, while the frontend provides the user interface. The two components work together to provide a seamless user experience.

## Prerequisites

- Python 3.x
- Node.js
- npm (Node Package Manager)

## Backend: FastAPI

### Setup and Run

1. **Navigate to the Backend Directory**

   Open your terminal and navigate to the FastAPI backend directory:

   ```bash
   cd ai_wk5_hw_be
   ```

2. **Install Requirements**

   Install the Python dependencies using `requirements.txt`:

   ```bash
   pip install -r requirements.txt
   ```

3. **Run the FastAPI Application**

   Start the backend server by running:

   ```bash
   uvicorn main:app --reload
   ```

   The `--reload` flag is for development purposes and will auto-reload the server upon code changes.

## Frontend: Next.js

### Setup and Run

1. **Navigate to the Frontend Directory**

   Ensure you are in the appropriate directory for the Next.js application.

2. **Install Dependencies**

   Use npm to install all required packages:

   ```bash
   npm install
   ```

3. **Start the Development Server**

   Launch the Next.js development server:

   ```bash
   npm run dev
   ```

   Your application should now be running, typically accessible at `http://localhost:3000`.

## Additional Information

- Keep the backend and frontend servers running concurrently to ensure smooth communication between the API endpoints and the user interface.
- Update dependencies regularly and test thoroughly to maintain a seamless workflow.

## Contributing

Feel free to fork the repository and make contributions. Ensure any pull requests are well-documented, with a clear explanation of your changes.

## License
N/A
