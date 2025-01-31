

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

/**
 * Servlet implementation class CartServlet
 */
@WebServlet("/CartServlet")
public class CartServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CartServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 response.setContentType("text/html");
		    
		    PrintWriter out = response.getWriter();

		    HttpSession session = request.getSession();
	        Map<String, Integer> cart = (Map<String, Integer>) session.getAttribute("cart");
	        if (cart == null) {
	            cart = new HashMap<>();
	        }
	        
	        String warningMessage = (String) session.getAttribute("warningMessage");
	        
	        
			
		    out.println("<!DOCTYPE html>");
		    out.println("<html>");
		    out.println("<body>");
			out.println("<head>");
		    out.println("<title>SOEN387 Book Store Shopping cart</title>");
		    
		    //adding some styling for the table
		    out.println("<style>");
		    out.println(
		    		"body { font-family: Arial, sans-serif; }"
		            + "h1, h2 { text-align: center; }"
		            + "table { width: 100%; margin: 20px 0; border-collapse: collapse; }" 
		            + "th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }" 
		            + "th { background-color: #f2f2f2; }" 
		            + ".center-block { width: 60%; margin: 0 auto; }"
		            + ".button-container { text-align: center; margin-top: 20px; }"
		            +  ".button-container a, .button-container button { display: block; margin: 10px auto; }" 
		            + ".warning { color: red; }" 
		            );
		    out.println("</style>");
		    out.println("</head>");
		    
		    out.println("<h1>Your Shopping Cart</h1>");
		  
		    out.println("<div class='center-block'>");
		 // Display warning message if it exists, above the table
		 			if (warningMessage != null) {
		 				out.println("<div class='warning'>" + warningMessage + "</div>");
		 				// Remove the warning message from session after displaying it
		 				session.removeAttribute("warningMessage");
		 			}
			
		    //creating a table
		    out.println("<table>");
		    out.println("<tr>");
		    out.println("<th>Type</th>");
		    out.println("<th>Price</th>");
		    out.println("<th>Quantity</th>");
		    out.println("<th>Total</th>");
		    out.println("<th>Action</th>");
		    out.println("</tr>");
		    
		    
		    for (String title : cart.keySet()) {
	            int quantity = cart.get(title);
	            String price = getPrice(title); 
	            double total = quantity * Double.parseDouble(price);
	           
	            out.println("<tr>");
	            out.println("<td>" + title + "</td>");
	            out.println("<td>$" + price + "</td>");
	            out.println("<td>");
	            out.println("<form method='POST' action='CartServlet'>");
	            out.println("<input type='number' name='quantity' value='" + quantity + "' min='0' required>");
	            out.println("<input type='hidden' name='title' value='" + title + "'>");
	            out.println("<button type='submit' name='action' value='update'>Update</button>");
	            out.println("</form>");
	            out.println("</td>");
	            out.println("<td>$" + total + "</td>");
	            out.println("<td>");
	            out.println("<form method='POST' action='CartServlet'>");
	            out.println("<input type='hidden' name='title' value='" + title + "'>");
	            out.println("<button type='submit' name='action' value='remove'>Remove</button>");
	            out.println("</form>");
	            out.println("</td>");
	            out.println("</tr>");            
	        }
		    
		    out.println("</table>");
	        
		    out.println("</div>");
		    
		    out.println("<div class='button-container'>");
		    out.println("<a href='BookStoreServlet'>"
		    		+ "Continue Shopping"
		    		+ "</a>");

		    out.println("<form method='POST' action='CheckoutServlet'>");
		    out.println("<button type='submit'>Checkout</button>");
		    out.println("</form>");
		    
		    out.println("</div>");
		    
		    out.println("</body>");
		    out.println("</html>");
}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		 HttpSession session = request.getSession();
	        Map<String, Integer> cart = (Map<String, Integer>) session.getAttribute("cart");
	        if (cart == null) {
	            cart = new HashMap<>();
	        }

	        String title = request.getParameter("title");
	        String action = request.getParameter("action");

	        if ("update".equals(action)) {
	            int newQuantity = Integer.parseInt(request.getParameter("quantity"));
	            if (newQuantity <= 0) {
	                session.setAttribute("warningMessage", "Warning: Quantity cannot be zero or less. Item remains in the cart.");
	             } else {
	                cart.put(title, newQuantity);
	            }
	        } else if ("remove".equals(action)) {
	            // Remove the item from the cart
	            cart.remove(title);
	        }

	        // Store the updated cart back in the session
	        session.setAttribute("cart", cart);
	        // Redirect back to the cart page to see changes
	        response.sendRedirect("CartServlet");
		
		
	}
	
	
	 private String getPrice(String title) {   
	        switch (title) {
	            case "Design Patterns: Elements of Reusable Object-Oriented Software":
	                return "59.99";
	            case "Patterns of Enterprise Application Architecture":
	                return "47.99";
	            case "Node.js Design Patterns":
	                return "39.99";
	            default:
	                return "0.00"; 
	        }
	    }

}
