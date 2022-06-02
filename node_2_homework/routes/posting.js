const express  = require("express");
const Posting = require("../schemas/posting");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");



//게시글 생성=======================================================

router.post("/posting/", authMiddleware, async (req, res) => {
 
        const {nickName} = res.locals.user
       
        const {title,content} = req.body;

        const plusPostId = await Posting.findOne().sort('-postId');   /// 포스팅id 자동생성 
        let postId = 1;                                               /// 도움주신분 : 영성님

        if(plusPostId){
          postId = plusPostId.postId + 1;
        }
    
        const createdPosting = await Posting.create({ nickName, postId, title, content});
     
        res.json({ user: createdPosting});
        
    
});


//-----------------------------------------------------------------


//게시글 생성 다른 버젼================================================

// router.post("/posting/", authMiddleware, async (req, res) => {
 
//     const {nickName} = res.locals.user
   
//     const {title,content} = req.body;

//   await Posting.create({ nickName,title, content});         ///디비에 넣는 명령어 부분 알아서 넣어짐
 
//     res.json({});
    

// });

//-------------------------------------------------------------------





// 내꺼 게시물 조회 ================================================================

router.get("/posting/:nickName",authMiddleware,async (req,res)=>{
   
        const {nickName} = res.locals;
    
        const postingFind = await Posting.find({nickName: nickName});
        
        res.json({
            postingFind,
        });
    
    });
    
//-------------------------------------------------------------------------------------

//전체 게시물 조회 ======================================================================


router.get("/posting/list", async (req, res) => {
    const postings = await Posting.find();
    const nickNames = postings.map((posting)=> posting.nickName);
   
    const nick = await Posting.find({nickName: nickNames})
    
    res.json({
      nick,
    });
  }); 


//====================================================================




module.exports = router;