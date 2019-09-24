// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const {Storage} = require('@google-cloud/storage');

const storage = new Storage();
const bucketName = 'image-uploader-97673.appspot.com';

admin.initializeApp();

// function to delete oldest item from storage bucket once maximum items exceeded
exports.deleteOldestAtMax = functions.storage.object().onFinalize(async (object) => {
  
  // retrieve all files from storage bucket
  const [files] = await storage.bucket(bucketName).getFiles();

  // function to collect name and time metadata from files and store in list
  async function metadata(files) {
    
    let items = [];

    await Promise.all(files.map(async (file) => {

      const [metadata] = await storage
        .bucket(bucketName)
        .file(file.name)
        .getMetadata();
      
      let item_object = { name: metadata.name, updated: metadata.updated };

      items.push(item_object);
    }));

    return items
  }

  // call funciton to retrieve required metadata from files
  let items = await metadata(files)

  // sorting function
  var sort_by = function(field, reverse, primer){
    var key = function (x) {return primer ? primer(x[field]) : x[field]};

    return function (a,b) {
      var A = key(a), B = key(b);
      // eslint-disable-next-line no-implicit-coercion
      return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];                  
    }
  }

 // call sorting function to sort list of metadata objects by time updated
  items.sort(sort_by('updated', true, (a) => {return a.toUpperCase()}))

  // if number of files exceeds X, delete oldest file
  if (items.length > 10){
    await storage
    .bucket(bucketName)
    .file(items[0].name)
    .delete();
    console.log('item deleted')
  }

 

});