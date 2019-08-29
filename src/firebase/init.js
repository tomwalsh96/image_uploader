import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAVHVikzHdzGXXd4ugsqdZzv043Rq8aOXU',
  authDomain: 'image-uploader-97673.firebaseapp.com',
  databaseURL: 'https://image-uploader-97673.firebaseio.com',
  projectId: 'image-uploader-97673',
  storageBucket: 'image-uploader-97673.appspot.com',
  messagingSenderId: '123442416357',
  appId: '1:123442416357:web:9b447b6a160b58f1'
}
const firebaseApp = firebase.initializeApp(config)

// export firebase
export default firebaseApp
