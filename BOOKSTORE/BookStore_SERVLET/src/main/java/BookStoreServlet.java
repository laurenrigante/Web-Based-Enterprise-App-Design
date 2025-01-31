

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
 * Servlet implementation class BookStoreServlet
 */
@WebServlet("/BookStoreServlet")
public class BookStoreServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public BookStoreServlet() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		response.setContentType("text/html");

		//getting printwriter to write response
		PrintWriter out=response.getWriter();


		//generating the HTML response
		out.println("<!DOCTYPE html>");
		out.println("<html>");
		out.println("<head>");

		//adding styling as provided
		out.println("<style>");
		out.println(
				"body { font-family: Arial, sans-serif; }"
						+ "h1, h2 { text-align: center; }"
						+ ".book-list { width: 60%; margin: 0 auto; list-style: none; padding: 0; }"
						+ ".book-item { border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; }"
						+ ".book-title { font-size: 1.2em; margin-bottom: 5px; }"
						+ ".book-price { color: #007BFF; font-weight: bold; }"
						+ ".cart-icon { float: right; font-size: 1.2em; }"
						+ ".cart-icon img { width: 24px; vertical-align: middle; }"
						+ ".center-block { width: 60%; margin: 0 auto; }"
				);
		out.println("</style>");
		out.println("</head>");

		out.println("<body>");
		out.println("<h1>Welcome to SOEN387 Book Store </h1>");


		out.println("<h2>Available Books</h2>");


		out.println("<div class='cart-icon'>"
				+ "<a href= 'CartServlet'>"
				+ "<img src='images/shoppingcart.png'>"
				+ "Items in Cart:"
				+ "</a></div>");


		//books in a list format
		out.println("<ul class='book-list'>");


		//book 1 ----------------------------------------------------------------------------------
		out.println("<li class='book-item'>");
		out.println("<span class='book-title' name='title'>Design Patterns: Elements of Reusable Object-Oriented Software</span> - ");
		out.println("<span class='book-price' name='price'>$59.99</span>");

		//form
		out.println("<form method='POST' action='BookStoreServlet'>");
		//hidden inputs for the title and price to be submitted with form
		out.println("<input type='hidden' name='title' value='Design Patterns: Elements of Reusable Object-Oriented Software'>");
		out.println("<input type='hidden' name='price' value='59.99'>");

		out.println("<div>Quantity: <input type='number' name='quantity' value='1' min='1' > "
				+ "<button type='submit'>Add to Cart</button></div>");
		out.println("</form>");
		out.println("</li>");

		//book 2----------------------------------------------------------------------------------
		out.println("<li class='book-item'>");
		out.println("<span class='book-title'>Patterns of Enterprise Application Architecture</span> - ");
		out.println("<span class='book-price'>$47.99</span>");
		//form
		out.println("<form method='POST' action='BookStoreServlet'>");
		//hidden inputs for the title and price to be submitted with form
		out.println("<input type='hidden' name='title' value='Patterns of Enterprise Application Architecture'>");
		out.println("<input type='hidden' name='price' value='47.99'>");

		out.println("<div>Quantity: <input type='number' name='quantity' value='1' min='1'>"
				+ " <button type='submit'>Add to Cart</button></div>");
		out.println("</form>");
		out.println("</li>");

		//book 3----------------------------------------------------------------------------------
		out.println("<li class='book-item'>");
		out.println("<span class='book-title'>Node.js Design Patterns</span> - ");
		out.println("<span class='book-price'>$39.99</span>");
		//form
		out.println("<form method='POST' action='BookStoreServlet'>");
		//hidden inputs for the title and price to be submitted with form
		out.println("<input type='hidden' name='title' value='Node.js Design Patterns'>");
		out.println("<input type='hidden' name='price' value='39.99'>");

		out.println("<div>Quantity: <input type='number' name='quantity' value='1' min='1'>"
				+ " <button type='submit'>Add to Cart</button></div>");
		out.println("</form>");
		out.println("</li>");

		out.println("</ul>");

		out.println("</body>");

		out.println("</html>");
	}



	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		HttpSession session=request.getSession();

		// Retrieve the cart from the session, or create a new one if it doesn't exist
		Map<String, Integer> cart = (Map<String, Integer>) session.getAttribute("cart");
		if (cart == null) {
			cart = new HashMap<>();
		}

		//grabbing book details from the form (title, price, quantity)
		String title= request.getParameter("title");
		int quantity = Integer.parseInt(request.getParameter("quantity"));
		
		 
		// updating/ adding to cart when the add to cart btn is clicked
		if(cart.containsKey(title)) {
			//if the title is already in the cart, add to the  existing quantity
			cart.put(title, cart.get(title)+quantity);
		}else {
			//if the title is not already in the cart, add it and the quantity
			cart.put(title, quantity);
		}

		session.setAttribute("cart", cart);
		response.sendRedirect("BookStoreServlet"); 

	}




}
