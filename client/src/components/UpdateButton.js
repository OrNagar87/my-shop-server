import { Modal, Button, Input, Tooltip } from "antd";
import React, { useState } from "react";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Password from "antd/lib/input/Password";

const UpdateButton = () => {
  const [visible, setVisible] = useState(false);
  const [ok, setOk] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const Username = (e) => {
    setUsername(e.target.value);
  };
  const Password = (e) => {
    setPassword(e.target.value);
  };
  const handleOk = () => {
    if (password && username) {
      setVisible(false);
      setOk(true);
    }
  };

  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        ניהול מוצרים
      </Button>
      <Modal
        title="למעבר לניהול מוצרים הכנס שם משתמש וסיסמא"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Enter your username"
          rules={{ required: true }}
          onChange={Username}
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Extra information">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />
        <br></br>
        <br></br>
        <Input.Password
          placeholder="input password"
          rules={{ required: true }}
          onChange={Password}
        />
      </Modal>
      {ok ? <Redirect to="/update_products/" /> : null}
    </>
  );
};

export default UpdateButton;
