import React from "react";

const OnCart = (props) => {
  const RemoveFromCart = () => {
    props.onRemove();
  };

  return (
    <div className="cart_product">
      <div>
        <h2>{props.title}</h2>
        <div className="first_cart">
          <img src={props.src} alt="" />
        </div>

        <button
          className="button_remove"
          onClick={() => {
            RemoveFromCart();
          }}
        >
          remove from cart
        </button>
      </div>
      <div className="second_cart">
        <div>price:{props.price}</div>
        <div>quantity:{props.quantity}</div>
      </div>
    </div>
  );
};

export default OnCart;
