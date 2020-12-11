const mongoose = require('mongoose');
const schema  = new mongoose.Schema({
    username:{
        type:String,
    },
    // cnpm install bcrypt  用于做密码的散列
    password:{
        type:String,
        select:false,
        set(val){
           return require('bcrypt').hashSync(val,10)//第二个值是散列的加密指数  
        }
    }
})


module.exports = mongoose.model('AdminUser',schema)