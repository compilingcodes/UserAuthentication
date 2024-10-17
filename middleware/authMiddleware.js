const {StatusCodes}=require('http-status-codes')
const jwt=require('jsonwebtoken')

const authMiddleware  = async (req, res, next) => {
  try {
    //raed the token form headers
const token=req.header("Authorization")

//verification logic


    res.json({msg:"auth middleware", token})
  }
  catch(err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({  status:false, msg: err.message})
  }
}

module.exports=authMiddleware