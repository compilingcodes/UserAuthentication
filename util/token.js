//to generate authentucation token jwd(jsom web token)

const jwt=require('jsonwebtoken')

const generateToken =(id) =>{
//jwt.sign(userid, secrets,options)
return jwt.sign({id},process.env.SECRET, {expiresIn: '1d'})
}
module.exports=generateToken