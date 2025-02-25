const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    fileUrl: {
        type: String, 
    },
    tags: {
        type:String,
    },
    email: {
        type: String,
    }

});

// post middleware
fileSchema.post("save" , async function(doc) {
    try {
        console.log("DOC: " , doc)

        // transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
        });

        // send mail
        let info = await transporter.sendMail({
            from: `swotfiction`,
            to: doc.email,
            subject: "File Uploaded on Cloudinary",
            html: `<h2>Hello ${doc.name}</h2> 
                    <p>Your file has been uploaded 
                    <br>
                    <br> 
                    View here: <a href="${doc.fileUrl}">${doc.fileUrl}</a> 
                    </p>`
        })

        console.log("info: " , info);
    }
    catch(err) {
        console.log(err);
    }
})

const File = mongoose.model('File', fileSchema);

module.exports = File;