const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const FILE_PATH = 'form-data.json';


app.use(bodyParser.json());


app.post('/form', (req, res) => {
    const formData = req.body;

    if (!formData || !formData.fields) {
        return res.status(400).json({ error: 'Invalid form data' });
    }

    fs.writeFile(FILE_PATH, JSON.stringify(formData, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).json({ error: 'Failed to save form data' });
        }
        res.status(201).json({ message: 'Form data saved successfully' });
    });
});


app.get('/form', (req, res) => {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Failed to retrieve form data' });
        }
        res.status(200).json(JSON.parse(data));
    });
});


app.listen(PORT, () => {
    console.log(server is running on : http://localhost:${PORT});
});