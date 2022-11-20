const { verify_token } = require("../controllers/auth_controller");
const { get_user_by_id } = require("../controllers/mongodb_controller");

async function header_check_auth(req, res, next) {
    const { authorization: token } = req.headers || {};
    if (!token) {
        res.status(404).json({ err: true, protected: true, token: "none", msg: "this route is protected user must login to proceed" })
    }
    else {
        let _token=token.split(" ")
        let decoded_token = verify_token(_token[1]);
        // console.log(decoded_token)
        if (decoded_token.err) {
            res.status(404).json({ err: true, protected: true, msg: decoded_token.messagee });
        } else {
            const _user = await get_user_by_id(decoded_token.id);
            req.user = _user;
            next()
        }

    }

}
module.exports = { header_check_auth };