const cloudinary = require("../configs/cloudinary");

const uploadService = {};

uploadService.upload = async (path) => {
  const { secure_url } = await cloudinary.uploader.upload(path, {
    folder: "hop",
    use_filename: true,
  });
  return secure_url;
};

module.exports = uploadService;
