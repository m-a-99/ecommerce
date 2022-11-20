const mongoose = require('mongoose')
const fs = require('fs')
const bcrypt = require('bcrypt')
const { user, product, shop, files, orders } = require('../models/mongodb.js')

async function get_user_by_google_id(id) {
    try {
        let _user = await user.findOne({ google_id: id })
        return _user
    }
    catch (e) {
        console.log(e)
    }

}

async function create_new_google_user(profile) {
    try {
        let _user = new user({ google_id: profile.id, username: profile.displayName, firstname: profile.name.givenName, lastname: profile.name.familyName })
        await _user.save()
        return _user
    }
    catch (e) {
        console.log(e)
    }

}
async function get_user_by_id(_id) {
    try {
        let _user = await user.findById(_id, { password: 0 })
        // console.log(_user)
        return _user
    }
    catch (e) {
        console.log(e)
    }
}

async function getproduct(page, limit) {
    try {
        const q = await (await product.find({}).skip((page - 1) * limit).limit(limit)).map(e => {
            e.img = "http://192.168.0.7:3000" + e.img
            return e;
        });
        return q;
    }
    catch (e) {
        console.log(e)
    }

}

async function getShops() {
    try {
        const result = await shop.find({});
        return result;
    }
    catch (e) {
        console.log(e)
    }

}


async function create_new_user(firstName, lastName, email, password) {
    try {
        const _user = new user({ firstName, lastName, email, password })
        await _user.save();
        return _user
    }
    catch (e) {
        console.log(e)
    }
}

async function get_user_by_email(email) {
    try {
        const _user = await user.findOne({ email })
        return _user
    }
    catch (e) {
        console.log(e)
    }
}

async function getUserInfo(id) {
    try {
        const _info = await user.findById(id, { password: 0 })
        return _info
    }
    catch (e) {
        console.log(e)
    }
}

async function createOrUpdateFile(file_id, path, mimetype, originalname, access, access_users) {
    try {
        if (file_id) {
            const file = await get_file_by_id(file_id)
            if (file) {
                fs.unlinkSync(file.path);
                await files.deleteOne({ _id: mongoose.Types.ObjectId(file_id) })
            }

        }
        const _file = new files();
        path && (_file.path = path)
        mimetype && (_file.mimetype = mimetype)
        originalname && (_file.originalname = originalname)
        access && (_file.access_type = access)
        access_users && (_file.access_users = access_users)
        await _file.save()
        return _file;
    }
    catch (e) {
        console.log(e)
    }
}
async function updateprofile_img_firstname_lastname_email_bio(id, fileInfo, firstName, lastName, email, bio) {
    try {

        const _user = await user.findById(id, { password: 0 })
        if (fileInfo) {
            const { path, mimetype, originalname } = fileInfo
            const _file = await createOrUpdateFile(_user.img, path, mimetype, originalname, "public", null)
            _file && (_user.img = _file._id)
        }
        firstName && (_user.firstName = firstName);
        lastName && (_user.lastName = lastName);
        email && (_user.email = email);
        bio && (_user.bio = bio);
        await _user.save()
        return _user

    }
    catch (e) {
        console.log(e)
    }
}

// async function check_private_file_access(userId, fileId) {
//     try {
//         const _file_access_user = await files.findOne({_id: mongoose.Types.ObjectId(fileId), "access_users.user_id": mongoose.Types.ObjectId(userId) })
//         if (_file_access_user) {
//             return { access: true }
//         }
//         else {
//             return { access: false, err: "you dont have access on this file" }
//         }
//     } catch (e) {
//         console.log(e)
//     }
// }

async function get_file_by_id(id) {
    try {
        const _file = await files.findById(id)
        return _file;
    }
    catch (e) {
        console.log(e)
    }
}
// async function check_file_access(fileId) {
//     try {
//         const _file_access = await files.findOne({_id: mongoose.Types.ObjectId(fileId) })
//         if (!_file_access) {
//             return { access: false, msg: "access not found" };
//         }
//         if (_file_access?.access_type === "public") {
//             return { accessType: "public" }
//         }
//         if (_file_access?.access_type === "private") {
//             return { accessType: "private" }
//         }
//     }
//     catch (e) {
//         console.log(e)
//     }

