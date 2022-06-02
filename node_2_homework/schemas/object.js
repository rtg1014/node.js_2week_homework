const mongoose = require('mongoose');

const object = mongoose.Schema({
    nickName: {
        type: String,
        required: true,     /// 리콰이어는 데이터에 넣을때 필수입력값
                          // 유니크는 같은 값이 있으면 안된다. (굿즈아이디르 1로 해서 넣고 또 넣으면 에러가 나게끔 만드는것!)
    },
    password: {
        type: String,
        required: true,
       
    },
    passwordConfirm: {
        type: String
    }
    
});

object.virtual("userId").get(function () {
    return this._id.toHexString();
  });
  object.set("toJSON", {
    virtuals: true,
  });
0

  
module.exports = mongoose.model('Object', object);  //( 밖으로 내보낼때의 이름, 보낼려는 변수이름)
                                                    
