import { createApp } from 'vue';
import App from './App.vue';
import vuetify from 'vuetify'
//import firebase from 'firebase/app';  Import only the Firebase core module

// const firebaseConfig = {
//     apiKey: "your-api-key",
//     authDomain: "your-auth-domain",
//     projectId: "your-project-id",
//     storageBucket: "your-storage-bucket",
//     messagingSenderId: "your-messaging-sender-id",
//     appId: "your-app-id"
// };

// firebase.initializeApp(firebaseConfig);  Make sure firebase is defined before calling initializeApp

createApp(App)
  .use(vuetify) // Use Vuetify
  .mount('#app')