// }



async function add_contact(userId, title, number) {
    try {
        const _user = await user.findById(userId, { password: 0 })
        _user.contacts.push({ title, number })
        await _user.save()
        return _user
    } catch (e) {
        console.log(e)
    }

}

async function delete_contact(user_id, contact_id) {
    try {
        const _user = await user.findById(user_id, { password: 0 });
        _user.contacts = _user.contacts.filter(e => e._id.toString() !== contact_id.toString())
        await _user.save()
        return _user
    } catch (e) {
        console.log(e)
    }
}

async function add_address(user_id, type, address) {
    try {
        const _user = await user.findById(user_id, { password: 0 });
        _user.addresses.push({ type, address })
        _user.save()
        return _user
    } catch (e) {
        console.log(e)
    }
}
async function delete_address(user_id, address_id) {
    try {
        const _user = await user.findById(user_id, { password: 0 });
        _user.addresses = _user.addresses.filter(e => e._id.toString() !== address_id.toString())
        await _user.save();
        return _user
    } catch (e) {
        console.log(e)
    }
}

async function change_password(user_id, oldpassword, newpassword, confpassword) {

    try {
        const _user = await user.findById(user_id);
        const chechpassword = bcrypt.compareSync(oldpassword, _user.password);
        if (!chechpassword) {
            return { err: true, msg: "old password wrong" }
        }
        if (newpassword.length < 6) {
            return { err: true, msg: "new password must be more then 6 characters" }
        }
        if (newpassword !== confpassword) {
            return { err: true, msg: "new password dose not match confpassword" }
        }
        const saltRounds = Number.parseInt(process.env.saltRounds)
        const hash = bcrypt.hashSync(newpassword, saltRounds);
        _user.password = hash
        await _user.save();
        return { err: false, msg: "password changed successfuly" }


    } catch (e) {
        console.log(e)
    }
}
async function getOrders(user_id) {
    try {
        const _orders = await orders.aggregate([
            { "$match": { "user_id": user_id } },
            {
                "$lookup": {
                    "from": "order_item",
                    "localField": "_id",
                    "foreignField": "order_id",
                    "as": "order_items",
                    "pipeline": [{
                        "$lookup": {
                            "from": "product",
                            "localField": "product_id",
                            "foreignField": "_id",
                            "as": "product_info"
                        }
                        
                    }, { "$unwind":"$product_info"}]
                }
            },
            {
                "$lookup": {
                    "from": "user",
                    "localField": "user_id",
                    "foreignField": "_id",
                    "as": "user",
                }
            },
            { "$unwind": "$user" },
            {
                "$addFields": {
                    "shipping_address": {
                        "$filter": {
                            "input": "$user.addresses",
                            "as": "address",
                            "cond": { "$eq": ["$$address._id", "$shipping_address"] },
                        }
                    }
                }
            },
            {
                "$addFields": {
                    "billing_address": {
                        "$filter": {
                            "input": "$user.addresses",
                            "as": "address",
                            "cond": { "$eq": ["$$address._id", "$billing_address"] },
                        }
                    }
                }
            }

            , { "$unwind": "$billing_address" },
            { "$unwind": "$shipping_address" },
            { "$project": { "user": 0 } },
            { "$sort": { "createdAt": -1 } }

        ])
        return _orders
    } catch (e) {
        console.log(e)
    }
}
module.exports = {
    get_user_by_google_id,
    create_new_google_user,
    get_user_by_id,
    getproduct,
    getShops,
    create_new_user,
    get_user_by_email,
    getUserInfo,
    updateprofile_img_firstname_lastname_email_bio,
    add_contact,
    delete_contact,
    get_file_by_id,
    add_address,
    delete_address,
    change_password,
    getOrders
}