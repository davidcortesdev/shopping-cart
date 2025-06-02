import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import styles from "../styles/Home.module.css";

const productData = {
  id: 1,
  name: "Camiseta Moderna",
  description: "Camiseta de algodón 100% orgánico, disponible en varios colores. Diseño minimalista con corte moderno y materiales sostenibles.",
  price: 25,
  colors: [
    { name: "Rosa", value: "pink", image: "/pink-hoodie.png" },
    { name: "Roja", value: "red", image: "/red-hoodie.png" },
    { name: "Beige", value: "beige", image: "/white-hoodie.png" },
  ],
};

export default function Home() {
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [showCart, setShowCart] = useState(false);
  const [cartAnim, setCartAnim] = useState(false);
  const { addToCart, cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const { theme, toggleTheme } = useTheme();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAdd = () => {
    addToCart({
      id: productData.id,
      name: productData.name,
      description: productData.description,
      price: productData.price,
      color: selectedColor.value,
      image: selectedColor.image,
    });
    setCartAnim(true);
    setTimeout(() => setCartAnim(false), 600);
  };

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  return (
    <div className={styles.pageContainer}>
      {/* Theme Toggle Button */}
      <button
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
      >
        <span className={styles.themeToggleIcon}>
          {theme === 'light' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          )}
        </span>
      </button>

      {/* Header/Navbar */}
      <header className={styles.header}>
        <div className={styles.logo}>STORE</div>
        <nav className={styles.nav}>
          <button className={styles.navItem}>Nuevo</button>
          <button className={styles.navItem}>Colección</button>
          <button className={styles.navItem}>Sobre Nosotros</button>
        </nav>
        <button
          className={`${styles.cartButton} ${cartAnim ? styles.cartButtonAnim : ""}`}
          onClick={handleShowCart}
        >
          <svg className={styles.cartIcon} viewBox="0 0 24 24" fill="none">
            <path d="M7 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7.2 18h9.45c.9 0 1.7-.6 1.9-1.5l2.13-7.45A1 1 0 0 0 20.63 8H6.21l-.94-4H2v2h2l3.6 14h12v-2H7.2z" fill="currentColor"/>
          </svg>
          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </button>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Left Section - Product Image */}
        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <img 
              className={styles.productImage} 
              src={selectedColor.image} 
              alt={selectedColor.name}
            />
          </div>
          <div className={styles.colorSelector}>
            {productData.colors.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color)}
                className={`${styles.colorButton} ${selectedColor.value === color.value ? styles.colorButtonActive : ""}`}
                aria-label={`Seleccionar color ${color.name}`}
              >
                <span className={styles.colorName}>{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Section - Product Info */}
        <div className={styles.infoSection}>
          <div className={styles.productInfo}>
            <h1 className={styles.productTitle}>{productData.name}</h1>
            <div className={styles.productPrice}>${productData.price}</div>
            <p className={styles.productDescription}>{productData.description}</p>
            
            <div className={styles.productActions}>
              <button className={styles.addToCartButton} onClick={handleAdd}>
                Añadir al Carrito
              </button>
              <button className={styles.wishlistButton}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            <div className={styles.productDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Material</span>
                <span className={styles.detailValue}>Algodón 100% Orgánico</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Cuidado</span>
                <span className={styles.detailValue}>Lavar a máquina 30°</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Envío</span>
                <span className={styles.detailValue}>Entrega en 2-3 días</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Cart Panel */}
      {showCart && (
        <div className={styles.cartOverlay} onClick={handleCloseCart}>
          <div className={styles.cartPanel} onClick={e => e.stopPropagation()}>
            <div className={styles.cartHeader}>
              <h2 className={styles.cartTitle}>Tu Carrito</h2>
              <button className={styles.closeCartButton} onClick={handleCloseCart}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {cart.length === 0 ? (
              <div className={styles.emptyCart}>
                <svg className={styles.emptyCartIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <p>Tu carrito está vacío</p>
                <button className={styles.continueShoppingButton} onClick={handleCloseCart}>
                  Continuar Comprando
                </button>
              </div>
            ) : (
              <>
                <div className={styles.cartItems}>
                  {cart.map((item, idx) => (
                    <div key={idx} className={styles.cartItem}>
                      <div className={styles.cartItemImage}>
                        <img src={item.image} alt={item.color} />
                      </div>
                      <div className={styles.cartItemInfo}>
                        <h3 className={styles.cartItemName}>{item.name}</h3>
                        <p className={styles.cartItemColor}>Color: {item.color}</p>
                        <div className={styles.cartItemQuantity}>
                          <button
                            className={styles.quantityButton}
                            onClick={() => decreaseQuantity(item.id, item.color)}
                            disabled={item.quantity <= 1}
                          >−</button>
                          <span>{item.quantity}</span>
                          <button
                            className={styles.quantityButton}
                            onClick={() => increaseQuantity(item.id, item.color)}
                          >+</button>
                        </div>
                      </div>
                      <div className={styles.cartItemPrice}>
                        ${item.price * item.quantity}
                      </div>
                      <button
                        className={styles.removeItemButton}
                        onClick={() => removeFromCart(item.id, item.color)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className={styles.cartFooter}>
                  <div className={styles.cartTotal}>
                    <span>Total</span>
                    <span>${cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)}</span>
                  </div>
                  <button className={styles.checkoutButton}>
                    Proceder al Pago
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}