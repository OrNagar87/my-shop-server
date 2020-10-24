const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

const path = require("path");

const mongoose = require("mongoose");
const { url } = require("inspector");
const { title } = require("process");
const { type } = require("os");
const { types } = require("util");
const { dirname } = require("path");
const Schema = mongoose.Schema;
// mongoose.set("returnOriginal", false);
mongoose.set("useFindAndModify", false);

const ConnectToDB = () => {
  return mongoose.connect(
    `mongodb+srv://My-Shop:${process.env.DB_PASS}$@cluster0.jgomz.mongodb.net/<My-Shop>?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  );
};

const productSchema = new mongoose.Schema({
  title: String,
  image: String,
  quantity: Number,
  price: Number,
  discription: String,
});
const Product = mongoose.model("Product", productSchema);

const productInCartSchema = new mongoose.Schema({
  quantity: Number,
  title: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});
const ProductInCart = mongoose.model("ProductInCart", productInCartSchema);

const userSchema = new mongoose.Schema({
  name: String,
  password: Number,
  cart: { type: Schema.Types.ObjectId, ref: "Cart" },
});
const User = mongoose.model("User", userSchema);

const CartSchema = new mongoose.Schema({
  products: [{ type: Schema.Types.ObjectId, ref: "ProductInCart" }],
});
const Cart = mongoose.model("Cart", CartSchema);

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/products", async (req, res) => {
  const search = req.query.search;
  console.log(search);

  if (search) {
    products = await Product.find({
      title: { $regex: search, $options: "i" },
    }).exec();
  } else {
    products = await Product.find().exec();
  }
  res.send(products);
});

app.post("/api/cart", async (req, res) => {
  const cartProduct = new ProductInCart({
    quantity: req.body.quantity,
    title: req.body.title,
  });
  await cartProduct.save();
  res.send("product in the cart");
  console.log(cartProduct);

  await ProductInCart.find()
    .populate("title")
    .exec(function (err, title) {
      if (err) console.log(err);
      else console.log("products on cart:", title[title.length - 1].title);
    });
});

app.delete("/api/cart/:id", (req, res) => {
  const productId = req.params.id;
  ProductInCart.deleteOne({ title: productId }, function (err) {
    if (err) return err;
    else res.send("YOU SUCCEED!!!");
  });
});

app.post("/api/products", async (req, res) => {
  console.log(req.body);
  const productNew = new Product({
    title: req.body.title,
    image: req.body.image,
    quantity: req.body.quantity,
    price: req.body.price,
    discription: req.body.discription,
  });
  await productNew.save();
  res.send("YOU SUCCEED!!!");
});

app.post("/api/upload", (req, res) => {
  req.pipe(fs.createWriteStream(`images/${req.query.filename}`));
  res.send("WOW!");
});

app.delete("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  Product.deleteOne({ _id: productId }, function (err) {
    if (err) return err;
    else res.send("YOU SUCCEED!!!");
  });
});

app.put("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  const query = req.body;
  console.log(query);
  await Product.findOneAndUpdate({ _id: productId }, query).exec();

  res.send("YOU SUCCEED update!!!");
});

//update quantity

app.put("/api/quantity/:id", async (req, res) => {
  const productId = req.params.id;

  const quant_change = req.body.quantity;
  let product = await Product.findOneAndUpdate(
    { _id: productId },
    { quantity: quant_change }
  ).exec();
  console.log(quant_change);

  //socket is calling when there is update of quantity
  io.on("connect", OnConnect);
  res.send("YOU did it!!!").exc();
  function OnConnect() {
    io.emit("newQuantity", {
      new_quant: quant_change,
      name: product.title,
    });
  }
});

app.use("_dirname/images/", express.static("images"));
app.use(express.static(path.join("client")));
app.get("*", (req, res) => {
  res.sendFile(path.join("/client/build/index.html"));
});

const port = process.env.PORT || 5000;

ConnectToDB().then(() => {
  server.listen(port, () => {
    console.log(`Example app listening on ${port}`);
  });
});
