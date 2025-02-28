const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Contact = require('../models/Contact');

// Validation middleware
const validateContact = [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Please include a valid email'),
    check('phone').notEmpty().withMessage('Phone number is required'),
    check('service').notEmpty().withMessage('Service is required'),
    check('message').notEmpty().withMessage('Message is required')
];

// POST /api/contact
router.post('/', validateContact, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, service, message } = req.body;

        // Create new contact
        const contact = new Contact({
            name,
            email,
            phone,
            service,
            message
        });

        // Save to database
        await contact.save();
        res.json({ msg: 'Contact form submitted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router; 