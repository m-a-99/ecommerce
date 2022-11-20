const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { create_new_user, get_user_by_email } = require('./mongodb_controller');

const secret = process.env.SECRET
const saltRounds = Number.parseInt(process.env.saltRounds)


function generate_token(data) {
    return jwt.sign({
        id: data
    }, secret, { expiresIn: '7d' });
}


function verify_token(token) {
    try {
        return jwt.verify(token, secret)
    }
    catch (e) {
        return { err: true, messagee: e.message }
    }
}

let maxAge =  60 * 60 * 24 * 7
async function post_login(req, res) {
    const { email, password } = req.body;
    const _user = await get_user_by_email(email);
    if (!_user) {
        res.status(404).json({ login: false, email: "there is no account with this email" })
    } else {
        const checkpass = bcrypt.compareSync(password, _user.password)
        if (!checkpass) {
            res.status(404).json({ login: false, password: "wrong password" })
        }
        else {
            const token = generate_token(_user._id)
            // res.cookie("jwt", token, {
            //     // httpOnly: true,
            //     maxAge: maxAge,
            //     sameSite: 'none',
            //     secure: true

            // });
            res.json({ login: true, token, maxAge })
        }
    }
}

async function post_sinup(req, res) {
    const { firstName, lastName, email, password, confirmationpassword } = req.body||{};
    const err = await validate(firstName || "", lastName || "", email || "", password || "", confirmationpassword || "");
    if (Object.keys(err).length > 0) {
        res.status(404).json({ signup: false, ...err })
    } else {
        const hash = bcrypt.hashSync(password, saltRounds);
        const _user = await create_new_user(firstName, lastName, email, hash);
        const token = generate_token(_user._id);
        // res.cookie("jwt", token, {
        //     // httpOnly: true,
        //     maxAge: maxAge,
        //     sameSite: 'none',
        //     secure:true

        // });
        res.json({ signup: true, token, maxAge })
    }
}



async function validate(firstName, lastName, email, password, confirmationpassword) {
    let err = {}
    if (firstName.length === 0) {
        err["firstName"] = "first name required";
    }
    if (lastName.length === 0) {
        err["lastName"] = "last name required";
    }
    if (!email.includes("@") && email.split("@").length !== 3) {
        err["email"] = "Invalid email"
    } else {
        const _user = await get_user_by_email(email);
        if (_user) {
            err["email"] = "this email is used in another account"
        }
    }

    if (password.length < 6) {
        err["password"] = "password must be more then 6 characters"
    }
    if (password !== confirmationpassword) {
        err["confirmationpassword"] = "confirmation password do not match password"
    }
    return err;
}



module.exports = { post_login, post_sinup,verify_token }
