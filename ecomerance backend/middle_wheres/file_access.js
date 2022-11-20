const {  get_file_by_id } = require("../controllers/mongodb_controller");
const { universal_check_auth } = require("./universal_check_auth");

async function file_access(req, res, next) {
  // const fileId = req.params.fileId;

  // const _file_access_type = await check_file_access(fileId);

  // if (_file_access_type.accessType === "public") {
  //   const _file = await get_file(fileId);
  //   req.fileInfo = _file
  //   next()
  // }
  // else {

  //   await universal_check_auth(req, res, async () => {
  //     const private_file_access = await check_private_file_access(req.user._id, fileId)
  //     if (private_file_access.access) {
  //       const _file = await get_file(fileId);
  //       req.fileInfo = _file
  //       next()
  //     } else {
  //       res.status(404).json(private_file_access)

  //     }
  //   })
   
  
  // }

  const fileId = req.params.fileId;
  const file = await get_file_by_id(fileId);
  if (!file) {
    return res.status(404).json({ err: true, msg: "file not found" })
  }
  if (file.access_type === "public") {
    req.fileInfo = file
    return next()
  }
  await universal_check_auth(req, res, async () => {
    const user_access = file.access_users.some(e =>  e.user_id.toString() === req.user._id.toString())
    if (user_access) {
      req.fileInfo = file
      return  next()
    } else {
      return res.status(404).json({ err: true, msg: "access denied" })
    }
  })

}


module.exports.file_access = file_access