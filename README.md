# **Report Builder** 📄

**Report Builder** is a tool that allows users to create templates using drag-and-drop components, inject data from a JSON file, and generate PDFs. Designed to streamline document generation.

---

## 📑 **Table of Contents**

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Features](#features)
- [How It Works](#how-it-works)
- [Setup](#setup)
- [Technologies Used](#technologies-used)

---

## 🚀 **Overview**

Report Builder provides an efficient way to create, edit, and download reports in a pre-defined format. Users can design templates on the frontend using a drag-and-drop interface, inject structured data from a JSON file on the backend, and download the final document as a **PDF**.

This tool also addresses challenges such as **page-break issues** and **table-break issues**, ensuring properly formatted and structured PDFs.

---

## 🎬 **Screenshots**

**Template creation**

<img src="https://raw.githubusercontent.com/chandrika1645/FormBuilder/main/assets/template-creation.png" width="500">

**PDF download**

<img src="https://raw.githubusercontent.com/chandrika1645/FormBuilder/main/assets/pdf-download.png" width="500">

---

## 🛠️ **Features**

### **Template Creation**
- Drag-and-drop UI components to design templates.
- Uses TinyMCE for text editing and react-grid-layout for drag-and-drop functionality.
- Saves HTML structure using React DOM manipulation.

### **Data Injection**
- Load and insert JSON data into the created template.
- Dynamic placeholders for auto-population.
- Declares a variable `textReplace` in memory instead of using a JSON file from a database. However, in real-world applications, a database can be used for storage and retrieval.

### **PDF Generation**
- Uses Puppeteer to generate high-quality PDFs from templates.
- Ensures pixel-perfect document output.
- Solves **page-break** and **table-break** issues when table size changes.

### **Backend Processing**
- The backend generates PDFs using Puppeteer and sends them in **blob format**.
- The system can be modified to **store PDFs on a cloud platform** and share the link for download instead of directly sending a large file.

### **User-Friendly Experience**
- Responsive and easy-to-use interface.

---

## 🔄 **How It Works**

1. **Design the Template**: Use the drag-and-drop interface to create a structured template.
2. **Inject Data**: Upload a JSON file or enter structured data to replace placeholders.
3. **Generate PDF**: The system replaces placeholders with JSON values and downloads the formatted PDF.

---

## ⚙️ **Setup**

### **Prerequisites**
- Node.js
- NPM or Yarn

### **Steps to Run**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/report-builder.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd client  
   npm install  
   npm start  

   cd ../server  
   npm install  
   npm start  
   ```
   The application will now be available at `http://localhost:3000`.
   The server will run at `http://localhost:2050`.

---

## 🧑‍💻 **Technologies Used**

- **React.js** - Frontend framework for UI development.
- **React DOM Manipulation** - Saves and manages HTML template structures.
- **Puppeteer** - Generates PDFs from the created templates.
- **JavaScript** - Core logic and dynamic rendering.
- **express.js (Backend)** - Handles PDF generation and file processing.

---

**Report Builder** is a simple yet powerful tool that streamlines document generation for businesses. Try it today and simplify your reporting workflow! 🚀
