const express = require("express");
const connect = require('./schemas');       ///스키마에서 가셔와서 몽고디비랑 연결하는거
const app = express();                  /// app.use 로 사용하겟다는걸 정의하는 내용
const port = 4000;                  ///로컬호스트 4000 포트로 연결하겟다는 의미


connect();          // 스키마스 폴더에 몽고디비랑 연결한다고 선언은 했지만 실제로 연결할때 사용해주는것

const userRouter = require('./routes/object');      //2. 보낸걸 여기서 받음 (주소도 같아야함)
const authRouter = require('./routes/auth');
const contentRouter = require('./routes/posting');
const commetnRouter = require('./routes/comment');

const requestMiddleware = (req, res, next) => {
    console.log('request URL:', req.originalUrl, '-', new Date());
    next();
};          // 콘솔창에 띄우는거 (문자열로 리퀘스트 url나오게 하는거)


app.use(express.json());        //제이슨 파일을 익스프레스에서 사용할수 잇게 해주는 의미
app.use(express.urlencoded());        // 
app.use(requestMiddleware);     // 앱에서 const requestMiddleware 를 사용하겠다라는 뜻

app.use('/', [userRouter]);
app.use('/',[authRouter]);
app.use('/',[contentRouter]);
app.use('/',[commetnRouter]);




app.get('/', (req, res) => {
    res.send('Hello World@@');
});

app.listen(port, () => {
    console.log(port, '포트로 서버가 켜졌어요!');
});     /// 포트로 여는데 몇번포트로 여는지 콘솔창에 띄워주는거