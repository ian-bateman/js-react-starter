import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA4EtSGklns_48KwYx2N2MugF_cIcAzMZ4',
  authDomain: 'cs52-hw3-a917e.firebaseapp.com',
  databaseURL: 'https://cs52-hw3-a917e.firebaseio.com',
  storageBucket: 'cs52-hw3-a917e.appspot.com',
};
firebase.initializeApp(config);

const database = firebase.database().ref('notes');
// mostly given
// some snapshot usage found https://www.firebase.com/docs/web/api/datasnapshot/
// and at https://www.firebase.com/docs/web/api/datasnapshot/val.html
export function fetchNotes(callback) {
  firebase.database().ref('notes').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}
// function to update noteObj location in firebase DB
// mostly given, update usage found https://www.firebase.com/docs/web/api/firebase/update.html
export function moveIdDB(id, x, y) {
  database.child(id).update({ x, y });
}
// function to update noteObj text in firebase DB
// mostly given, update usage found https://www.firebase.com/docs/web/api/firebase/update.html
export function updateIdDB(id, text) {
  database.child(id).update({ text });
}
// function to delete noteObj from firebase DB
// given
export function deleteIdDB(id) {
  database.child(id).remove();
}
// function to add noteObj to firebase DB
// mostly given, push usage found https://www.firebase.com/docs/web/api/firebase/push.html
export function addNoteDB(note) {
  database.push(note);
}
