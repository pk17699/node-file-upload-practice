const http = require('http');
const formidable = require('formidable')
const fs = require('fs');
const path= require('path')


http.createServer((req, res) => {
    if (req.url == '/upload' && req.method == "POST") {
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            // console.log(files.profile.originalFilename);
            if (fields.username == "prashant" && fields.password == "pk17699") {
                // Store a File in my application
                var oldpath = files.filetoupload.filepath;
                var newpath = path.join(__dirname,'uploads') +"/"+ files.filetoupload.originalFilename;
                var rawdata = fs.readFileSync(oldpath);
                fs.writeFile(newpath, rawdata, (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
                res.write("Wecome to app");
                res.end();
            }
            else {
                res.write("Login denied");
                res.end();
            }
        })
    }
    else{
      res.write("Go to /upload for file uploading");
      res.end();
    }
}).listen(3000);
