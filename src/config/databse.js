const mongoose=require('mongoose');

const connectDB=async()=>{
    await mongoose.connect(
        "mongodb+srv://NodejsUser:cAhw61wUdVlImDY9@namastenodejs.mq8cm.mongodb.net/DevMergDB"
    )
}


module.exports={connectDB};