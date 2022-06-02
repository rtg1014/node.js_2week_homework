const mongoose = require('mongoose');

const posting = mongoose.Schema({
    nickName: {
        type: String,
        required: true,     /// 리콰이어는 데이터에 넣을때 필수입력값
                         // 유니크는 같은 값이 있으면 안된다. (굿즈아이디르 1로 해서 넣고 또 넣으면 에러가 나게끔 만드는것!)
    },
    postId : {
        type: Number,
        unique: true , 
    },
    title : {
        type: String,
       
    },
    content: {
        type: String,
      
       
    },

    
});


module.exports = mongoose.model('Posting', posting);  //( 밖으로 내보낼때의 이름, 보낼려는 변수이름)
                                                    