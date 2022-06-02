const mongoose = require('mongoose');

const comment = mongoose.Schema({
    postId : {
        type: Number,
    },
    nickName: {
        type: String,
        required: true,     /// 리콰이어는 데이터에 넣을때 필수입력값
                             // 유니크는 같은 값이 있으면 안된다. (굿즈아이디르 1로 해서 넣고 또 넣으면 에러가 나게끔 만드는것!)
    },
    commentId:{
        type:Number,
        required:true,
      
    },
    comment: {
        type: String,
                    /// 리콰이어는 데이터에 넣을때 필수입력값
                          // 유니크는 같은 값이 있으면 안된다. (굿즈아이디르 1로 해서 넣고 또 넣으면 에러가 나게끔 만드는것!)
        },

    
});


module.exports = mongoose.model('Comment', comment);  //( 밖으로 내보낼때의 이름, 보낼려는 변수이름)
                                                    