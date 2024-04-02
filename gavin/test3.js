var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var errors = formidable.formidableErrors;

const server = http.createServer(async (req, res) => {
   if (req.url === '/picturefileupload' && req.method.toLowerCase() === 'post') {
      // parse a file upload
      const form = new formidable.IncomingForm();
      form.uploadDir = __dirname +'/upload/';
      form.on('file', function(field, file) {
         //rename the incoming file to the file's name
         console.log(file.originalFilename);
         console.log(file.filepath);
         fs.rename(file.filepath, form.uploadDir + "/" + file.originalFilename, function( error ){} );
               
      });

      //form.on('error', function(err) {
      //   console.log("an error has occured with form upload");
      //   console.log(err);
      //   req.resume();
      //});

      //form.on('aborted', function(err) {
      //   console.log("user aborted upload");
      //});

      form.on('end', function() {
         console.log('-> upload done');
      });

      
      let fields;
      let files;
      try {
         [fields, files] = await form.parse(req);
      } catch (err) {

         res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
         res.end(String(err));
         return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end("file uploaded!");
      //res.end(JSON.stringify({ fields, files }, null, 2));
      return;
   }

   // show a file upload form
   res.writeHead(200, { 'Content-Type': 'text/html' });
   res.end(`
      <h2> <code></code> </h2>
      <form action="/picturefileupload" enctype="multipart/form-data" method="post">
      
      <div>File: <input type="file" name="multipleFiles"  /></div>
      <input type="submit" value="Upload" />
      </form>
   `);
});
server.listen(5000, () => {
   console.log('Server listening on http://localhost:5000/ ...');
});