# Travlr Getaways – Full-Stack MEAN Application
**Southern New Hampshire University – CS-465: Full Stack Development**

---

## Architecture
This project uses two different approaches to front-end development.

- **Customer-Facing Website:** Built with **Express.js** and **Handlebars (HBS)** to render static templates populated with live JSON data. This server-side rendering provides SEO-friendly pages and fast loading times.
- **Administrator Application (SPA):** Developed with **Angular**, creating a dynamic single-page experience for trip management (CRUD operations).

The backend uses **Node.js** with **MongoDB (NoSQL)** for flexibility and scalability. Trip records are stored as JSON documents, which align naturally with the data structures passed through the RESTful API.

---

## Functionality
**JSON** is the bridge between the front-end and back-end. The Angular SPA communicates with the Express API using JSON payloads, and the customer site consumes the same data through HBS templates.

Key features:
- CRUD functionality for trip management  
- JWT-based authentication for secure admin access  
- Reusable Angular components (`trip-form`, `trips-list`)  
- Centralized services for data handling

Refactoring improved maintainability, reduced redundancy, and made UI components reusable across the project.

---

## Testing
Testing included both **API validation** and **UI interaction**:
- Verified endpoints like `GET /api/trips`, `POST /api/trips`, and `PUT /api/trips/bycode/:tripCode`
- Used PowerShell and browser developer tools to test CRUD requests
- Ensured unauthorized requests were properly blocked without a valid JWT
- Confirmed successful data persistence in MongoDB

---

## Reflection
This course solidified my understanding of the **MEAN stack (MongoDB, Express, Angular, Node.js)** and the complete lifecycle of a web application. I learned how to:
- Architect and integrate both front- and back-end systems
- Implement authentication and secure routing
- Debug, organize, and optimize code in a full-stack environment

The experience strengthened my technical confidence and directly supports my professional goal of becoming a **project or product manager** with a strong technical foundation in modern web development.

---

---
