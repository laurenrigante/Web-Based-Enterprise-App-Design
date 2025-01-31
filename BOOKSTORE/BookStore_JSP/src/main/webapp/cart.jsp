<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>


<!DOCTYPE html>
<html>
<head>
    <title>SOEN387 Book Store - Shopping Cart</title>
    <style>
        body { font-family: Arial, sans-serif; }
        h1, h2 { text-align: center; }
        table { width: 60%; margin: 20px auto; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #f2f2f2; }
        .center-block { width: 60%; margin: 0 auto; }
        .button-container { text-align: center; margin-top: 20px; }
       
	    .warning { color: red; text-align: center; }
    </style>
</head>


<body>
    <h1>Your Shopping Cart</h1>

    <%
   	 	//defining a price list for the books
   		 Map<String, Double> priceList = new HashMap<>();
   		 priceList.put("Design Patterns: Elements of Reusable Object-Oriented Software", 59.99);
   		 priceList.put("Patterns of Enterprise Application Architecture", 47.99);
   		 priceList.put("Node.js Design Patterns", 39.99);
    
        // Retrieve cart from the session
        session = request.getSession();
        Map<String, Integer> cart = (Map<String, Integer>) session.getAttribute("cart");

        
     // Display warning message if it exists
        String warningMessage = (String) session.getAttribute("warningMessage");
        if (warningMessage != null) {
            out.println("<div class='warning'>" + warningMessage + "</div>");
            session.removeAttribute("warningMessage"); 
        }
        
        
        if (cart == null || cart.isEmpty()) {
            out.println("<h2>Your cart is empty.</h2>");
        } else {
    %>

    <div class="center-block">
        <table>
            <tr>
                <th>Type</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
            </tr>

            <%
                for (String title : cart.keySet()) {
                    int quantity = cart.get(title);
                    double price = priceList.getOrDefault(title, 0.0);
                    double total = quantity *price;
            %>
            <tr>
                <td><%= title %></td>
                <td>$<%= price %></td>
                <td>
                    <form method="POST" action="cart.jsp">
                        <input type="number" name="quantity" value="<%= quantity %>" min="0" required>
                        <input type="hidden" name="title" value="<%= title %>">
                        <button type="submit" name="action" value="update">Update</button>
                    </form>
                </td>
                <td>$<%= total %></td>
                <td>
                    <form method="POST" action="cart.jsp">
                        <input type="hidden" name="title" value="<%= title %>">
                        <button type="submit" name="action" value="remove">Remove</button>
                    </form>
                </td>
            </tr>
            <% } %>
          
        </table>
    </div>

    <div class="button-container">
        <a href="bookstore.jsp">Continue Shopping</a>
        <form method="POST" action="checkout.jsp" style="display:inline;">
            <button type="submit">Checkout</button>
        </form>
    </div>

    <% } %>

    <%
        // Handle POST requests (update and remove actions)
        if (request.getMethod().equalsIgnoreCase("POST")) {
            String title = request.getParameter("title");
            String action = request.getParameter("action");

            if (cart == null) {
                cart = new HashMap<>();
            }

            if ("update".equals(action)) {
                int newQuantity = Integer.parseInt(request.getParameter("quantity"));
                if (newQuantity > 0) {
                    cart.put(title, newQuantity);
                } else {
                    session.setAttribute("warningMessage", "Warning: Quantity cannot be zero or less. Quantity not updated");
                }
            } else if ("remove".equals(action)) {
                cart.remove(title);
            }

            // Save the updated cart in the session
            session.setAttribute("cart", cart);

            // Redirect to avoid form re-submission
            response.sendRedirect("cart.jsp");
        }
    %>
   

</body>
</html>
