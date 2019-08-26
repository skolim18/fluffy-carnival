const config = require('../config');
const fs = require('fs');
 
exports.addImage = img => {
    const imageData = fs.readFileSync(__dirname + '\\static\\assets\\images\\image.png');

    // Create an Image instance
    const image = new Image({
        type: 'image/png',
        data: imageData
    });

    // Store the Image to the MongoDB
    image.save();
};