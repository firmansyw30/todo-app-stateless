# todo-app-stateless

A simple yet effective todo application with a React frontend and a Node.js backend. This project allows users to manage their tasks efficiently. 🚀

## 🚀 Key Features

- **Create Todos:** Add new tasks to your todo list with a title. ✅
- **Read Todos:** View all your existing todos. 📖
- **Update Todos:** Mark todos as completed or edit their titles. ✏️
- **Delete Todos:** Remove todos that are no longer needed. 🗑️
- **Health Check:** A simple endpoint to check the backend's status. 🩺
- **Frontend:** User-friendly interface built with React. 🎨
- **Backend:** Robust API built with Node.js and Express. ⚙️
- **Dockerized:** Easy to deploy and run using Docker and Docker Compose. 🐳
- **CORS Enabled:** Securely handles cross-origin requests. 🛡️
- **HTML Escaping:** Prevents XSS vulnerabilities by escaping HTML characters in todo titles. 🔒

## 🛠️ Tech Stack

- **Frontend:**
    - JavaScript
    - HTML
    - CSS
    - Nginx
- **Backend:**
    - Node.js
    - Express
    - nanoid
    - CORS
- **DevOps:**
    - Docker
    - Docker Compose

## 📦 Getting Started

### Prerequisites

- Node.js and npm (for local development)
- Docker and Docker Compose (for containerized deployment)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Backend Setup:**

    ```bash
    cd backend
    npm install
    cd ..
    ```

3.  **Frontend Setup:**

    ```bash
    cd frontend
    # No npm install needed as it's served as static files
    cd ..
    ```

### Running Locally

1.  **Start the Backend:**

    ```bash
    cd backend
    npm start
    cd ..
    ```

    The backend server will run on `http://localhost:8080`.

2.  **Start the Frontend:**

    Open the `frontend/index.html` file in your browser.  Configure the `BACKEND_URL` in `frontend/main.js` to point to your local backend if it's not the default `http://localhost:8080`.

### Running with Docker Compose

1.  **Build and run the application using Docker Compose:**

    ```bash
    docker-compose up --build
    ```

    This command builds the Docker images and starts the containers. The frontend will be accessible at `http://localhost:3000`, and the backend at `http://localhost:5000`.

## 💻 Usage

1.  Open your web browser and navigate to `http://localhost:3000` (or the port you configured for the frontend).
2.  Use the input field to add new todos.
3.  Click the checkbox to mark todos as complete.
4.  Click the delete button to remove todos.

## 📂 Project Structure

```
├── backend/
│   ├── index.js          # Backend API server
│   ├── package.json      # Backend dependencies and scripts
│   ├── Dockerfile        # Docker configuration for the backend
│   └── ...
├── frontend/
│   ├── main.js           # Frontend JavaScript logic
│   ├── index.html        # Frontend HTML
│   ├── nginx.conf        # Nginx configuration for serving the frontend
│   ├── Dockerfile        # Docker configuration for the frontend
│   └── ...
├── backend-resources.tf  # Cloud Run & Artifact Registry for backend
├── frontend-resources.tf # Cloud Run & Artifact Registry for frontend
├── output.tf             # Output from terraform
├── provider.tf           # Define Google Cloud Provider
├── variables.tf          # Variable for Google Cloud Platform
├── docker-compose.yml    # Docker Compose configuration
└── README.md             # This file
```

## ☁️ Cloud Infrastructure Setup (Google Cloud Platform)

This section covers deploying the application to Google Cloud Platform (Cloud Run) using Terraform and Google Artifact Registry.

### Prerequisites for Cloud Deployment

- Google Cloud Project with billing enabled
- Terraform installed locally
- Google Cloud SDK (`gcloud`) installed and authenticated
- Service account key JSON file

### Infrastructure Deployment Steps

1.  **Set Google Application Credentials (in powershell, or related terminal):**

    ```bash
    $env:GOOGLE_APPLICATION_CREDENTIALS = "our-hull-385315-c05e50737373.json"
    ```

    This sets the path to your Google Cloud service account key for Terraform authentication.

2.  **Create Artifact Repositories:**

    ```bash
    terraform apply -target="google_artifact_registry_repository.backend_repo" -target="google_artifact_registry_repository.frontend_repo"
    ```

    This creates Docker repositories in Google Artifact Registry for both backend and frontend images.

3.  **Configure Docker Authentication:**

    ```bash
    gcloud auth configure-docker us-central1-docker.pkg.dev
    ```

    This authorizes Docker to push images to Google Artifact Registry.

4.  **Build and Push Backend Image:**

    ```bash
    cd backend
    docker build -t us-central1-docker.pkg.dev/PROJECT_ID/backend-repo/api:latest .
    docker push us-central1-docker.pkg.dev/PROJECT_ID/backend-repo/api:latest
    cd ..
    ```

    Replace `PROJECT_ID` with your actual Google Cloud Project ID.

5.  **Build and Push Frontend Image:**

    ```bash
    cd frontend
    docker build -t us-central1-docker.pkg.dev/PROJECT_ID/frontend-repo/web:latest .
    docker push us-central1-docker.pkg.dev/PROJECT_ID/frontend-repo/web:latest
    cd ..
    ```

6.  **Deploy Infrastructure:**

    ```bash
    terraform apply
    ```

    This deploys all remaining cloud resources

## 📸 Screenshots

![(Screenshots](https://image2url.com/images/1763778831109-f451b7f7-7005-48bf-8f80-676f9844caca.png)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Commit your changes with descriptive commit messages.
4.  Push your changes to your fork.
5.  Submit a pull request.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

If you have any questions or suggestions, feel free to contact me at [firmansyahwicaksono30@gmail.com](mailto:firmansyahwicaksono30@gmail.com).

## 💖 Thanks Message

Thank you for checking out this todo application! I hope it's helpful and easy to use. Your feedback and contributions are highly appreciated! 🙏