const DB = [];

//회원가입 API
function register(user) {
    return saveDB (user,function (user) {
        return sendEmail(user, function(user){
            return getResult(user);
        });
    });
}

//콜백 실행
function saveDB(user,callback) {
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    return callback(user);
}

//이메일 발송 로그 남기는 코드 실행 후 콜백 실행
function sendEmail(user, callback) {
    console.log(`email to ${user.email}`);
    return callback(user);
}

//결과 반환
function getResult(user) {
    return `success register ${user.name}`;
}

const result = register({ email : "uk@test.com", pw : "123" , name : "uk"});
console.log(result);