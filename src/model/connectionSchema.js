const mongoose=require('mongoose');

const connectionSchema=new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Userdetails",
        require:true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Userdetails",
        require:true
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is not a Status`
        }
    }
},{
    timestamps:true
})

connectionSchema.index({fromUserId:1,toUserId:1});
connectionSchema.index({toUserId:1,fromUserId:1});

connectionSchema.pre("save",function(next){
    if(this.fromUserId.toString()===this.toUserId.toString()){
        throw new Error(`You Can't send connection request to yourself`)
    }
    next();
})

const ConnectionModel=mongoose.model("ConnectionModel",connectionSchema);

module.exports={ConnectionModel};