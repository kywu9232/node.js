const http = require("http");
const url = require("url");

http.createServer((req,res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type","text/html");

    if (path in urlmap) {
        urlMap[path](req,res);
    } else {
        notFound(req,res);
    }
})
.listen("3000", () => console.log("라우터 리팩터링"));



const user = (req,res) => {
    const userInfo = url.parse(req.url, true).query;
     res.end(`[user] name : ${userInfo.name}, age: ${userInfo.age}`);
};

const feed = (req,res) => {
    res.end(`<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
        </ul>
        `);
};

const notFound = (req,res) => {
    res.statusCode = 404;
    res.end("404 page not found");
};


const urlMap = {
    "/": (req,res) => res.end("HOME"),
    "/user": user,
    "/feed": feed,
};
/* urlMap이 user feed함수보다 위에있으면 에러 > let, const, 함수 표현식, 클래식 표현식은 hoisting x */


