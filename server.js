// Import required modules
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const Contact = require('./models/Contact');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Serve static files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public', 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public', 'contact.html')));
app.get('/services', (req, res) => res.sendFile(path.join(__dirname, 'public', 'services.html')));

// Contact form submission route
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        // Save to MongoDB
        const contact = new Contact({
            name,
            email,
            phone,
            service,
            message
        });
        await contact.save();

        res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

