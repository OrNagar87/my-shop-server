import React from "react";
import "./cart.css";

import OnCart from "./OnCart";

const Cart = (props) => {
  return (
    <div className="cart">
      <div>
        Cart Count:
        {props.counter}
      </div>
      <div>{/* {props.price} */}</div>
      <div className="onCart">
        {props.productOnCart.map((product) => (
          <OnCart
            title={product.title}
            src={product.image}
            price={product.price}
            key={product._id}
            quantity={product.quantity}
            onRemove={() => {
              props.removeCart(product._id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Cart;
