const express = require('express');
const path = require('path');
const app = express();

const CONTACTS = [
    {id: 1, name: 'Alex', value: '+37445704755', marked: false},
]

app.get('/api/contacts', (req, res) => {
    res.status(200).json(CONTACTS);
});

//Эти запросы должны обрабатываться в конце

app.use(express.static(path.resolve(__dirname, 'client'))) // делаем папку статической
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3001, () => console.log('Server has been started on port 3000...'));