import React, { useState, useEffect } from "react";
import axios from "axios";
import "./update.css";
import Adding from "./Adding";
import Header from "../Header/Header";
import { Table, Space, Drawer, Button, Input } from "antd";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EditProduct from "../EditProduct";
import Product from "../Product/Product";

const { Search } = Input;

export default function Update() {
  const [data, setData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products/").then(function (response) {
      setDataSource(response.data);
    });
  }, []);
  // console.log(dataSource);
  const Editor = (e) => {};

  const columns = [
    {
      title: "שם המוצר",
      dataIndex: "title",
      key: "name",
    },
    {
      title: " התמונה",
      dataIndex: "image",
      key: "img",
      render: (image) => <img src={image} alt="" />,
    },
    {
      title: "מחיר",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "כמות",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "תיאור המוצר",
      dataIndex: "discription",
      key: "discription",
    },
    {
      title: "פעולות",
      key: "action",
      render: (product) => (
        <Space size="middle">
          <button
            onClick={() => {
              showDrawer();
              console.log(product);
              setProduct(product);
            }}
          >
            עריכה
          </button>
          <button
            onClick={async () => {
              if (window.confirm("are you sure you want to delete?")) {
                console.log(product._id);
                await axios
                  .delete("http://127.0.0.1:8000/products/" + product._id)

                  .then((res) => {
                    console.log("POST DATA", res);
                    axios
                      .get("http://127.0.0.1:8000/products/")
                      .then(function (response) {
                        setData(response.data);
                        alert("המוצר נמחק");
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }}
          >
            מחיקה
          </button>
        </Space>
      ),
    },
  ];

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="body">
      <Header />
      <div>
        <Link to={"/"}>
          <button>חזור לדף הבית</button>
        </Link>
      </div>{" "}
      <div className="search_table">
        <Search
          className="search_table"
          placeholder="חפש מוצר"
          enterButton="חיפוש מוצר"
          size="large"
          maxLength="10"
          onSearch={(value) => {
            axios
              .get("http://127.0.0.1:8000/products/?search=" + value)
              .then(function (response) {
                setDataSource(response.data);
              });
          }}
        />
      </div>
      <Table
        bordered={true}
        dataSource={dataSource}
        columns={columns}
        size="small"
        scroll={{ y: 500 }}
        sticky
      />{" "}
      <Drawer
        title="ערוך את המוצר"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={500}
      >
        <EditProduct
          title={product.title}
          image={product.image}
          price={product.price}
          _id={product._id}
          discription={product.discription}
          quantity={product.quantity}
        />
      </Drawer>
      <Adding />
    </div>
  );
}
