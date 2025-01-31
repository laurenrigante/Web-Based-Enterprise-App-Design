<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import="java.util.*" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Book Store</title>
<style>
 body { font-family: Arial, sans-serif; }
        h1, h2 { text-align: center; }
        .book-list { width: 60%; margin: 0 auto; list-style: none; padding: 0; }
        .book-item { border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; }
        .book-title { font-size: 1.2em; margin-bottom: 5px; }
        .book-price { color: #007BFF; font-weight: bold; }
        .cart-icon { float: right; font-size: 1.2em; }
        .cart-icon img { width: 24px; vertical-align: middle; }
        .center-block { width: 60%; margin: 0 auto; }
</style>
</head>
<body>

<!-- Code equivalent to the doget  -->
<h1>Welcome to SOEN387 Book Store</h1>
    <h2>Available Books</h2>

    <div class='cart-icon'>
        <a href="cart.jsp">
            <img src='images/shoppingcart.png'>
            Items in Cart: 
        </a>
    </div>

<ul class='book-list'>

        <!-- Book 1 -->
        <li class='book-item'>
            <span class='book-title'>Design Patterns: Elements of Reusable Object-Oriented Software</span> - 
            <span class='book-price'>$59.99</span>
            <form method='POST' action='bookstore.jsp'>
                <input type='hidden' name='title' value='Design Patterns: Elements of Reusable Object-Oriented Software'>
                <input type='hidden' name='price' value='59.99'>
                Quantity: <input type='number' name='quantity' value='1' min='1'>
                <button type='submit'>Add to Cart</button>
            </form>
        </li>
        
        <!-- Book 2 -->
        <li class='book-item'>
            <span class='book-title'>Patterns of Enterprise Application Architecture</span> - 
            <span class='book-price'>$47.99</span>
            <form method='POST' action='bookstore.jsp'>
                <input type='hidden' name='title' value='Patterns of Enterprise Application Architecture'>
                <input type='hidden' name='price' value='47.99'>
                Quantity: <input type='number' name='quantity' value='1' min='1'>
                <button type='submit'>Add to Cart</button>
            </form>
        </li>
        
        <!-- Book 3 -->
        <li class='book-item'>
            <span class='book-title'>Node.js Design Patterns</span> - 
            <span class='book-price'>$39.99</span>
            <form method='POST' action='bookstore.jsp'>
                <input type='hidden' name='title' value='Node.js Design Patterns'>
                <input type='hidden' name='price' value='39.99'>
                Quantity: <input type='number' name='quantity' value='1' min='1'>
                <button type='submit'>Add to Cart</button>
            </form>
        </li>
        
    </ul>
    
    <!-- Code equivalent to the doPost -->

 <%
        // Handling form submission 
        if (request.getMethod().equalsIgnoreCase("POST")) {
            String title = request.getParameter("title");
            int quantity = Integer.parseInt(request.getParameter("quantity"));

            // Retrieve the cart from the session or create a new one if it doesn't exist
            session = request.getSession();
            Map<String, Integer> cart = (Map<String, Integer>) session.getAttribute("cart");
            if (cart == null) {
                cart = new HashMap<>();
            }

            // Add or update the cart
            if (cart.containsKey(title)) {
                cart.put(title, cart.get(title) + quantity);
            } else {
                cart.put(title, quantity);
            }

            // Save the cart back to the session
            session.setAttribute("cart", cart);

            // Redirect to avoid duplicate form submission
            response.sendRedirect("bookstore.jsp");
        }
    %>
    
    
</body>
</html>