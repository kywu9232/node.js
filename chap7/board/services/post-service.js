const paginator = require("../utils/paginator");
const { ObjectId } = require("mongodb");

async function writePost(collection, post) {
    post.hits = 0;
    post.createdDt = new Date().toISOString();
    return await collection.insertOne(post);
}

async function list(collection, page, search) {
    const perPage = 10;
    const query = {title: new RegExp(search, "i")}; //title이 search와 부분일치하는지 확인
    // limit는 10개만 가져온다는 의미, skip은 설정된 갯수 만큼 건너뜀, 생성일 역순으로 정렬
    const cursor = collection.find(query, {limit: perPage, skip: (page -1 ) * perPage}).sort({
        createdDt: -1,
    });
    //검색어에  걸리는 게시물의 총 합
    const totalCount = await collection.count(query);
    //cursor로 받아온 데이터를 리스트로 변경
    const posts = await cursor.toArray();
    //paginator 생성
    const paginatorObj = paginator({totalCount, page, perPage : perPage});
    return [posts, paginatorObj];
}

const projectionOption = { //패스워드는 노출할 필요 없으므로 결괏값 x 272p
    projection: {
        password: 0,
        "comments.password" : 0,
    },   
};

async function getDetailPost(collection, id) {
    return await collection.findOneAndUpdate({ _id:ObjectId(id)}, { $inc: {hits:1}}, projectionOption);
}

async function getPostByIdAndPassword(collection, {id, password}){
    return await collection, findOne({ _id:ObjectId(id), password: password },
    projectionOption);
}

async function getPostById(collection, id) {
    return await collection.findOne({ _id: ObjectId(id)}, projectionOption);
}

async function updatePost(collection, id, post) {
    const toUpdatePost = {
        $set: {
            ...post,
        },
    };
    return await collection.updateOne({ _id: ObjectId(id)}, toUpdatePost);
}
module.exports = {
    list,
    writePost,
    getDetailPost,
    getPostById,
    getPostByIdAndPassword,
    updatePost,
};