const fs = require('fs');

module.exports = function deleteFile (dirfile, res){ 
    fs.unlink(dirfile, (err) => {

      if (err) {
        
        if (err.code === 'ENOENT') {

          res.statusCode = 404;
          res.end('файн не найден');

        } else {

          res.statusCode = 500;
          res.end('что-то пошло не так');
        };

      } else {

        res.statusCode = 200;
        res.end('файл удален');

      };

    });
};
