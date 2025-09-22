# ReThinkWaste

ReThinkWaste is a Node.js/Express web application for managing products, orders, pickups, and user authentication, with file uploads and an admin dashboard. It uses MongoDB for data storage and EJS for server-side rendering.

## Features

- User authentication (login/register)
- Admin and user dashboards
- Product management (CRUD)
- Order management
- Product requests
- Pickup scheduling
- File uploads (with Multer)
- Feedback/contact form
- Data visualization for pickups and feedback
- Static asset serving

## Screenshots

![Screenshot 1](img/Screenshot%20(1).png)
![Screenshot 4](img/Screenshot%20(4).png)
![Screenshot 5](img/Screenshot%20(5).png)
![Screenshot 6](img/Screenshot%20(6).png)
![Screenshot 7](img/Screenshot%20(7).png)
![Screenshot 9](img/Screenshot%20(9).png)
![Screenshot 12](img/Screenshot%20(12).png)
![Screenshot 13](img/Screenshot%20(13).png)
![Screenshot 14](img/Screenshot%20(14).png)
![Screenshot 16](img/Screenshot%20(16).png)

## Project Structure

```
.
├── app.js                  # Main application entry point
├── config/
│   └── db.js               # MongoDB connection
├── models/                 # Mongoose models
├── routes/                 # Express route handlers
├── public/                 # Static assets (CSS, JS, images)
├── uploads/                # Uploaded files
├── views/                  # EJS templates
├── .env                    # Environment variables
├── package.json
└── README.md
```

## Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/BahubaliNalte/ReThinkWaste.git
   cd ReThinkWaste
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Run the application:**
   ```sh
   node app.js
   ```
   The server will start on the default port (e.g., 3000).

## Usage

- Visit `/` or `/login` to access the login page.
- Register a new user at `/register`.
- Access the user dashboard at `/user` (requires login).
- Admin dashboard is available at `/admin`.
        admin login 
        username - admin
        password - admin123
- Manage products at `/products`.
- Schedule pickups at `/pickup`.
- View data analytics at `/dataRender`.

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- EJS (Embedded JavaScript templates)
- Multer (file uploads)
- JWT (authentication)
- Bootstrap (frontend styling)

## License

MIT

---

**Note:** Update the MongoDB URI and JWT secret in your `.env` file before running the application.
