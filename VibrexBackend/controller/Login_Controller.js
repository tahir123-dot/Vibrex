import { generateToken } from "../middleware/LoginMiddleware.js";

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (
      userName === process.env.LoginUserName &&
      password === process.env.Password
    ) {
      const token = generateToken(userName);

      return res.status(200).json({
        success: true,
        message: "Login successfully",
        token: token,
      });
    }

    return res
      .status(401)
      .json({ success: false, message: "Invalid Credientials" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

export default login;
