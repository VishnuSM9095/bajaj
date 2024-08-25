const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// POST endpoint to process input data
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            message: 'Invalid input'
        });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowerCase = null;

    data.forEach(item => {
        const parsedNumber = parseFloat(item);
        if (!isNaN(parsedNumber)) {
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase() && (!highestLowerCase || item > highestLowerCase)) {
                highestLowerCase = item;
            }
        }
    });

    res.json({
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowerCase ? [highestLowerCase] : []
    });
});

// GET endpoint to return a static response
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
