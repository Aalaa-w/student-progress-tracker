# Student Progress Tracker (Vue 3 + Composition API + Tailwind CSS + TypeScript + Vite)

A responsive and accessible Vue 3 dashboard for tracking student progress, supporting dark mode, high contrast, and role-based views for Teachers and Administrators.

---

## Project Setup

```bash
# Clone the repository
git clone https://github.com/Aalaa-w/student-progress-tracker.git
cd student-progress-tracker

# Install dependencies
npm install

# Start the development server
npm run dev

# Run mock API server
npm run api
```

# Performance Optimization

Lazy-loaded routes and dynamic imports for heavy components like charts.

Used defineAsyncComponent() to reduce initial bundle size.

pagination support for large student datasets.

Lighthouse-tested for performance, accessibility, and best practices.

# Accessibility (WCAG 2.1 AA)

Semantic HTML (<header>, <nav>, <aside>, <section>, etc.)

aria-labels, role attributes, and keyboard navigability.

Support for high contrast mode and dark mode.

# AI Tools & Prompt Engineering

Used ChatGPT to:

Guide on WCAG compliance and responsive behavior.

Build README and documentation content.

Future Enhancements

1. Notification System
   Add a bell icon in the header with a dropdown showing the latest notifications.

Display role-specific notifications (e.g., teacher notifications differ from admin).

Integrate real-time updates using WebSockets in the future.

2. User Profile Page
   Create a dedicated profile page for both Teachers and Administrators.

Display user information such as username, role, and personalized content:

Teachers: assigned classes or subjects.

Administrators: general statistics .

Allow future updates to user profile data (editable form).

3. Role-Based Permissions
   Teachers can only view their own assigned students and related data.

Administrators can view all system data, including teachers and students.

Apply data filtering based on the user's role throughout the application.

# Project Structure

src/
├── assets/ # Static assets (images, css)
├── components/ # Reusable Vue components
├── layout/ # layout(header)
├── router/ # Vue Router setup and route guards
├── stores/ # Pinia stores for state management
├── views/ # Main pages (Dashboard, Login, etc.)
├── App.vue # Root component
├── main.ts # App entry point
└── index.html # HTML template

```

# Scripts
npm run dev     # Start development server
npm run api     # Start mock API (json-server)
npm run build   # Build for production

```
