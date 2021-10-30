/* Amplify Params - DO NOT EDIT
ENV
REGION
PINPOINT_APPID
PROJECT_ID
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const aws_region = "us-east-1";
const senderAddress = "support@s2rb.com";
const charset = "UTF-8";
const appId = "9a1650ed6473474cae14ca6650b98bed";

async function asyncSendMessage(pinpoint, params) {
  console.log("In asyncSendMessage", params);
  try {
    const data = await pinpoint.sendMessages(params).promise();
    console.log("data:", data);
    //const response = await pinpoint.sendMessages(params);;
  } catch (e) {
    console.log(e);
  }
}

async function sendSMS(pinpoint, destinationNumber, message) {
  console.log("In asyncSendMessage", params);

  // Specify the parameters to pass to the API.
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
          MessageType: "TRANSACTIONAL",
          //OriginationNumber: originationNumber,
        },
      },
    },
  };
  console.log("Before sending SMS new"); //Try to send the message.
  asyncSendMessage(pinpoint, params);
}

exports.handler = async (event) => {
  //eslint-disable-line
  //console.log(JSON.stringify(event, null, 2));

  const promise = new Promise(function (resolve, reject) {
    // Specify the region.
    AWS.config.update({ region: aws_region });
    var pinpoint = new AWS.Pinpoint();

    event.Records.forEach((record) => {
      console.log(record.eventName);

      if (record.eventName == "MODIFY") {
        if (
          record.dynamodb.NewImage.status.S == "REFERRAL_GENERATED" &&
          record.dynamodb.OldImage.status.S != record.dynamodb.NewImage.status.S //do this only the first time this status changes to ref generated ...
        ) {
          var destinationNumber = record.dynamodb.NewImage.sellerPhone.S;
          //var destinationNumber = "+17035989862";
          var message =
            "This message is from S2RB.com " +
            "Your real estate profile has been accepted. An S2RB affiliated local realtor will contact you with next steps. " +
            "Check your dashboard at https://s2rb.com/app/sdashboard " +
            "Reply STOP to opt out.";
          sendSMS(pinpoint, destinationNumber, message);

          //build email content
          var body_text = "Your S2RB real estate profile has been accepted.";
          var toAddress = record.dynamodb.NewImage.sellerEmail.S;
          var subject = "Your S2RB real estate profile has been accepted.";
          var body_html =
            `<html>
              <head></head>
              <body>
                <h4>Hello ` +
            record.dynamodb.NewImage.firstName.S +
            `,</h4>
                <p>
                   We are happy to inform you that your real estate profile has been accepted. An S2RB affiliated local realtor will contact you with next steps.
                   The licensed realtor will request a formal representation agreement and then help you in finding investors for your property.   
                 </p>
                 <p>
                   We work with local real estate brokerages and investors to help you find a suitable solution for your real estet needs.
                 </p>
                 <p>
                   Thank you,
                 </p>
                 <p>
                   S2RB Support
                 </p>
                 <br/>
                 <p>
                   <small><b>About S2RB</b></small>
                 </p>
                 <p>
                   <small>
                     S2RB is a FREE service that works with you, local real estate agents and potential investors to create a 
                     win-win solution and help you sell the home and rent it back. We understand your concerns and strive to 
                     make this transaction as smooth and streamlined as possible. 
                   </small>
                 </p>
                 <p>
                   <small>
                    To keep receiving emails from us, please add <b>support@s2rb.com</b> to your contacts. 
                   <small>
                 </p>
              </body> 
              </html>`;

          var emailParams = {
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
          asyncSendMessage(pinpoint, emailParams);
        }
      }

      if (record.eventName == "INSERT") {
        //console.log("In insert record: %j", record.eventID);
        console.log(JSON.stringify(record.dynamodb.NewImage));
        //var originationNumber = "+18445384684";   //pinpoint will default
        var destinationNumber = record.dynamodb.NewImage.sellerPhone.S;
        //var destinationNumber = "+17035989862";
        var message =
          "This message is from S2RB.com " +
          "Your real estate profile was updated. " +
          "Reply STOP to opt out.";

        sendSMS(pinpoint, destinationNumber, message);

        //build email content
        var body_text = "Your S2RB real estate profile has been created.";
        var subject = "Your S2RB real estate profile has been created.";
        //var toAddress = "manyapradhan@gmail.com";
        var toAddress = record.dynamodb.NewImage.sellerEmail.S;

        var body_html =
          `<html>
              <head></head>
              <body>
                <h4>Hello ` +
          record.dynamodb.NewImage.firstName.S +
          `,</h4>
                <p>
                   You can view and edit your profile at: <a href='https://s2rb.com/app/sdashboard/'>Your S2RB Dashboard</a>
                   Once you add photos and initiate a review our representatives will contact you with next steps. S2RB connects 
                   you with licensed real estate agents to help and advise you in finding investors for your property.   
                 </p>
                 <p>
                   We work with local real estate brokerages and investors to help you find a suitable solution for your real estet needs.
                 </p>
                 <p>
                   Thank you,
                 </p>
                 <p>
                   S2RB Support
                 </p>
                 <br/>
                 <p>
                   <small><b>About S2RB</b></small>
                 </p>
                 <p>
                   <small>
                     S2RB is a FREE service that works with you, local real estate agents and potential investors to create a 
                     win-win solution and help you sell the home and rent it back. We understand your concerns and strive to 
                     make this transaction as smooth and streamlined as possible. 
                   </small>
                 </p>
                 <p>
                   <small>
                    To keep receiving emails from us, please add <b>support@s2rb.com</b> to your contacts. 
                   <small>
                 </p>
              </body> 
              </html>`;

        var emailParams = {
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
        asyncSendMessage(pinpoint, emailParams);
      }
    });
  });

  return promise;
};
