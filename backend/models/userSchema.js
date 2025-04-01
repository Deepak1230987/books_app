import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        default: null,
    },
    profileImg: {
        type: String,
        default: "",
    },
    coverImg: {
        type: String,
        default: "",
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
    }],
    bio: {
        type: String,
        default: "",
    },
    link: {
        type: String,
        default: "",
    },
    likedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
    }],
    savedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        default: [],
    }],
    myBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        default: [],
    }],
    role: {
        type: String,
        enum: ["user", "admin", "author"],
        default: "user",
    },
    completedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        default: [],
    }],
    currentlyReading: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        default: [],
    }],
    
        

}, { timestamps: true })


const User = mongoose.model("User", userSchema);

export default User;

