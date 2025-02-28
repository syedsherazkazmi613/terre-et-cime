// Import required modules
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// Connect Database
connectDB();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes for different pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public', 'about.html')));
app.get('/projects', (req, res) => res.sendFile(path.join(__dirname, 'public', 'projects.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public', 'contact.html')));
app.get('/terms', (req, res) => res.sendFile(path.join(__dirname, 'public', 'terms.html')));
app.get('/services', (req, res) => res.sendFile(path.join(__dirname, 'public', 'services.html')));


// Contact form submission route
app.post('/contact', async (req, res) => {
    const { name, surname, phone, email, service, message } = req.body;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    let mailOptions = {
        from: email,
        to: 'contact@terre-et-cime.com',
        subject: `New Contact Request from ${name} ${surname}`,
        text: `Name: ${name}\nSurname: ${surname}\nPhone: ${phone}\nEmail: ${email}\nRequested Service: ${service}\nMessage: ${message}`
    };
    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Your request has been successfully sent." });
    } catch (error) {
        res.json({ success: false, message: "Error sending the message." });
    }
});

// Define Routes
app.use('/api/contact', require('./routes/contact'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

