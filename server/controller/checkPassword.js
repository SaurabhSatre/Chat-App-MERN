const UserModel = require("../models/UserModel");


async function checkPassword(request, response){
    try {
        const { password,userId } = request.body;

        const user =await UserModel.findById(userId);

        const verifyPassword = await bcryptjs.compare(password,user.password);
        if(!verifyPassword){
            return response.status(400).json({
                message : "Please Check password",
                error : true
            })
        }
        return response.status(200).json({
            message : "Login successfully",
            data : user,
            success : true
        })
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}