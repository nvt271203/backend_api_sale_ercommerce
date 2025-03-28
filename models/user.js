const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value)=>{
                const result = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return result.test(value);
            },
            message: 'Vui lòng nhập đúng định dạng email !'
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => {
                return value.length >=8;
            },
            message : "Mật khẩu yếu, vui lòng nhập mật khẩu dài hơn nhé ! "
        }
    },

    // thso ko bắt buộc
    state:{
        type: String,
        default:"",
        trim: true,
    },
    locality:{
        type: String,
        default:"",
        trim: true,
    },
    city:{
        type: String,
        default:"",
        trim: true,
    }
});

const User = mongoose.model("Users", userSchema);
module.exports = User;