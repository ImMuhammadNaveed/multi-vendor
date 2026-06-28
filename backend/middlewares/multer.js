const path = require("path")
const multer = require("multer")
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()+"-"+Math.round(Math.random()*1E9)
        cb(null, uniqueSuffix+"-"+file.originalname.replaceAll(" ", "-"))
    }
})
const upload = multer({storage: diskStorage})


module.exports = {
    upload
}