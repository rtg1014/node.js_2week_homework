const express  = require("express");
const Object = require("../schemas/object");
const router = express.Router();
const Joi = require('joi')


const userSchema = Joi.object({
    nickName: Joi.string().alphanum().min(3).required(),
    password: Joi.string().disallow('nickName').min(3).required(),
    passwordConfirm: Joi.string().min(3).required()
});



//회원가입 api ---------------------
router.post("/user", async (req,res)=> {       
    try{
    
    const {nickName, password, passwordConfirm } = await userSchema.validateAsync(req.body);            ///body는 사용자가 직접 입력하는거 (선더 클라이언트에서 바디값 주는거랑 비슷 실제로는 웹사이트에서) /// prars 는 url

    
    const exitUser = await Object.find({  ///exitUser는  중복되는 닉네임이나 이메일 찾기위한 변수
                $or: [{nickName}],      /// $or 는 처음 나왔는데 아마 or 느낌으로 쓴거 같다.
            });
            if(exitUser.length){
                res.status(400).send({
                    errorMessage : "중복된 닉네임 입니다."
                });
                return;
            };


            if(nickName===password){
                res.status(400).send({
                    errorMessage : "닉네임이랑 비밀번호가 같아서 회원가입에 실패했습니다."
                });
                return;
            };

            if(nickName.length<4){
                res.status(400).send({
                    errorMessage : "닉네임이나 너무 짧습니다."
                });
                return;
            }


            
            if( password.toString().length<4 ){
                res.status(400).send({
                    errorMessage : "비밀번호가 너무 짧습니다."
                });
                return;
            };


     
            if(password !== passwordConfirm){
                res.status(400).send({
                    errorMessage : "패스워드가 일치하지 않습니다.",
                }); 
                return;     /// 여기서 리턴을 하는 이유는 에러 났으니까 이 다음 코드가 실행되지 않게 하기 위해서
            }

    const createdUsers = await Object.create({ nickName, password, passwordConfirm }); 
    
    res.json({ users: createdUsers });
        }
        catch(err) {
                console.log(err);
                res.status(400).send({
                  errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
                });
              }
        

    
   
});


//get 잘되는지 확인용 임시모델----------
router.get("/user",(req,res)=> {
    res.send("get 확인!");
});
//---=--------------------------------



//get nick name,password--------------------------------

router.get("/user/:nickName",async(req,res)=>{
    const {nickName} = req.params;
    
    const [ object] = await Object.find({nickName })
    res.json({
        object,
    })
    
});







module.exports = router; /// 1. 여기서 모든 라우터를 내보내줬고  



/// pqrms 는 url에서 /1 나오게 하는그거다. 예를들면 {id} = req.parms 해놓으면 /1 을 하면 id 값중 /1 인 애들이 나오게끔 설정하는 그거