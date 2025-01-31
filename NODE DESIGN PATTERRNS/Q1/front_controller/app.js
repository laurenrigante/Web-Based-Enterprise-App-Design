const express = require('express');
const path = require('path');
const FrontController = require('./frontController/frontController'); // Adjust the path as necessary

const app = express();
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Specify the views directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Route for the root URL to redirect to the album artist query page
app.get('/', (req, res) => {
    res.redirect('/albumArtistQuery.html'); // Redirect to the query page
});

app.get('/front', (req, res) => {
    const frontController = new FrontController(req, res);
    frontController.processRequest();
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
