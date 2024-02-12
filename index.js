const fs = require('fs');
const path = require('path');

const folderPath = './metadata'; 

const collectionName = "SNOWSTUDIOS";

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  files.forEach(file => {
    if (path.extname(file) === '.json') {
      const filePath = path.join(folderPath, file);
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }

        try {
          const jsonContent = JSON.parse(data);
          delete jsonContent.creators;
          delete jsonContent.category;
          delete jsonContent.edition;
          delete jsonContent.properties;
          delete jsonContent.external_url;
          delete jsonContent.seller_fee_basis_points;
          jsonContent.collection = collectionName;

          const modifiedData = JSON.stringify(jsonContent, null, 2);
          fs.writeFile(filePath, modifiedData, 'utf8', err => {
            if (err) {
              console.error('Error writing file:', err);
              return;
            }
            console.log(`Successfully edited ${file}`);
          });
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      });
    }
  });
});
