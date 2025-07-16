//const sessionIdToUser = new Map();
const jwt = require("jsonwebtoken");
const secret = "Nh@30*";

function setUser(user) {
    if (!user || !user._id || !user.email) {
      throw new Error("Invalid user object");
    }
  
    return jwt.sign({
      id: user._id,
      email: user.email
    }, secret);
  }
  
function getUser(token) {
    if(!token) 
        return null;
    try{
    return jwt.verify(token, secret);
    }
    catch(err) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
};