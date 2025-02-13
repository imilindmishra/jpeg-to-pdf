# JPEG-to-PDF Converter

A simple full-stack application that converts uploaded JPEG images to PDF files. The project consists of a Node.js/Express backend for handling file uploads and PDF generation, and a React frontend that provides a responsive, user-friendly interface for uploading images and downloading the generated PDF.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Responsive UI:**  
  A clean, mobile-friendly React interface with an upload area and a convert button.
  
- **File Upload:**  
  Users can select a JPEG image through an intuitive upload area.

- **Image Conversion:**  
  The backend processes the uploaded image, converting it to a PDF using [PDFKit](https://pdfkit.org/).

- **File Download:**  
  The converted PDF is sent back to the client and automatically downloaded.

- **Clean and Modular Codebase:**  
  The project separates the frontend and backend logic for easier maintenance and scalability.

## Tech Stack

- **Frontend:**
  - **React:** For building the user interface.
  - **CSS:** For styling and responsive design.
  - **Fetch API:** For handling HTTP requests to the backend.

- **Backend:**
  - **Node.js:** The runtime environment.
  - **Express:** Web framework to create API endpoints.
  - **Multer:** Middleware for handling file uploads.
  - **PDFKit:** Library for generating PDF files.
  - **CORS:** Middleware to enable cross-origin requests.

## Folder Structure

