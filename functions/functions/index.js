const functions = require('firebase-functions');

let admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });




exports.pushNotification = functions.database
    .ref('/reunioes/{reuniaoId}')
    .onWrite(event => {

        console.log('Push notification event triggered');

        var valueObject = event.data.val();

        const payload = {
            notification: {
                title: 'App Name',
                body: "New Message",
                sound: "default"
            },
            data: {
                title: "valueObject",
                message: "valueObject"
            }
        };

        const options = {
            priority: "high",
            timeToLive: 60 * 60 * 24 //24 horas
        };

        return admin.messaging().sendToTopic("notifications", payload, options);
    });

    //     const post = event.data.val();
    //     console.log(post);
    //     notificar();
    //     return;
    // })

// function notificar() {

//     var payload = {
//         notification: {
//             title: 'Firebase Notification',
//             body: "ola",
//         },
//         data: {
//             message: "ola"
//         }
//     };

//     let token = "AAAAMuozYYY:APA91bEyxXbBdVKHSCkVgLuKNXzSpIFDKU_XmaLUXwWHFFH95r9dpMeNaBnfeCcJKsExx86GN4DQher5eerETdI9SW5pqBF4Rlei1YtcJCK4SQvhgiKDxqTdgIVsRvIfIoXx4495Qaw2";

//     admin.messaging().sendToDevice(token, payload).then(function (response) {
//         console.log("Successfully sent message:", response);
//     })
//         .catch(function (error) {
//             console.log("Error sending message:", error);
//         });

//     return;
// }


