import { validateLogin, validateRegister } from "../middleware/validation.js";
import bcryptjs from "bcryptjs";
import User from "../models/User.js";
export const register = async (req, res) => {
  try {
    const { error, value } = validateRegister(req.body);
    if (error) {
      return res.status(400).send(error);
    }

    const {
      firstName,
      lastName,
      email,
      password,
      location,
      description,
      occupation,
    } = value;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash(password, saltRounds);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      location,
      description,
      occupation,
    });
    await newUser.save();
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration failed:", error);

    return res.status(500).json({
      message: "An unexpected error occurred",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { error, value } = validateLogin(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { email, password } = value;

    const dbUser = await User.findOne({ email }).select("+password");

    if (!dbUser) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcryptjs.compare(
      password,
      dbUser.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    return res.status(200).json({
      message: "Credentials verified",
      user: {
        id: dbUser._id,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        email: dbUser.email,
      },
    });
  } catch (error) {
    console.error("Login failed:", error);

    return res.status(500).json({
      message: "An unexpected error occurred",
    });
  }
};
