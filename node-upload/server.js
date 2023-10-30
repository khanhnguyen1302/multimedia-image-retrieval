// call all the required packages
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const cors = require("cors");

//CORS
app.use(cors());

//CREATE EXPRESS APP
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTES WILL GO HERE
app.get("/", function (req, res) {
  res.json({ message: "WELCOME" });
});

app.get("/home", function (req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + "/index.html");
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/uploads");
  },
  filename: function (_, file, cb) {
    cb(null, `${file.fieldname}-uploaded.png`);
  },
});

var upload = multer({ storage: storage });

app.post("/upload/photo", upload.single("image"), (req, res) => {
  // console.log(req, res);
  // var img = fs.readFileSync(req.file.path);
  // var encode_image = img.toString("base64");
  // // Define a JSONobject for the image attributes for saving to database
  // const a = "123.jpg";
  res.json({ message: "OK", file: req.file });
});

app.get("/name", (req, res) => {
  var spawn = require("child_process").spawn;
  let resData;

  // change path here
  // mac: install virtualenv
  let path = "./venv/bin/python";

  // var process = spawn(path, [
  //   `/Users/khanhnguyen/workspace/study/Multimedia/DSHcls.py --query_image="/Users/khanhnguyen/workspace/study/multimedia-image-retrieval/node-upload/uploads/image-uploaded.png"`,
  // ]);

  var process = spawn(path, [
    "./python.py",
    req.query.firstname,
    req.query.lastname,
  ]);

  process.stdout.on("data", function (data) {
    console.log("data", data);
    res.send(data.toString());
    resData = data;
  });

  // res.json({ message: "OK", data: resData });
});

app.listen(3000, () => console.log("Server started on port 3000"));
