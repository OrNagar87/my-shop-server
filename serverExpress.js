const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const AcceptUrl = (req, res, next) => {
  if (req.image) next();
};
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", (req, res) => {
  console.log("QUERY:", req.query);
  const search = req.query.search;
  fs.readFile("products.json", (err, data) => {
    const products = JSON.parse(data);
    if (search) {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      res.send(filteredProducts);
    } else {
      res.send(products);
    }
  });
});

app.post("/products", (req, res) => {
  fs.readFile("products.json", (err, data) => {
    console.log(req.body);
    const products = JSON.parse(data);
    const title = req.body.title;
    const image = req.body.image;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const discription = req.body.discription;

    products.push({
      id: products[products.length - 1].id + 1,
      title: title,
      image: image,
      quantity: quantity,
      price: price,
      discription: discription,
    });

    fs.writeFile("products.json", JSON.stringify(products), (err) => {
      // console.log(err);
      res.send("YOU SUCCEED!!!");
    });
  });
});

app.post("/upload", (req, res) => {
  req.pipe(fs.createWriteStream(`images/${req.query.filename}`));
  res.send("WOW!");
});

app.delete("/products/:id", (req, res) => {
  fs.readFile("products.json", (err, data) => {
    const products = JSON.parse(data);
    const productId = +req.params.id;
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );
    products.splice(productIndex, 1);
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
      res.send("YOU SUCCEED!!!");
    });
  });
});

app.put("/products/:id", (req, res) => {
  fs.readFile("products.json", (err, data) => {
    const products = JSON.parse(data);
    const productId = +req.params.id;
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );
    const product = products[productIndex];

    for (const property in product) {
      if (req.body[property]) product[property] = req.body[property];
    }

    fs.writeFile("products.json", JSON.stringify(products), (err) => {
      res.send("YOU SUCCEED!!!");
    });
  });
});
app.use("/images/", express.static("images"));

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
