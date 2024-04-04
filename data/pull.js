// Import the Airtable package
const Airtable = require('airtable');
const fs = require('fs');

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
}).eachPage((records, fetchNextPage) => {

    // Process the records
    records.forEach((record) => {
       record.fields.objectID = record.id;
       data.push(record.fields);
    });

    // Fetch the next page of records, if any
    fetchNextPage();
    
}, (err) => {
    if (err) {
        console.error('Error fetching records:', err);
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

