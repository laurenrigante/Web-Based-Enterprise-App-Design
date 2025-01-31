<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Checkout</title>
    
    <style>
        body { font-family: Arial, sans-serif; }
        h1, h2 { text-align: center; }
    </style>
</head>
<body>

<%
    // If you want to clear the session/cart after the checkout
 	session = request.getSession();
    session.removeAttribute("cart");
%>

<h1>Checkout Complete</h1>
<h2>Thank you for your purchase!</h2>

</body>
</html>
