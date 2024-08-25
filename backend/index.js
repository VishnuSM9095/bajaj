const express = require('express');
const app = express();

app.use(express.json());

app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            user_id: "vishnu9095",
            email: "suganthivisnu666@gmail.com",
            roll_number: "21BRS1379",
            message: 'Invalid input'
        });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowerCase = null;

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/[a-zA-Z]/.test(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase() && (!highestLowerCase || item > highestLowerCase)) {
                highestLowerCase = item;
            }
        }
    });

    res.json({
        is_success: true,
        user_id: "vishnu", 
        email: "suganthivisnu666@gmail.com",         
        roll_number: "21BRS1379",       
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowerCase ? [highestLowerCase] : []
    });
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
