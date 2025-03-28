import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import { generateTokensAndSetCookie } from "./../lib/utils/generateTokensandSetCookie.js";

export const signup = async (req, res) => {
  try {
    //taking email, password, username, fullname from the request body
    const { email, password, username, fullname } = req.body;


    //checking if all fields are provided
    if (!email || !password || !username || !fullname) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //checking email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // check if username is already taken
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already taken" });
    }

    //check if email is already taken
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already taken" });
    }

    //check if password is strong
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }


    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    //creating user 
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      fullname,
    });

    if (newUser) {
      generateTokensAndSetCookie(newUser._id, res);

      await newUser.save();
      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: newUser
      })

    }
    else {
      return res.status(400).json({
        error: "Failed to create user"
      })
    }



  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message
    })

  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //check if all fields are provided
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    //check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    //generate token and set cookie
    generateTokensAndSetCookie(user._id, res);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: user
    })



  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message
    })

  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      success: true,
      message: "User logged out successfully"
    })

  } catch (error) {
    console.log("Error in logout controller", error.message);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message
    })
  }
}

export const getUserDetails = async (req, res) => {
  try {

    //get the user id from the request
    const userId = req.user._id;

    //get the user in the database
    const user = await User.findById(userId).select("-password");

    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      user: user
    })



  } catch (error) {
    console.log("Error in getUserDetails controller", error.message);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message
    })
  }
}
