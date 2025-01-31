const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;

// Middleware to parse  form data
app.use(express.urlencoded({ extended: true }));

// Set up session
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true
}));

// Serve static files (in the public folder, like the css and image resources )
app.use(express.static(path.join(__dirname, 'public')));



// Setting up the view engine for express- which will allow me to serve  my html files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile); //using EJS as the cart needs to be dynamic to update and remove items

//tell the server to automatically redirect to the bookstore even when at the root
app.get('/', (req, res) => {
    res.redirect('/bookstore');
});

// serving the bookstore page route and rendering
app.get('/bookstore', (req, res) => {
    res.render('bookstore');
});

//handling the POST coming from the  'add-to-cart' button on the bookstore page
app.post('/add-to-cart', (req, res) => {
    const { title, price, quantity } = req.body; //extracting the informatiom from request body
    const qty = parseInt(quantity); 

    //checking if a cart exists in the system. if a cart doesnt exist, create an empty one
    if (!req.session.cart) {
        req.session.cart = {};
    }

    //check if the title is already in the cart, if it is- increase the quantity
    if (req.session.cart[title]) {
        req.session.cart[title].quantity += qty;
    } else { //if its not, add a new entry and store price and quantity 
        req.session.cart[title] = { price: parseFloat(price), quantity: qty };
    }
    res.redirect('/bookstore'); //refresh page
});

// Serve the cart page (cart.html) rendering and routing
app.get('/cart.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cart.html'));
});

// Handling fetching cart data - to populate the cart page
app.get('/cart-data', (req, res) => {
    const cart = req.session.cart || {};
    const warning = req.session.warning || null; // Get warning message from session
    req.session.warning = null; // Clear the warning after retrieving it
    console.log("warning : "+warning);
    res.json({ cart, warning });
});

// Handling updating and removing items from the cart
app.post('/update-cart', (req, res) => {
    const { title, action, quantity } = req.body;
    console.log(`Action: ${action}, Title: ${title}, Quantity: ${quantity}`); // Log incoming values


    if (!req.session.cart) {
        req.session.cart = {};
    }

    if (action === 'update') {
        const newQuantity = parseInt(quantity);
        console.log(`New Quantity: ${newQuantity}`); // Log new quantity

        if (newQuantity > 0) {
            req.session.cart[title].quantity = newQuantity;
            req.session.warning = null; // Clear warning when item is removed
        } else {
         req.session.warning = 'Please select a number over 0. Item not updated.';
         console.log(req.session.warning); // Log the warning message
        }
    } else if (action === 'remove') {
        delete req.session.cart[title];
        req.session.warning = null; // Clear warning when item is removed
    }

    res.redirect('/cart.html');
});

// Route for the checkout page
app.post('/checkout', (req, res) => {
    // Clear the cart after checkout
    req.session.cart = {};
    res.send('Checkout complete. Thank you for your purchase!');
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});