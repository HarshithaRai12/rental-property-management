// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function(req,file,cb){
//     cb(null,'Uploads/')
//   },
//   filename: function(req,file,cb){
//     cb(null,file.fieldname + '-' + Date.now())
//   }
// })

// const upload = multer({storage:storage})
// module.exports = upload; 
// the above code is for the local storage

const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage
});

module.exports = upload;