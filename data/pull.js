// Import the Airtable package
const Airtable = require('airtable');
const fs = require('fs');
const axios = require('axios');

const downloadImage = async (url, filePath) => {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Error downloading the image:', error);
  }
};

const imageUrl = 'https://example.com/image.jpg';
const savePath = './downloaded_image.jpg';

// downloadImage(imageUrl, savePath)
//   .then(() => console.log('Image downloaded successfully'))
//   .catch((error) => console.error('Error downloading image:', error));

  
// Configure Airtable with your API key and base ID
const apiKey = 'pat0R6w6vgUFP7OOn.9af31cb8806b5e265543fbd112703af28edb9e80daa58361bd5b8abf78ba0b22';
const baseId = 'appEhl9LK9XQeU8Dr';
const tableName = 'tbl9w6lecKjkIiUe4';

// Initialize Airtable
const base = new Airtable({ apiKey: apiKey }).base(baseId);

const data = [];

// Fetch records from the specified table
base(tableName).select({
    // Add any filters or sorting options here
}).eachPage(async (records, fetchNextPage) => {

    var p = []
    // Process the records
    records.forEach((record) => {
       record.fields.objectID = record.id;
 
       if (record.fields.headshot && record.fields.headshot.length > 0) {
          let ext = record.fields.headshot[0].type.split('/')[1];
          let savePath = `./headshots/${record.fields.objectID}.${ext}`;
          record.fields.image = `${record.fields.objectID}.${ext}`;
          p.push(downloadImage(record.fields.headshot[0].url, savePath));
        }

        if (record.fields['Fall 2024']) {
          record.fields.statusTags = [ 'Fall 2024']
        } else {
          record.fields.statusTags = [ 'Past']
        }

        data.push(record.fields);
    });
 
    await Promise.all(p);

    // Fetch the next page of records, if any
    fetchNextPage();
    
}, (err) => {
    if (err) {
        console.error('Error fetching records:', err.message);
    }

    console.log('All done. You have a new output file.');
    
    fs.writeFile('./output2.json', JSON.stringify(data, ), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('JSON data saved to', data.length);
        }
    });
});

