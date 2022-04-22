import React, { useState } from 'react';

import CartProvider from './store/CartProvider';
import Header from './components/Layout/Header';
import Cart from './components/Cart/Cart';
import Meals from './components/Meals/Meals';

function App() {
  const [openCart, setOpenCart] = useState(false);

  const openCartHandler = () => {
    setOpenCart(!openCart);
  };

  return (
    <CartProvider>
      {openCart && <Cart openCartHandler={openCartHandler} />}
      <Header openCartHandler={openCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
