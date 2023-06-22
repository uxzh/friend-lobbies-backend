const cloudinary = require('cloudinary').v2;



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});


async function cloudinaryUpload(filepath){
    try{
        const res = await cloudinary.uploader.upload(filepath)
        return  res.secure_url
    }catch(err){
        throw(err)
    }
}


module.exports = cloudinaryUpload