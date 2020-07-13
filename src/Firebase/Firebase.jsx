// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVz_pM6qwin3UHVaqHfwTH-mskcl5FHlw",
  authDomain: "redux-pro-organizer-app.firebaseapp.com",
  databaseURL: "https://redux-pro-organizer-app.firebaseio.com",
  projectId: "redux-pro-organizer-app",
  storageBucket: "redux-pro-organizer-app.appspot.com",
  messagingSenderId: "164847114595",
  appId: "1:164847114595:web:81d8f829f046da37ad5b56",
};
// Initialize Firebase
export const fireStoreConfig = firebase.initializeApp(firebaseConfig);
export default fireStoreConfig.firestore();
