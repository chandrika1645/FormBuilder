# **Report Builder** 📄

**Report Builder** is an intuitive tool that allows users to create templates using drag-and-drop components, inject data from a JSON file, and generate PDFs. Designed to streamline document generation, this solution is ideal for businesses needing to display customer or form details in a structured format.

---

## 📑 **Table of Contents**

- [Overview](#overview)
- [Features](#features)
- [How It Works](#how-it-works)
- [Setup](#setup)
- [Error Handling](#error-handling)
- [Technologies Used](#technologies-used)
- [Demo](#demo)

---

## 🚀 **Overview**

Report Builder provides an efficient way to create, edit, and download reports in a pre-defined format. Users can design templates on the frontend using a drag-and-drop interface, inject structured data from a JSON file, and download the final document as a **PDF**.

This tool also addresses complex challenges such as **page-break issues** and **table-break issues**, ensuring properly formatted and structured PDFs.

---

## 🛠️ **Features**

### **Template Creation**
- Drag-and-drop UI components to design templates.
- Save HTML structure using React DOM manipulation.

### **Data Injection**
- Load and insert JSON data into the created template.
- Dynamic placeholders for auto-population.
- Declares a variable `textReplace` in memory instead of using a JSON file from a database. However, in real-world applications, a database can be used for storage and retrieval.

### **PDF Generation**
- Uses Puppeteer to generate high-quality PDFs from templates.
- Ensures pixel-perfect document output.
- Solves **page-break** and **table-break** issues.

### **Backend Processing**
- The backend generates PDFs using Puppeteer and sends them in **blob format**.
- The system can be modified to **store PDFs on a cloud platform** and share the link for download instead of directly sending the file.

### **User-Friendly Experience**
- Responsive and easy-to-use interface.

---

## 🔄 **How It Works**

1. **Design the Template**: Use the drag-and-drop interface to create a structured template.
2. **Generate PDF**: The system replaces placeholders with JSON values and downloads the formatted PDF.

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
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Start the Application:**
   ```bash
   npm start
   ```
   The application will now be available at `http://localhost:3000`.

---

## ⚠️ **Error Handling**
- Ensures valid JSON data before processing.
- Displays alerts if required fields are missing.
- Provides meaningful error messages for smooth user experience.

---

## 🧑‍💻 **Technologies Used**

- **React.js** - Frontend framework for UI development.
- **React DOM Manipulation** - Saves and manages HTML template structures.
- **Puppeteer** - Generates PDFs from the created templates.
- **JavaScript** - Core logic and dynamic rendering.
- **Node.js (Backend)** - Handles PDF generation and file processing.

---

## 🎬 **Demo**

Stay tuned for a demo video showcasing the tool in action!

---

**Report Builder** is a simple yet powerful tool that streamlines document generation for businesses. Try it today and simplify your reporting workflow! 🚀
