const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect('mongodb://localhost:27017/bbbb', { ignoreUndefined: true }).catch((err) => {
        console.error(err);
    });
};

module.exports = connect;

///몽고디비랑 연결하는 코드덩어리