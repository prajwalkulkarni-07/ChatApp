import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs";
// import { error } from "console";
import generateToken from "../utils/generateToken.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await prisma.user.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      },
    });

    if (newUser) {
      // generate token in a sec
      generateToken(newUser.id, res);

      res.status(201).json({
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    
    if (user) {
      const isPasswordCorrect = await bcryptjs.compare(password, user.password);
      
      if (isPasswordCorrect) {
        generateToken(user.id, res);
        res.status(201).json({
          id: user.id,
          fullName: user.fullName,
          username: user.username,
          profilePic: user.profilePic,
        });
      } else {
        res.status(400).json({ error: "Incorrect password" });
      }
    } else {
      res.status(400).json({ error: "User does not exist. Please signup first." });
    }
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const logout = async (req: Request, res: Response) => {
  try {
	res.cookie("jwt", "", {maxAge: 0});
	res.status(200).json({message: "Logged out successfully"});
  } catch (err: any) {
	res.status(500).json({error:"Internal server error"});
    console.error(err.message);
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    // Assuming your protectRoute middleware attaches the user to req.user
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    
    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
