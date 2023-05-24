const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const mongodbConnection = require("./configs/mongodb-connection");
const postService = require("./services/post-service");

app.engine(
    "handlebars",
    handlebars.create({
        helpers: require("./configs/handlebars-helpers"),
    }).engine,
);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views"); //절대경로 지정 __dirname node = 실행 디렉터리 경로
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get("/", (req,res) => {
    res.render("home", {title: "테스트 게시판", message: "반갑습니다"});
});

app.get("/write", async (req,res) => {
    const post = req.body;
    const result = await postService.writePost(collection,post);
    res.redirect(`/detail/${result.insertId}`);
});

app.get("/detail/:id", async (req,res) =>{
    res.render("detail", {title: "테스트 게시판"});
});

let collection;
app.listen(3000, async () => {
    console.log("Server started");

    const MongoClient = await mongodbConnection();

    collection = MongoClient.db().collection("post");
    console.log("mongoDB connected");
});

//260
