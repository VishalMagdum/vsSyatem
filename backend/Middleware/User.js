const { createjwts, verifyjwts } = require("../Utils/JWTs")

module.exports.getUser = (req, res, next) => {
  const { AccessTokens, RefreshTokens } = req.cookies
  if (!RefreshTokens) return next()
  const user = verifyjwts(AccessTokens, "Access key")
  if (user) {
    req.user = user
    return next()
  }
  const re = verifyjwts(RefreshTokens, "Refersh Key")
  if (!user) {
    if (!re) return next()
    const AccessTokens = createjwts(re, "Access key", "10s");
    const RefreshTokens = createjwts(re, "Refersh Key", "10m");
    res.cookie("AccessTokens", AccessTokens, {
      MaxAge: 60 * 10000,
      sameSite: 'none',
      secure: true,
      httpOnly: true
    });
    res.cookie("RefreshTokens", RefreshTokens, {
      MaxAge: 60 * 600000,
      sameSite: 'none',
      secure: true,
      httpOnly: true
    });
    const user = verifyjwts(AccessTokens, "Access key")
    req.user = user
    return next()
  }
}