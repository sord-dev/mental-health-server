# Mental Health Web Application Backend API Documentation

Welcome to the backend API documentation for our mental health web application! This documentation provides an overview of the API endpoints, request/response formats, and authentication mechanisms used by our application's backend.

## Technologies Used

Our backend is built using the following technologies:

- Express.js: a fast and minimalist web framework for Node.js
- Postgres: an SQL database for storing data
- OpenAI API: for providing personalized mentorship to users
- Node.js: a JavaScript runtime environment for building server-side applications

## API Endpoints

The backend API provides the following endpoints:

### User Authentication Endpoints

- `POST /auth/register`: Register a new user with the application by providing their name, email, and password.
- `POST /auth/login`: Authenticate a user by providing their email and password.

### User Endpoints

- `GET /user/:id`: Retrieve a user's profile information by their user ID.
- `PATCH /user/pts`: Update a user's points by providing their user ID and the new point value.
- `PATCH /user/goals`: Update a user's long-term goals by providing their user ID and the new goal value.
- `PATCH /user/st/goals`: Update a user's short-term goals by providing their user ID and the new short-term goal value.
- `POST /user/st/goals`: Mark a user's short-term goal as completed by providing their user ID and the goal ID.
- `PATCH /user/mentor`: Update a user's active mentor by providing their user ID and the new mentor ID.

### Forum Endpoints

- `GET /forum`: Retrieve all forums.
- `GET /forum/forum/:id`: Retrieve a forum by its ID.
- `GET /forum/user/:user_id`: Retrieve all forums from a specific user by providing their user ID.
- `POST /forum`: Create a new forum by providing its title, description, and user ID.
- `PATCH /forum/:id`: Update a fourm.
- `DELETE /forum/:id`: Delete a forum.

### AI Mentor Endpoints

- `POST /mentor/chat`: Get a personalized message from the user's AI mentor based on their current mental state by providing their user ID.
- `POST /mentor/info`: Retrieve information about available AI mentors.
- `GET /mentor/prices`: Retrieve information about available AI mentor personalities and their prices from the marketplace.

## Response Format

The API returns responses in JSON format. The response format consists of two fields: `success` and `data`. The `success` field indicates whether the request was successful or not, and the `data` field contains the response data.

## Authentication

Currently, our backend API does not use JSON Web Tokens (JWT) or any other form of authentication. Authentication is managed through the `/auth/register` and `/auth/login` endpoints, which use email and password for user authentication.

We hope this documentation provides a helpful overview of our backend API. If you have any questions or feedback, please don't hesitate to reach out to us!