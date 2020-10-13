import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./discription.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Discription = () => {
  const { idParam } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products/").then(function (response) {
      setProduct(response.data.find((product) => product._id === idParam));
      console.log(product);
    });
  }, []);
  return (
    <div className="disc_body">
      {" "}
      <h2 className="disc_title">{product.title}</h2>
      <div>
        {" "}
        <img className="disc_img" src={product.image} alt="" />
      </div>
      <div className="discription">
        <div className="disc_text">{product.discription}</div>
      </div>
      <Link to={"/"}>
        <button>חזור לדף הבית</button>
      </Link>
    </div>
  );
};

export default Discription;
