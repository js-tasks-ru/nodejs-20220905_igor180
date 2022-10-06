const lss = require('./LimitSizeStream');
const fs = require('fs');

module.exports = function OneMB_file_saver(filepath, req, res){
  
    const limStream = new lss({limit: 1024*1024});
          
    const stream = fs.createWriteStream(filepath, {flags: 'wx'});

    req.pipe(limStream).pipe(stream);

    limStream.on('error', (error) => {
    
        if (error.code === 'LIMIT_EXCEEDED'){

            
            res.statusCode = 413;
            res.end('file is bigger then 1MB');

            fs.unlink(filepath);
            
        }
    });

    stream.on('error', (error) => {
        if (error){
            if (error.code === 'ENOENT'){
            
                res.statusCode = 404;
                res.end('file not found');
            
            } else if(error.code === 'EEXIST'){

                res.statusCode = 409;
                res.end('такой файл уже есть');

            } else {

                fs.unlink(filepath);
                res.statusCode = 500;
                res.end('something went wrong');
            }
        }
    });


    req.on('aborted', () => {

        fs.unlink(filepath);

    });


    stream.on('finish', (err) => {
        if (!err){
            res.statusCode = 201;
            res.end('файл записан');
        }
    });


      
};