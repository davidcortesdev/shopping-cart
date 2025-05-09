import React, { createContext, useContext, useState, ReactNode } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  color: string;
  image: string;
};

type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number, color: string) => void;
  increaseQuantity: (id: number, color: string) => void;
  decreaseQuantity: (id: number, color: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id && item.color === product.color);
      if (found) {
        return prev.map((item) =>
          item.id === product.id && item.color === product.color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, color: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.color === color)));
  };

  const increaseQuantity = (id: number, color: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.color === color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id: number, color: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.color === color && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};