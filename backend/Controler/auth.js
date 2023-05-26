var users = require("../Models/Users");
var bcrypt = require("bcrypt");
var { createjwts } = require("../Utils/JWTs");
module.exports.Register = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    old = await users.findOne({ Email });
    if (old) {
      return await res.json("already exists");
    }
    newPassword = await bcrypt.hash(Password, 12);
    const newu = await users.create({ Email, Password: newPassword });
    await res.status("201").json(newu);
  } catch (err) {
    res.status("400").json(err);
  }
};
module.exports.Login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await users.findOne({ Email });
    if (!user) return res.status("404").json("user dose not exist");
    const match = await bcrypt.compare(Password, user.Password);
    if (!match) return res.status("203").json("password dose not exist");
    const AccessTokens = createjwts(user, "Access key", "1d");
    const RefreshTokens = createjwts(user, "Refersh Key", "1d");
    res.cookie("AccessTokens", AccessTokens, {
      MaxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
      httpOnly: true
    });
    res.cookie("RefreshTokens", RefreshTokens, {
      MaxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
      httpOnly: true
    });
    res.status('200').json('Logged in');
  } catch (err) {
    res.status("400").json(err);
  }
};
module.exports.Logout = async (req, res) => {
  const user = req.user
  if (!user) return res.status("401").json("unAutherized")
  try {
    res.clearCookie("AccessTokens");
    res.clearCookie("RefreshTokens");
    res.status("200").json("logged out")
  }
  catch (err) {
    res.status("400").json(err)
  }
}
