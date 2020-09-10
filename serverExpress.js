const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

const mongoose = require("mongoose");
const { url } = require("inspector");
const { title } = require("process");
const { type } = require("os");
const { types } = require("util");
const Schema = mongoose.Schema;
// mongoose.set("returnOriginal", false);
mongoose.set("useFindAndModify", false);

const ConnectToDB = () => {
  return mongoose.connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};

const productSchema = new mongoose.Schema({
  id: Schema.Types.ObjectId,
  title: String,
  image: String,
  quantity: Number,
  price: Number,
  discription: String,
});
const Product = mongoose.model("Product", productSchema);

const productInCartSchema = new mongoose.Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
  title: String,
});
const ProductInCart = mongoose.model("ProductInCart", productInCartSchema);

const userSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
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

app.get("/products", async (req, res) => {
  const search = req.query.search;
  console.log(search);

  if (search) {
    products = await product
      .find({ title: { $regex: search, $options: "i" } })
      .exec();
  } else {
    products = await Product.find().exec();
  }
  res.send(products);
});

app.post("/cart", async (req, res) => {
  const { _id: productId, title } = req.body;
  const cartProduct = new ProductInCart({
    productId: productId,
    quantity: 4,
    title: title,
  });
  await cartProduct.save();
  res.send("product in the cart");

  const cartNew = new Cart({
    products: [...Cart.products, productId],
  });
  await cartNew.save();
  await Cart.find([0]).populate("products").exec();
  console.log("products on cart:", [Cart.products.title]);

  // await populate('ProductInCart')
});

app.post("/products", async (req, res) => {
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

app.post("/upload", (req, res) => {
  req.pipe(fs.createWriteStream(`images/${req.query.filename}`));
  res.send("WOW!");
});

app.delete("/products/:id", (req, res) => {
  const productId = +req.params.id;
  product.deleteOne({ _id: productId }, function (err) {
    if (err) return err;
    else res.send("YOU SUCCEED!!!");
  });
});

app.put("/products/:id", async (req, res) => {
  const productId = +req.params.id;
  const query = req.body;
  console.log(query);
  await Product.findOneAndUpdate({ _id: productId }, query).exec();

  res.send("YOU SUCCEED update!!!");
});

//update quantity

app.put("/quantity/:id", async (req, res) => {
  const productId = req.params.id;

  const quant_change = req.body.quantity;
  let product = await Product.findOneAndUpdate(
    { _id: productId },
    { quantity: quant_change }
  ).exec();
  console.log(quant_change);

  await res.send("YOU did it!!!");
  io.emit("newQuantity", {
    new_quant: quant_change,
    name: product.title,
  });
});

app.use("/images/", express.static("images"));

ConnectToDB().then(() => {
  server.listen(8000, () => {
    console.log("Example app listening on port 8000!");
  });
});
