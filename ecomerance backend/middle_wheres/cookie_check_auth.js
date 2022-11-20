const { verify_token } = require("../controllers/auth_controller");
const { get_user_by_id } = require("../controllers/mongodb_controller");

async function cookie_check_auth(req, res, next) {

    // if(!req.user){
    //     res.redirect("/auth/login");
    // }
    // else{
    //     next()
    // }
    const { jwt: token } = req.cookies ||{}
    if (!token) {res.status(404).json({ login: false, token: "none",msg:"this route is protected login to proceed" })}
    else{
        const decoded_token = verify_token(token)
        if (decoded_token.err) {
            res.status(404).json({
                login: false,
                token: decoded_token.err.message
            })
        }else{
            // console.log(decoded_token)
            const _user = await get_user_by_id(decoded_token.id)
            req.user = _user;
            next()
        }
     
    }
}


module.exports.cookie_check_auth = cookie_check_auth;

