// controllers/UserController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();  
const JWT_SECRET = process.env.JWT_SECRET;
// Create a new user
export const registerUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Check if user already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      email,
      passwordHash,
    });

    // Save user to the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    user.jwtToken = token;
    await user.save();

    // Send token and user ID in the response
    res.json({ token, user_id: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



