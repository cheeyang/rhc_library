import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCI9u-mjQ1CUIcs-aCXG0Y-1rMOlV27_vE",
    authDomain: "rhc-library.firebaseapp.com",
    databaseURL: "https://rhc-library.firebaseio.com",
    projectId: "rhc-library",
    storageBucket: "rhc-library.appspot.com",
    messagingSenderId: "690645120162"
}
firebase.initializeApp(config);

export default firebase;
