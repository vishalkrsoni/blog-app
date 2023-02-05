const dotenv = require("dotenv");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

dotenv.config();

// configuring  aws instance
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const Bucket = process.env.AWS_BUCKET_NAME;
const s3 = new aws.S3();

// configuring for multer
const uploadImageTos3 = multer({
  storage: multerS3({
    bucket: Bucket,
    s3: s3,
    key: (req, photo, cb) => {
      cb(null, Date.now() + photo.originalname);
    },
  }),
});

module.exports = {
  uploadImageTos3,
};
