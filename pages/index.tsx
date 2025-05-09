import { useState } from "react";
import { useCart } from "../context/CartContext";
import styles from "../styles/Home.module.css";

const productData = {
  id: 1,
  name: "Camiseta Moderna",
  description: "Camiseta de algodón 100% orgánico, disponible en varios colores.",
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
    <div className={styles.bgMinimal}>
      <div className={styles.minimalGrid}>
        <div className={styles.cartIconBox}>
          <button
            className={`${styles.cartIconLink} ${cartAnim ? styles.cartIconAnim : ""}`}
            onClick={handleShowCart}
          >
            <svg className={styles.cartIcon} width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M7 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7.2 18h9.45c.9 0 1.7-.6 1.9-1.5l2.13-7.45A1 1 0 0 0 20.63 8H6.21l-.94-4H2v2h2l3.6 14h12v-2H7.2z" fill="currentColor"/>
            </svg>
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </button>
        </div>
        <div className={styles.minimalImageSection}>
          <img className={styles.minimalProductImage} src={selectedColor.image} alt={selectedColor.name} />
        </div>
        <div className={styles.minimalInfoSection}>
          <h1 className={styles.minimalTitle}>{productData.name}</h1>
          <div className={styles.minimalPrice}>${productData.price}</div>
          <p className={styles.minimalDescription}>{productData.description}</p>
          <div className={styles.minimalColorsLabel}>Colores:</div>
          <div className={styles.minimalColors}>
            {productData.colors.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color)}
                className={`${styles.minimalColorBtn} ${selectedColor.value === color.value ? styles.minimalSelected : ""}`}
                aria-label={`Seleccionar color ${color.name}`}
              >
                {color.name}
              </button>
            ))}
          </div>
          <button className={styles.minimalAddBtn} onClick={handleAdd}>
            Agregar al carrito
          </button>
        </div>
      </div>
      {showCart && (
        <div className={styles.cartPanelOverlay} onClick={handleCloseCart}>
          <div className={styles.cartPanel} onClick={e => e.stopPropagation()}>
            <button className={styles.closeCartBtn} onClick={handleCloseCart} aria-label="Cerrar carrito">&times;</button>
            <h2 className={styles.cartPanelTitle}>Carrito</h2>
            {cart.length === 0 ? (
              <p className={styles.cartPanelEmpty}>El carrito está vacío.</p>
            ) : (
              <ul className={styles.cartPanelList}>
                {cart.map((item, idx) => (
                  <li key={idx} className={styles.cartPanelItem}>
                    <img src={item.image} alt={item.color} className={styles.cartPanelImg} />
                    <div style={{ flex: 1 }}>
                      <div className={styles.cartPanelItemName}>{item.name} ({item.color})</div>
                      <div className={styles.cartPanelItemQtyRow}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => decreaseQuantity(item.id, item.color)}
                          aria-label="Disminuir cantidad"
                          disabled={item.quantity <= 1}
                        >−</button>
                        <span className={styles.cartPanelItemQty}>{item.quantity}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => increaseQuantity(item.id, item.color)}
                          aria-label="Aumentar cantidad"
                        >+</button>
                      </div>
                      <div className={styles.cartPanelItemPrice}>${item.price * item.quantity}</div>
                    </div>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.id, item.color)}
                      aria-label="Eliminar del carrito"
                    >
                      {/* Icono de cruz minimalista y elegante */}
                      <svg className={styles.removeIcon} width="28" height="28" viewBox="0 0 24 24" stroke="#232323" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="6" y1="6" x2="18" y2="18" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button className={styles.cartPanelBuyBtn} disabled={cart.length === 0}>
              Comprar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}