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

app.get("/", async(req,res)=> {
    const page =  parseInt(req.query.page) || 1; // ||이전값이 빈 값이거나 null인경우의 기본값
    const search = req.query.search || "";
    try {
        const [posts,paginator] = await postService.list(collection, page, search);

        res.render("home", {title: "테스트게시판", search, paginator, posts});
    } catch (error){
        console.error(error);
        res.render("home",{title: "테스트 게시판"});
    }
})

app.get("/write", async (req,res) => {
    const post = req.body;
    const result = await postService.writePost(collection, post)
    res.render(`detail/${result.insertedId}`);
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



