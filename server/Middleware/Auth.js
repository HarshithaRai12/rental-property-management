const jwt = require("jsonwebtoken");

const SECRET_KEY = "product-crud";

const auth = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token, access denied"
      });
    }

    // Handle "Bearer token"
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Attach user info to request
    req.user = {
      id: decoded.id
    };

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

module.exports = auth;
// const jwt = require("jsonwebtoken");

// const SECRET_KEY = "product-crud";

// const auth = (req, res, next) => {
//   try {
//     const token = req.header("auth-token");

//     if (!token) {
//       return res.status(401).json({ message: "No token, access denied" });
//     }

//     const decoded = jwt.verify(token, SECRET_KEY);

//     req.userid = decoded.id;

//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = auth;