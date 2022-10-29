const {User} = require('../../models/user')

const {RequestError} = require("../../helpers")

const path = require('path')

const fs = require('fs/promises')


const avaDir = path.join(__dirname, "../../", "public", "avatar")

const updateAvatar = async(req,res) => {
    const {path: tmpUpload, originalname} = req.file
    try {
        const resultUpload = path.join(avaDir, originalname)

        await fs.rename(tmpUpload, resultUpload)

        const avatarURL = path.join("public", "avatars", originalname)

        await User.findByIdAndUpdate(req.user._id, {avatarURL})

        req.status(200).json({avatarURL})

    } catch (error) {
        await fs.unlink(tmpUpload)
        throw RequestError(401, "Not authorized")
    }
}

module.exports = updateAvatar