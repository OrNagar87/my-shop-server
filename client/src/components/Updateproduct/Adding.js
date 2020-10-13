import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Form, Input, Button, Checkbox } from "antd";

import "./update.css";
// import { Upload } from "antd";
// import ImgCrop from "antd-img-crop";

export default function Adding() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products/").then(function (response) {
      setData(response.data);
    });
  }, []);

  const [title, setTitle] = useState();
  function Add_title(title) {
    setTitle(title.target.value);
  }

  const [image, setimage] = useState();
  const Add_image = (e) => {
    setimage(e.target.value);
  };

  const [price, setPrice] = useState();
  const Add_price = (e) => {
    setPrice(e.target.value);
  };

  const [quantity, setQuantity] = useState();
  const Add_quantity = (e) => {
    setQuantity(e.target.value);
  };
  const [discription, setDiscription] = useState();
  const Add_discription = (e) => {
    setDiscription(e.target.value);
  };
  //upload image//
  const fileInput = useRef();
  const uploadImage = () => {
    if (fileInput) {
      const uploadedFile = fileInput.current;

      axios.post("http://localhost:8000/upload", uploadedFile.files[0], {
        params: { filename: uploadedFile.files[0].name },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(percentCompleted);
          setimage(
            "http://localhost:8000/images/" + uploadedFile.files[0].name
          );
        },
      });
    }
  };
  //   //ant function to upload//

  //   const [fileList, setFileList] = useState([
  //     {
  //       uid: "-1",
  //       name: "image.png",
  //       status: "done",
  //       url:
  //         "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //     },
  //   ]);

  //   const onChange = ({ fileList: newFileList }) => {
  //     setFileList(newFileList);
  //   };

  //   const onPreview = async (file) => {
  //     let src = file.url;
  //     if (!src) {
  //       src = await new Promise((resolve) => {
  //         const reader = new FileReader();
  //         reader.readAsDataURL(file.originFileObj);
  //         reader.onload = () => resolve(reader.result);
  //       });
  //     }
  //     const image = new Image();
  //     image.src = src;
  //     const imgWindow = window.open(src);
  //     imgWindow.document.write(image.outerHTML);
  //   };

  const Add_product = () => {
    console.log("adding");

    axios
      .post("http://127.0.0.1:8000/products/", {
        title: title,
        image: image,
        price: price,
        quantity: quantity,
        discription: discription,
      })
      .then((res) => {
        console.log("POST DATA", res);
        alert("המוצר התווסף בהצלחה למדף המוצרים");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // ant functions for form//
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  //   const Demo1 = () => {
  //     const onFinish = (values) => {
  //       console.log("Success:", values);
  //     };

  //     const onFinishFailed = (errorInfo) => {
  //       console.log("Failed:", errorInfo);
  //     };
  //   };
  return (
    <Form
      className="adding_body"
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      //   onFinish={onFinish}
      //   onFinishFailed={onFinishFailed}
    >
      <h1 className="adding_title">הוספת מוצר</h1>
      <div className="adding_wruper">
        <Form.Item
          label="שם המוצר"
          name="title"
          rules={[{ required: true, message: "הכנס שם למוצר" }]}
        >
          <Input
            className="input title"
            type="text"
            name="title"
            placeholder="שם המוצר"
            onChange={Add_title}
          />
        </Form.Item>
        <Form.Item
          label="העלאת תמונה מקובץ"
          name="upload"
          rules={[{ required: false }]}
        >
          <Input type="file" ref={fileInput} onChange={uploadImage} />
        </Form.Item>
        <Form.Item
          label="הכנסת כתובת תמונה"
          name="urlImg"
          rules={[{ required: false }]}
        >
          <Input
            className="input pic"
            type="url"
            name="image"
            placeholder="כתובת תמונה"
            size="40"
            pattern="https://.*"
            onChange={Add_image}
          />
        </Form.Item>
        <Form.Item
          label="מחיר"
          name="price"
          rules={[{ required: true, message: "הכנס מחיר מוצר" }]}
        >
          <Input
            className="input price"
            type="number"
            name="price"
            placeholder="מחיר המוצר"
            onChange={Add_price}
          />
        </Form.Item>
        <Form.Item
          label="כמות במלאי"
          name="quantity"
          rules={[{ required: true, message: "הכנס ערך" }]}
        >
          <Input
            className="input quantity"
            type="number"
            name="quantity"
            placeholder="כמות במלאי"
            onChange={Add_quantity}
            required
          />
        </Form.Item>
        <Form.Item
          label="תיאור המוצר"
          name="discription"
          rules={[{ required: true, message: "הכנס תיאור מוצר" }]}
        >
          <textarea
            className="input text"
            name="discription"
            placeholder="תיאור המוצר"
            onChange={Add_discription}
            rows="5"
            cols="33"
            required
          ></textarea>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={Add_product}>
            הוסף מוצר
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
