/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	PINPOINT_APPID
	PROJECT_ID
  PROJECTID
Amplify Params - DO NOT EDIT */

"use strict";
const AWS = require("aws-sdk");
const aws_region = "us-east-1";
const senderAddress = "support@s2rb.com";
const subject = "Created your S2RB real estate profile";
const charset = "UTF-8";
const appId = "a26086a12195450f9540c83b1fa73da3";

exports.handler = (event) => {
  //eslint-disable-line
  //console.log(JSON.stringify(event, null, 2));
  event.Records.forEach((record) => {
    //console.log(record.eventID);
    console.log(record.eventName); //console.log('DynamoDB Record: %j', record.dynamodb); // Specify that you're using a shared credentials file. NOT NEEDED FOR LAMBDA - GETS VIA IAM ROLE!!! //var credentials = new AWS.SharedIniFileCredentials({profile: 'default'}); //AWS.config.credentials = credentials;
    if (record.eventName == "INSERT") {
      console.log("In insert record: %j", record.eventID); // The email body for recipients with non-HTML email clients.

      var body_text = "Your S2RB real estate profile details:"; //var toAddress = record.dynamodb.NewImage.sellerReference.S;
      //var toAddress = "manyapradhan@gmail.com";
      var toAddress = record.dynamodb.NewImage.sellerEmail.S;

      var originationNumber = "+18445384684";
      var destinationNumber = "+17035989862";
      var messageType = "TRANSACTIONAL";

      var message =
        "This message was sent from S2RB.com " +
        "Your real estate profile was updated. Reply STOP to " +
        "opt out.";

      // Specify the region.
      AWS.config.update({ region: aws_region }); //Create a new Pinpoint object.

      var pinpoint = new AWS.Pinpoint(); // Specify the parameters to pass to the API.

      var params = {
        ApplicationId: appId,
        MessageRequest: {
          Addresses: {
            [destinationNumber]: {
              ChannelType: "SMS",
            },
          },
          MessageConfiguration: {
            SMSMessage: {
              Body: message,
              MessageType: messageType,
              OriginationNumber: originationNumber,
            },
          },
        },
      };

      console.log("Before sending SMS new"); //Try to send the message.

      pinpoint.sendMessages(params, function (err, data) {
        // If something goes wrong, print an error message.
        if (err) {
          console.log(err.message); // Otherwise, show the unique ID for the message.
        } else {
          console.log(
            "Message sent! " +
              data["MessageResponse"]["Result"][destinationNumber][
                "StatusMessage"
              ]
          );
        }
      });
      console.log("After sending SMS"); //  code to send email
      var body_html = `<html>
              <head></head>
              <body>
                <h3>Thank you for creating your S2RB real estate profile</h3>
<br/>
                <p>Our representatives will review and contact you with next steps. You can review and edit your profile at:
                  <a href='https://s2rb.com/sdashboard/'>Your S2RB Dashboard</a>
                 </p>
              </body> 
              </html>`; // Specify the parameters to pass to the API.

      var params = {
        ApplicationId: appId,
        MessageRequest: {
          Addresses: {
            [toAddress]: {
              ChannelType: "EMAIL",
            },
          },
          MessageConfiguration: {
            EmailMessage: {
              FromAddress: senderAddress,
              SimpleEmail: {
                Subject: {
                  Charset: charset,
                  Data: subject,
                },
                HtmlPart: {
                  Charset: charset,
                  Data: body_html,
                },
                TextPart: {
                  Charset: charset,
                  Data: body_text,
                },
              },
            },
          },
        },
      };

      console.log("Before sending email"); //console.log(JSON.stringify(params)); //Try to send the email.
      try {
        pinpoint.sendMessages(params, function (err, data) {
          // If something goes wrong, print an error message.
          console.log(err);
          console.log(data);

          if (err) {
            console.log(err.message);
          } else {
            console.log(
              "Email sent! Message ID: ",
              data["MessageResponse"]["Result"][toAddress]["MessageId"]
            );
          }
        });
        console.log("After sending email");
      } catch (e) {
        console.log(e);
      }
    }
  });
  return Promise.resolve("Successfully processed DynamoDB record");
};
