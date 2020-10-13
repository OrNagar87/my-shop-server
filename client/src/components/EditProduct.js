import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Form, Input, Button, Checkbox } from "antd";

export default function Edit(props) {
  //   const [form] = Form.useForm();

  //   form.setFieldValues(props);

  // change items in products//
  const [change_title, setChange_title] = useState();
  const Change_title = (e) => {
    setChange_title(e.target.value);
  };
  const [img, setImg] = useState();
  const Change_img = (e) => {
    setImg(e.target.value);
  };
  const [change_price, setCnage_price] = useState();
  const Change_price = (e) => {
    setCnage_price(e.target.value);
  };
  const [change_quantity, setCnage_quantity] = useState();
  const Change_quantity = (e) => {
    setCnage_quantity(e.target.value);
  };
  const [change_discription, setCnage_discription] = useState();
  const Change_discription = (e) => {
    setCnage_discription(e.target.value);
  };

  return (
    <Form initialValues={props}>
      <Form.Item label="שם המוצר" name="title">
        <Input
          type="text"
          name="title"
          // defaultValue={props.title}
          onChange={Change_title}
        />
      </Form.Item>

      <Form.Item label="כתובת התמונה" name="image">
        <Input
          type="url"
          defaultValue={props.image}
          size="40"
          onChange={Change_img}
        />{" "}
        <img src={props.image} alt="" />
      </Form.Item>

      <Form.Item label="מחיר" name="price">
        <Input
          type="number"
          //   defaultValue={props.price}
          onChange={Change_price}
        />
      </Form.Item>
      <Form.Item label="כמות מוצרים" name="quantity">
        <Input type="number" onChange={Change_quantity} />
      </Form.Item>

      <Form.Item label="תיאור המוצר" name="discription">
        <textarea
          defaultValue={props.discription}
          rows="5"
          cols="33"
          onChange={Change_discription}
        ></textarea>
      </Form.Item>

      <Button
        onClick={async () => {
          await axios
            .put("http://127.0.0.1:8000/products/" + props._id, {
              title: change_title,
              image: img,
              price: change_price,

              discription: change_discription,
            })
            .then((res) => {
              if (change_quantity) {
                axios
                  .put("http://127.0.0.1:8000/quantity/" + props._id, {
                    quantity: change_quantity,
                  })
                  .then((res) => {
                    console.log("put quant", res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
              console.log("POST DATA", res);
              alert("השינויים נשמרו");
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        שמור את השינויים
      </Button>
    </Form>
  );
}
