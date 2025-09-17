const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //for password hashing

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
    },   

  email: { 
    type: String, 
    required: true, 
    unique: true 
    },

  password: { 
    type: String, 
    required: true, 
    }, 

    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },   
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

// Hash password before saving to database using the pre-save hook
userSchema.pre("save", async function (next){
    if(!this.isModified("password")) { /// Only hash if password changed
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); //compare entered passowrd with the actual password
}

module.exports = mongoose.model("User", userSchema); 