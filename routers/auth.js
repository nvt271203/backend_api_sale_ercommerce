const express = require('express'); // Framework để tạo các API HTTP.
const User = require('../models/user');  //Đây là mô hình của một người dùng, bao gồm các thông tin như fullname, email, và password.
const bcrypt = require('bcryptjs'); // Chắc là Framework để băm chuỗi

const authRouter = express.Router();  //KHởi tọa 1 router.

const jwt = require('jsonwebtoken');


// Đường dẫn /api/signup xử lý yêu cầu HTTP POST.
authRouter.post('/api/signup', async(req, res)=>{     // Định nghĩa 1 router 
    try {
        const {fullName, email, password} = req.body;
        
        const exitsingEmail = await User.findOne({email});
        if (exitsingEmail) {
            return res.status(400).json({msg:"Địa chỉ email đã tồn tại !"})
        }else{
            
            // Chắc là tạo định dạng Băm chuỗi
            const salt = await bcrypt.genSalt(10);

            // Áp dụng băm chuỗi vào mật khẩu
            const hashedPassword = await bcrypt.hash(password, salt);
        
 
            var user = new User({fullName, email, password: hashedPassword}); //3Thso này lấy từ ID
            user = await user.save();
            res.json({user});   
        }

    } catch (e) {
        res.status(500).json({error: e.message});
    }
});


// Tạo điểm cuối API cho đăng nhập
authRouter.post('/api/signin', async(req, res) =>{
    try {
        const {email, password} = req.body;
        const findUser = await User.findOne({email}); 
        if (!findUser) {
            return res.status(400).json({msg: "Người dùng không tìm thấy với Email này !"});
    
        }else{
            //Dùng bcrypt.compare() để so sánh mật khẩu nhập vào với mật khẩu đã được mã hóa trong database.
            const isMatch = await bcrypt.compare(password, findUser.password); 
            if(!isMatch){
                return res.status(400).json({msg: "Mật khẩu không đúng, vui lòng nhập lại mật khẩu nhé !"});
            }else{
                //Tạo 1 chuỗi token định danh người dùng đã đăng nhập thông qua _id
                const token = jwt.sign({id: findUser._id}, "passwordKey");
                const {password, ...userWithoutPassword} = findUser._doc;

                // res.json({token, ...userWithoutPassword}); 
                //Lưu 2 key là token và đối tượng User
                res.json({token, user:userWithoutPassword});
            }
        }
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})


module.exports = authRouter;