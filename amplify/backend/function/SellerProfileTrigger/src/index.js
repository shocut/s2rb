/* Amplify Params - DO NOT EDIT
ENV
REGION
PINPOINT_APPID
PROJECT_ID
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const aws_region = "us-east-1";
const senderAddress = "support@s2rb.com";
const subject = "Thank you for creating your S2RB account.";
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

exports.handler = async (event) => {
  //eslint-disable-line
  //console.log(JSON.stringify(event, null, 2));

  const promise = new Promise(function (resolve, reject) {
    event.Records.forEach((record) => {
      console.log(record.eventName); //console.log('DynamoDB Record: %j', record.dynamodb); // Specify that you're using a shared credentials file. NOT NEEDED FOR LAMBDA - GETS VIA IAM ROLE!!! //var credentials = new AWS.SharedIniFileCredentials({profile: 'default'}); //AWS.config.credentials = credentials;

      if (record.eventName == "INSERT") {
        //console.log("In insert record: %j", record.eventID);
        console.log(JSON.stringify(record.dynamodb.NewImage));

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
        AWS.config.update({ region: aws_region });
        var pinpoint = new AWS.Pinpoint();

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
                MessageType: messageType,
                //OriginationNumber: originationNumber,
              },
            },
          },
        };

        console.log("Before sending SMS new"); //Try to send the message.
        asyncSendMessage(pinpoint, params);

        //build email content
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
