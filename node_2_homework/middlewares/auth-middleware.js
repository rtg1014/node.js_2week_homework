const jwt = require("jsonwebtoken");
const Object = require("../schemas/object");


module.exports =  (req,res,next)=>{              ///미들웨어의 기본 모습
    const {authorization} = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ');     /// 1.
    
    if (tokenType !== "Bearer"){
       

       res.status(401).send({
           errorMessage : "로그인 후 사용 하세요",
       }); 
       return;          ///오류가 났으니 더이상 진행시키면 안되서 return
    } 
    try {
        const { userId } = jwt.verify( tokenValue, "sh1014-secret-key");    /// 복호화 겸, 검증을위한 코드

        Object.findById(userId).exec().then((Object) => {     /// 데이터베이스에서 사용자 정보를 불러와서
            res.locals.user = Object;     /// 로컬스.user 라는 공간에 담는데
            next();                      /// {userId} 변수선언 후 userId 찾기
        });                                ///미들웨어는 넥스트가 항상 잇어야      
        
    
    } catch (error) {
        
        res.status(401).send({
            errorMessage : "로그인 후 사용 하세요",
        });
        return;
    }
};


/**
 * 1. 스플릿 이라는 내장함수를 사용하여 다음과 같이 코드를 작성하면 authorization 안의 값인
 * Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTM2OTk1NTJ9._IoLmTQvM4Vn8XYs27RliucFAY_VUWpp8WPqtUjdwVc
 * 위 값을 부분을 배열로 나눠줌
 * 그래서 나누면 [Bearer,  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTM2OTk1NTJ9._IoLmTQvM4Vn8XYs27RliucFAY_VUWpp8WPqtUjdwVc]
 * 이렇게 나온다. 그럼 배열값의 0번째 값인 tokenType 이고, 1번째 값이 tokenValue 다
 * 우리가 필요한건 토큰 value 값이다. 즉 나눠놓고 필요한거만 가져다가 쓸려고 저 함수를 쓴것.
 */