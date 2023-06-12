import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
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
    required: true
   },
   isAdmin: {
    type: Boolean,
    required: true,
    default: false
   }
}, {
    timestamps: true
})

// compare entered password and crypted password in the database
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// encrypt a password automatically on save
userSchema.pre('save', async function (next) {
    //prevents regenaration of a new token when password is not changed which can prevent us from logging in
    if(!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)
export default User