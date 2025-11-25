import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

// Helper function to check if user is logged in
export const isUserLoggedIn = () => {
  const user = localStorage.getItem("user");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return !!(user && isLoggedIn === "true");
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart (requires login)
  const addToCart = (food, quantity = 1, onRequireLogin) => {
    // Check if user is logged in
    if (!isUserLoggedIn()) {
      if (onRequireLogin) {
        onRequireLogin();
      } else {
        // Default: redirect to login
        if (window.confirm("Bạn cần đăng nhập để thêm món vào giỏ hàng. Bạn có muốn đăng nhập ngay?")) {
          window.location.href = "/login";
        }
      }
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === food.id);

      if (existingItem) {
        // If item exists, update quantity
        return prevItems.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // If item doesn't exist, add new item
        return [...prevItems, { ...food, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Update item quantity
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isCartOpen,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    setIsSearchOpen,
    isUserLoggedIn,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

