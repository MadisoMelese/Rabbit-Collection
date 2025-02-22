import mongoose from 'mongoose'
import bycrypt from 'bycryptjs'

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    match:[/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password:{
    type:String,
    required:true,
    minlength:6,
  },
  role:{
    type:String,
    enum:["customer", "admin"],
    default:"customer",
  },
},
{timestamps:true}
)

// hashing password
userSchema.pre("save", async function (next){
  if(!this.isModified("password")) return next()
    const salt = await bcrypt.genSalt(10)
  this.password= await bycrypt.hash(this.password, salt)
  next()
})

userSchema.methods.matchPassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model("User", userSchema)