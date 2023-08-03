const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "User name is required"],
        minLength:[5, "Name must be atleast 5 character"],
        maxLength:[30, "Name must be less than 30 character"],
        trim:true

    },
    email:{
        type:String,
        required:[true, "Email is required"],
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        select:false
    },
    confirmPassword:{
        type:String,
        select:false
    }
}, {
    timestamps:true
})

userSchema.pre('save', async function(next){

    if(this.isModified("password")){
        // console.log(this.password);
        this.password = await bcrypt.hash(this.password, 8);
        // console.log(this.password);
        this.confirmPassword = undefined;
    }
    
    next()
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel