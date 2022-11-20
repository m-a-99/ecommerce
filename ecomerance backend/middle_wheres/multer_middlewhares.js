const { upload, multer } = require("../multer/multerSetup");

function updateprofile_img_firstname_lastname_email_bio_api_middlewhare(req,res,next){
    upload.single("profileimg")(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            res.status(404).json({ err: true, msg: err.message })
        } else if (err) {
            res.status(404).json({ err: true, msg: err.message })

        }
        next() 
    })
}

function multer_parse_body(req, res, next) {
    upload.none()(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            res.status(404).json({ err: true, msg: err.message })
        } else if (err) {
            res.status(404).json({ err: true, msg: err.message })

        }
        next()
    })
}


module.exports = { updateprofile_img_firstname_lastname_email_bio_api_middlewhare, multer_parse_body };