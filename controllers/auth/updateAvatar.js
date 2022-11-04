const {User} = require('../../models/user')

const path = require('path')

const fs = require('fs/promises')

const Jimp = require('jimp');


const avaDir = path.join(__dirname, "../../", 'public/avatars')

const updateAvatar = async(req,res) => {
    const { _id } = req.user;

    const { path: tempUpload, originalname } = req.file;

    const extention = originalname.split('.').pop();

    const fileName = `${_id}.${extention}`;

        Jimp.read(tempUpload, (err, file) => {
        if (err) throw err;
        file
            .resize(250, 250) 
            .quality(60) 
            .write(`./public/avatars/${fileName}`); 
        });

    const resultUpload = path.join(avaDir, fileName);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", fileName);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({avatarURL})
}

module.exports = updateAvatar