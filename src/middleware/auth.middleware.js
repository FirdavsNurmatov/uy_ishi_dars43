import jwt from "jsonwebtoken";

export function roleGuard(req, res, next) {
  try {
    const payload = req.headers?.authorization.split(" ")[1];
    const secretKey = process.env.SECRET_KEY;

    if (!jwt.verify(payload, secretKey)) {
      return res.status(403).send({
        status: "FORBIDDEN",
        msg: "Ushbu ma'lumotlarga huquqi yo'q",
      });
    }

    next();
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
}
