const express  = require("express");
const Comment = require("../schemas/comment");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");



//댓글 작성 ===========================================

router.post("/comment/:postId",authMiddleware ,async (req,res)=>{

    
    try{
        const {nickName} = res.locals.user;
        const {postId} = req.params
        const {comment} = req.body;
      
      
        if(comment === ""){
         
          res.status(400).send({
              errorMessage: " 댓글 내용을 입력해주세요 "
            });
            return
      }

        const plusCommentId = await Comment.findOne().sort('-commentId');
        let commentId = 1;

        if(plusCommentId){
          commentId = plusCommentId.commentId + 1;
        }

     
        

        const createdComment = await Comment.create({ postId ,nickName,comment,commentId});

        
        
        
        res.json ({ createdComment });

    }catch(err) {
        res.status(400).send({
          errorMessage: "로그인 후 사용하세요. ",
        });
      }

});

//---------------------------------------------------------


//댓글 목록 불러오기? ===================================================================

router.get("/comment/list/:postId", async(req,res)=>{
    const {postId} = req.params;

    const commentList = await Comment.find({postId: Number(postId) });

  
    res.json({
      commentList,
    })

});



//--------------------------------------------------------------------





//댓글 수정===========================================================

router.put("/comment/:commentId",async(req,res)=> {    ///상품목록 수정하는 api
    const { commentId } = req.params; 
    const { comment } = req.body; 

    await Comment.updateOne({ commentId: Number(commentId)}, {$set: {comment }});
  
    res.json({ success:true});
  })

//-------------------------------------------------------------------




///댓글 삭제 api ==============================================================

router.delete("/comment/:commentId", authMiddleware, async (req, res) => {
    const { commentId } = req.params; 
     
    const deleteComment = await Comment.find({ commentId : Number(commentId) });
    if(deleteComment.length){
      await Comment.deleteOne({ commentId: Number(commentId)});
    }

      res.json({ success : "댓글이 삭제되었습니다."});   
});

//---------------------------------------------------------------------------



//-------------------------------------------------------------------



module.exports = router;