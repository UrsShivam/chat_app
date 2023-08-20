

// firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");


const firebaseConfig = {
    apiKey: "AIzaSyDJmNnPrOZLVjuVcndyfkodOvXBFoJpdQQ",
    authDomain: "trytochat-7961b.firebaseapp.com",
    projectId: "trytochat-7961b",
    storageBucket: "trytochat-7961b.appspot.com",
    messagingSenderId: "371248321749",
    appId: "1:371248321749:web:1b9b9997cbb80e3161be5c",
    measurementId: "G-BMKFLCSQBL"
  };


 let app =firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});