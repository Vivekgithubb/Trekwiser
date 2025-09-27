import multer from "multer";

//general configuration for multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp') //place where files need to be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //keep the filename as original
  }
})

export const upload = multer({
    storage
})