import jwt from "jsonwebtoken"
import { Auth } from "../models/user.model.js";

export const registerAdmin = async (req, res, next) => {
  try {
    const { fullname, email, password, role } = req.body;

    const admin = await Auth.findOne({ email });

    if (!admin) {
      const data = new Auth({
        fullname: fullname,
        email: email,
        password: password,
        role: role
      });

      await data.save();
      return res.status(201).send("Created");
    }
    return res.status(409).send("User already exists!");
  } catch (error) {
    next(error);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const secretKey = process.env.SECRET_KEY;
    const { email, password } = req.body;

    const admin = await Auth.findOne({ email });

    console.log(admin)

    if (!admin || admin.role !== "admin") {
      return res.status(404).send("Not fouond!");
    } else if (admin.password !== password) {
      return res.status(403).send("Incorect password!");
    }

    const payload = {
        role: admin.role
    };

    const accessToken = jwt.sign(payload, secretKey, {expiresIn: "20m"});
    const refreshToken = jwt.sign(payload, secretKey, {expiresIn: "40m"})

    res.send({
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  } catch (error) {
    next(error);
  }
};
