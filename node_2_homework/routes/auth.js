const express  = require("express");
const Object = require("../schemas/object");
const router = express.Router();
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middlewares/auth-middleware");


//로그인 api ==========================================================================

router.post("/auth", async (req,res)=>{ 
    const {nickName, password} = req.body;         /// 일단 이메일이랑 비번을 받는다.
    
    const user = await Object.findOne({nickName, password}).exec();   /// 변수 user 는 Object 에서 이멜,패스워드 찾는다.

    if(!user){      /// 만약 일치하는 사람이 없다면? 
        res.status(400).send({
        errorMessage : "닉네임이나 비밀번호 중 뭔가가 틀렸는데 뭘까요?? "
    });
    return;   
};
    const token = jwt.sign({ userId: user.userId }, "sh1014-secret-key");      //sign 을 해야 만들어짐 꼭 쓸것
    
    res.send({      /// 응답할때도 jwt토큰을 반환해야 프론트엔드 에서 정상작동함
        token,
    });
});

//===============================================================================

// 내정보 조회 api ==========================
router.get("/auth/me",authMiddleware, async (req,res) => {      /// 이 경로로 들어왓을때만 어스미들웨어가 붙는다라는 뜻
    const {user} = res.locals;
    res.send({
        user,
    });   
       
});

//===================================

module.exports = router; 