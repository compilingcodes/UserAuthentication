const mongoose=require('mongoose')

const connectDb= async (url) => {
  return await mongoose.connect(url).then(res => {
    
    if(process.env.MODE=== "production"){
      console.log(`cloud  mongodb connected`)
    }

    if(process.env.MODE=== "development"){
      console.log(`local database connected`)
    }
    
  }).catch(err=>{
    console.log(err.msg);
    
  })
}

module.exports={connectDb}