const { cloudinary } = require("../middlewares/cloudinary")

const uploadToCloudinary = (file, folder) => new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder }, (error, result) => {
        if (error) {
            reject(error)
            return
        }

        resolve({
            url: result.secure_url,
            public_id: result.public_id
        })
    }).end(file.buffer)
})

module.exports = {
    uploadToCloudinary
}
