import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.ktyd = functions.firestore
    .document('/todos/{todosId}')
    .onCreate(async (snap, context) => {

//    const data = snap.data();


    const payload = {
      notification: {
          title: 'ktyd',
          body : 'new content!'
      }
    }

    const db = admin.firestore()
    const devicesRef = db.collection('devices')
    const devices = await devicesRef.get();
    const tokens : any[] = [];
    devices.forEach(result => {
      const token = result.data().token;
      tokens.push( token )
    })

    return admin.messaging().sendToDevice(tokens, payload)

});


exports.createUserData = functions.auth.user().onCreate((user) => {
const db = admin.firestore()
//const displayName = user.displayName;
const uid = user.uid
const email = user.email
const role = "guest"
const date = Date.now()
const newUserRef = db.collection("users").doc(uid)

return newUserRef.set({
    userid: uid,
    email: email,
    jabatan: role,
//    fname: displayName,
    createdAt: date
})
});
