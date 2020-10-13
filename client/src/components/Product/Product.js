import React, { useState } from "react";
import "./product.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import createPersistedState from "use-persisted-state";

const useCounterState = createPersistedState("quantity");

const Product = (props) => {
  let [quantity, setQuantity] = useState(props.quantity);
  let [p, setp] = useState(false);

  const AddToCart = () => {
    setp(true);
    quantity
      ? setQuantity(quantity - 1)
      : setQuantity((quantity = "Out of stock"));
  };
  const AddtoCount = () => {
    if (quantity && quantity !== "Out of stock") {
      props.updateCart(props._id);
    }
  };

  // const RemoveFromCount = (_id) => {
  //   if (quantity === props.quantity - 1) {
  //     props.removeCart(_id);
  //   }

  const Decrease = () => {
    console.log(props.quantity);
    if (p && props.quantity > 0) {
      setQuantity(quantity + 1);

      props.removeCount(props._id);
    }
    if (props.quantity === 0 && !props.quantity < 0) {
      props.removeCart(props._id);
    }
  };

  return (
    <div className="product">
      <Link to={"/discription/" + props._id}>
        <div>
          <img src={props.src} alt="" />
        </div>
      </Link>
      <h2>{props.title}</h2>
      <div>price:{props.price} ILS</div>
      <div>Quantity:{quantity}</div>
      <div>
        <button
          onClick={() => {
            AddToCart();
            AddtoCount();
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            // RemoveFromCount();
            Decrease();
          }}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default Product;
