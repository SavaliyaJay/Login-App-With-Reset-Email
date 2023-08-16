import { Request, Response } from "express";
const UserModel = require("../model/userModel");
const bcrypt = require("bcrypt");

/**
 *
 * @swagger
 * /register:
 *  post:
 *      description: Use to register a user
 *      requestBody:
 *          description: Optional description in *Markdown*
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              description: The user's name.
 *                              example: John Doe
 *                          password:
 *                              type: string
 *                              description: The user's password.
 *                              example: abc@124
 *                          profile:
 *                              type: string
 *                              description: The user's profile URL.
 *                              example: ""
 *                          email:
 *                              type: string
 *                              description: The user's email.
 *                              example: abc@gmail.com
 *      responses:
 *          '200':
 *              description: A successful response
 */

const register = async (req: Request, res: Response) => {
  try {
    const { username, password, profile, email } = req.body;

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        username,
        password: hashPassword,
        profile: profile || "", 
        email
      });

      try {
        const result = await newUser.save();
        res.status(201).json({ message: "User Registered Successfully" });
      } catch (saveError) {
        res.status(500).json({ error: "Unable to register user" });
      }
    } else {
      res.status(400).json({ error: "Password is required" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req: Request, res: Response) => {
  res.json("login route");
};

const getUser = async (req: Request, res: Response) => {
  res.json("getUser route");
};

const updateUser = async (req: Request, res: Response) => {
  res.json("updateUser route");
};

const generateOTP = async (req: Request, res: Response) => {
  res.json("generateOTP route");
};

const verifyOTP = async (req: Request, res: Response) => {
  res.json("verifyOTP route");
};

const createResetSession = async (req: Request, res: Response) => {
  res.json("createResetSession route");
};

const resetPassword = async (req: Request, res: Response) => {
  res.json("resetPassword route");
};

module.exports = {
  register,
  login,
  getUser,
  updateUser,
  generateOTP,
  verifyOTP,
  createResetSession,
  resetPassword,
};
