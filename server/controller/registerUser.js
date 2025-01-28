const UserModel = require("../models/UserModel")
const bcryptjs = require('bcryptjs')

async function registerUser(request,response) {
    try {
        const { name, email, password, profile_pic} = request.body   //get data from frontend or backend


        const checkEmail = await UserModel.findOne({email})     //check mail it is exists or not

        if(checkEmail){
            return response.status(400).json({
                message : "Already user exists",
                error : true,
            })
        }
        // password into hash password
        const salt = await bcryptjs.genSalt(10);
        const hashpassword = await bcryptjs.hash(password,salt);

        const payload = {           //payload is object instance that is name of object data will like name,email,profile_pic
            name,
            email,
            profile_pic,
            password : hashpassword
        }

        const user = new UserModel(payload);
        const userSave = await user.save();

        return response.status(201).json({
            message : "User created Successfully",
            data : userSave,
            success :true
        })


    } catch (error) {
       return response.status(500).json({
            message : error.message || error,
            error : true
       })
    }
}

module.exports = registerUser;