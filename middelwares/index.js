const fs = require(`fs`);

function logReqRes(filName) {
    return (req, res, next) => {
        fs.appendFile(filName, `\n${Date.now()} ${req.method} ${req.path}`, (error, data) => {
            next();
        });
    }
}


module.exports = {
    logReqRes,
};