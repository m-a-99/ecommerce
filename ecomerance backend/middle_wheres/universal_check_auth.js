const { verify_token } = require("../controllers/auth_controller");
const { get_user_by_id } = require("../controllers/mongodb_controller");

async function universal_check_auth(req, res, next) {
    const { jwt: cookie_token } = req.cookies || {}
    const { authorization: header_token } = req.headers || {};
    if (!cookie_token && !header_token) { res.status(404).json({ login: false, token: "none", msg: "this route is protected login to proceed" }) }
    else {
        const decoded_token = verify_token(cookie_token || header_token)
        if (decoded_token.err) {
            res.status(404).json({
                login: false,
                token: decoded_token.err.message
            })
        } else {
            const _user = await get_user_by_id(decoded_token.id)
            req.user = _user;
            next()
        }
    }
}


module.exports.universal_check_auth = universal_check_auth;

