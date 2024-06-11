const { getUser } = require("../services/auth");

function checkForAuthentication(req, res, next) {
    const authorizationHeaderValue = req.headers["authorization"];

    req.user = null;
    if (!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer ")) {
        return next();
    }

    const token = authorizationHeaderValue.split("Bearer ")[1];
    const user = getUser(token);
    console.log("handleGetUserProfile", user._id);

    req.user = user;
    return next();
}

function restrictTo(roles) {
    return function (req, res, next) {
        if (!req.user) return res.status(401).json({ message: "UnAuthorized request" });

        if (!roles.includes(req.user.role)) return res.status(403).json({ message: "UnAuthorized request" });
        return next();
    };
}

module.exports = {
    checkForAuthentication,
    restrictTo
};
