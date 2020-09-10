const mongoose = require("mongoose");

function connectToDB() {
  return mongoose.connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
}

connectToDB().then(() => {
  console.log("hello");
  const kittyschem = new mongoose.Schema({
    name: String,
  });

  const kitten = mongoose.model("kitten", kittyschem);
  const shula = new kitten({ name: "shula" });
  shula.save();
});
