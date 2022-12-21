import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";

//registering the user
export const register = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new user({
      firstname,
      lastname,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usr = await user.findOne({ email: email });
    if (!usr) return res.status(400).json({ message: "User does not exist." });

    //matchinng the password
    const isMatched = await bcrypt.compare(password, usr.password);
    if (!isMatched)
      return res.status(400).json({ message: "Password does not match." });

    const token = jwt.sign({ id: usr._id }, process.env.JWT_SECRET_TOKEN);
    delete usr.password;
    res.status(200).json({ token, usr });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
