// dependencies
const AWS = require("aws-sdk");
const util = require("util");
const sharp = require("sharp");
const path = require("path");

// get reference to S3 client
const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  // Read options from the event parameter.
  console.log(
    "Reading options from event:\n",
    util.inspect(event, { depth: 5 })
  );

  const srcBucket = event.Records[0].s3.bucket.name;
  // Object key may have spaces or unicode non-ASCII characters.
  const srcKey = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );

  //return from here if secondary (recursive) invocation.
  //Need to use a diffferent bucket or figure out the best way to handle this.
  //proceed only if these are home photos
  if (srcKey.indexOf("resized_") > -1 || srcKey.indexOf("home_photo_") == -1) {
    console.log("Not a home photo or triggered on resized image!");
    return;
  }

  const dstBucket = srcBucket;
  const dstKey =
    path.dirname(srcKey) + "/" + "resized_" + path.basename(srcKey);

  // Infer the image type from the file suffix.
  const typeMatch = srcKey.match(/\.([^.]*)$/);
  if (!typeMatch) {
    console.log("Could not determine the image type.");
    return;
  }

  // Check that the image type is supported
  const imageType = typeMatch[1].toLowerCase();
  if (imageType != "jpg" && imageType != "jpeg" && imageType != "png") {
    console.log(`Unsupported image type: ${imageType}`);
    return;
  }

  // Download the image from the S3 source bucket.

  try {
    const params = {
      Bucket: srcBucket,
      Key: srcKey,
    };
    var origimage = await s3.getObject(params).promise();
  } catch (error) {
    console.log(error);
    return;
  }

  // set thumbnail width. Resize will set the height automatically to maintain aspect ratio.
  const width = 200;

  // Use the sharp module to resize the image and save in a buffer.
  try {
    var buffer = await sharp(origimage.Body).rotate().resize(width).toBuffer();
  } catch (error) {
    console.log(error);
    return;
  }

  // Upload the thumbnail image to the destination bucket
  try {
    const destparams = {
      Bucket: dstBucket,
      Key: dstKey,
      Body: buffer,
      ContentType: "image",
    };

    const putResult = await s3.putObject(destparams).promise();
  } catch (error) {
    console.log(error);
    return;
  }

  console.log(
    "Successfully resized " +
      srcBucket +
      "/" +
      srcKey +
      " and uploaded to " +
      dstBucket +
      "/" +
      dstKey
  );
};
