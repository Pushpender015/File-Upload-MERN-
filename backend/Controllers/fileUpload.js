const File = require("../Models/File");
const cloudinary = require("cloudinary").v2;
const fs = require('fs');

/* -----local File Upload -> Handler Function----- */

exports.localFileUpload = async (req , res) => {
    try {
        // fetch file from req ( which is send by user )
        const file = req.files.file;
        console.log("file: " , file);

        // create path where file need to be stored on server
        // __dirname => shows current directory ( till current folder name )
        let path = __dirname + "/files" + Date.now() + `.${file.name.split('.')[1]}`;     // extract file extention from file name
        console.log("Path:- " , path); 
        // create directory if it does not exist
        const dir = __dirname + "/files";
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        // add path to the move function
        // add path to the move function
        file.mv(path , (err) => {
            console.log(err);
        });

        // create a successful response
        res.json({
            success: true,
            message: 'Local File Uploaded Successfully'
        });

    }
    catch(err) {
        console.log(err);
    }
}

/*  -------------- DIRECTLY UPLOAD FILES ------------------------ */

    // checking fileType are supported or not (means file  are in image format or not)
function isFileTypeSupported(type , supportedTypes) {
    return supportedTypes.includes(type);
}

    // upload files to cloudinary function
async function uploadFileToCloudinary(file , folder) {
    const options = {folder};
    console.log("temp file: " , file.tempFilePath);
    // set resource type auto
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath , options);
}

    /* -----Image upload -> Handler Function----- */
exports.imageUpload = async (req , res) => {
    try {
        // data fetch
        const {name , tags , email} = req.body;
        console.log(name , tags , email);

        // data of file
        const file = req.files.imageFile;
        console.log("file: " , file);

        // validation (uploaded document are image or not)
        const supportedTypes = ["jpg" , "jpeg" , "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        console.log("fileType: " , fileType);

            // match "fileType" are one of "supportedTypes"
        if(!isFileTypeSupported(fileType , supportedTypes))
            // if not match    
        {
            return res.status(400).json({
                success: false,
                message:'File format not supported',
            })
        }

            // if file format are matched
        const response = await uploadFileToCloudinary(file , "pcc");
        
        console.log("response: " , response);

        // data save into DB
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl:response.secure_url
        })

        console.log("fileData: " , fileData);

        res.json({
            success: true,
            fileUrl: response.secure_url,
            message: "image successfully upload"
        })

    }
    catch(err) {
        console.error(err);
        res.status(404).json({
            success: false,
            message: "Something went wrong"
        })
    }
}


    /* -----video upload -> Handler Function----- */

exports.videoUpload = async (req , res) => {
    try {
        // data fetch
        const {name , tags , email} = req.body;
        console.log(name , tags , email);

        // file data ( just like video )
        const file = req.files.videoFile;

        // validation
            // support types
        const supportedTypes = ["mp4" , "mov"];
            // extract file format ( type )
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("file type: " , fileType);

            // TODO : add a upper limit of 5MB for video
            /* ?? */
            // check file type support or not
        if(!isFileTypeSupported(fileType , supportedTypes)) {
            // not support
            return res.status(400).json({
                success: false,
                message: 'File format not support'
            })
        }
        console.log("ready to upload on cloudinary");

        // upload on cloudinary
        const response = await uploadFileToCloudinary(file , "pcc");
        console.log("response: " , response);

        // database entry create
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl:response.secure_url
        })

        res.status(200).json({
            success: true,
            fileUrl: response.secure_url,
            message: 'video successfully upload'
        })

    }
    catch(err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: "something went wrong"
        })
    }
}

/*---------- RREDUCED FILE HANDLER FUNCTION ----------------- */


    // this is for reduced file size function
async function uploadReducedFileToCloudinary(file, folder, quality, maxSize) {
    // Initialize options with the target folder and set the resource type to "auto"
    const options = {
        folder: folder,
        resource_type: "auto"
    };
    
    console.log("Temporary file path:", file.tempFilePath);
    
    // Check if the file size is within the maximum allowed size.
    if (file.size <= maxSize) {
        // If a quality value is provided, add it to options.
        if (quality) {
        options.quality = quality;
        // Optionally, you can set a chunk_size limit; this doesn't change the file's quality,
        // but can help manage the upload process for larger files.
        options.chunk_size = maxSize;
        }
        // Upload the file using Cloudinary's uploader.
        return await cloudinary.uploader.upload_large(file.tempFilePath, options);
    } 
    else {
        // If the file is larger than the allowed size, log an error and throw an exception.
        const errorMsg = `File size (${file.size} bytes) is more than the max allowed size (${maxSize} bytes).`;
        console.error(errorMsg);
        throw new Error(errorMsg);
    }
}
      


    /* -----reduced image upload -> Handler Function----- */

exports.imageReducer = async (req , res) => {
    try {
        // data fetch
        const {name , tags , email} = req.body;
        console.log(name , tags , email);

        // data of file
        const file = req.files.imageFile;
        console.log("file: " , file);

        // validation (uploaded document are image or not)
        const supportedTypes = ["jpg" , "jpeg" , "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        console.log("fileType: " , fileType);

            // TODO : add a upper limit of 5MB for video
        const maxSize = 1000000 // 1mb
            // match "fileType" are one of "supportedTypes"
        if(!isFileTypeSupported(fileType , supportedTypes))
            // if not match    
        {
            return res.status(400).json({
                success: false,
                message:'File format not supported',
            })
        }

            // if file format are matched
        const response = await uploadReducedFileToCloudinary(file , "pcc" , 90 , maxSize); // {file , cloud. folder , % reduce , maxsize}
        
        console.log("response: " , response);

        // data save into DB
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl:response.secure_url
        })

        console.log("fileData: " , fileData);

        res.json({
            success: true,
            fileUrl: response.secure_url,
            message: "image successfully upload"
        })

    }
    catch(err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: "something went wrong"
        })
    }
} 

    /* -----reduced video upload -> Handler Function----- */

exports.videoReducer = async (req , res) => {
    try {
        // data fetch
        const {name , tags , email} = req.body;
        console.log(name , tags , email);

        // file data ( just like video )
        const file = req.files.videoFile;

        // validation
            // support types
        const supportedTypes = ["mp4" , "mov"];
            // extract file format ( type )
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("file type: " , fileType);

            // TODO : add a upper limit of 5MB for video
        const maxSize = 6000000; // 5mb
            // check file type support or not
        if(!isFileTypeSupported(fileType , supportedTypes)) {
            // not support
            return res.status(400).json({
                success: false,
                message: 'File format not support'
            })
        }
        console.log("ready to upload on cloudinary");

        // upload on cloudinary
        const response = await uploadReducedFileToCloudinary(file , "pcc" , 90 , maxSize);     // {file , cloud. folder , % reduce , maxsize}
        console.log("response: " , response);

        // database entry create
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl:response.secure_url
        })

        res.status(200).json({
            success: true,
            fileUrl: response.secure_url,
            message: 'video successfully upload'
        })

    }
    catch(err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: "something went wrong"
        })
    }
}

 
