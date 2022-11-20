const { getproduct, get_user_by_id, getShops, getUserInfo, updateprofile_img_firstname_lastname_email_bio, add_contact, delete_contact, add_address, delete_address, change_password ,getOrders} = require("./mongodb_controller")


async function getProducts_api(req, res) {
    res.send(await getproduct(Number.parseInt(req.query.page), Number.parseInt(req.query.limit)))
}
async function getShops_api(req, res) {

    res.send(await getShops())
}

async function getprofile_api(req, res) {
    res.send(await get_user_by_id(req.user.id))

}

async function getUserInfo_api(req, res) {
    res.json(await getUserInfo(req.user._id))
}


async function updateprofile_img_firstname_lastname_email_bio_api(req, res) {
    const { firstName, lastName, email, bio } = req.body || {};
    const _user = await updateprofile_img_firstname_lastname_email_bio(req.user._id, req.file, firstName, lastName, email, bio)
    res.json(_user)
}

async function file_api(req, res) {
    res.sendFile(req.fileInfo.path)
}

async function add_contact_api(req, res) {
    const _user = await add_contact(req.user._id, req.body.title, req.body.number)
    res.json(_user);
}

async function delete_contact_api(req,res){
    const _user = await delete_contact(req.user._id,req.body.contact_id)
    res.json(_user)
}
async function add_address_api(req,res){
    const _user = await add_address(req.user._id,req.body.type,req.body.address);
    res.json(_user)
}
async function delete_address_api(req,res){
    const _user = await delete_address(req.user._id,req.body.address_id);
    res.json(_user)
}
async function change_password_api(req,res){
    const { oldPassword,newPassword,c}=req.body||{}
    const _res = await change_password(req.user._id, oldPassword, newPassword, newPassword);
    res.json(_res);
}
async function getOrders_api(req,res){
    const _orders=await getOrders(req.user._id)
    res.json(_orders)
} 

module.exports = {
    getProducts_api,
    getShops_api,
    getprofile_api,
    getUserInfo_api,
    updateprofile_img_firstname_lastname_email_bio_api,
    file_api,
    add_contact_api,
    delete_contact_api,
    add_address_api,
    delete_address_api,
    change_password_api,
    getOrders_api
}