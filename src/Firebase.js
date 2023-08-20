import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";
import axios from "axios";
const firebaseConfig = {
  // Your Firebase config here
  
  apiKey: "AIzaSyDJmNnPrOZLVjuVcndyfkodOvXBFoJpdQQ",
  authDomain: "trytochat-7961b.firebaseapp.com",
  projectId: "trytochat-7961b",
  storageBucket: "trytochat-7961b.appspot.com",
  messagingSenderId: "371248321749",
  appId: "1:371248321749:web:1b9b9997cbb80e3161be5c",
  measurementId: "G-BMKFLCSQBL"
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const messaging = getMessaging();




export const getMessagingToken = async ({user,chatMessage}) => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      return  getToken(messaging, { vapidKey: `BGZl468T3erL1mZZIZVkXF2TPhi7aBr21P0XZwSqKt0usUmuaftxUn9Ix-9TVgb6-Eqpe7gOXt2cP03mzQyzfvo` })
        .then((currentToken) => {
          if (currentToken) {
            
            sendTokenToServer(currentToken,user,chatMessage)
          } else {
            console.log('Failed to generate the app registration token.');
          }
        })
        .catch((err) => {
          console.log('An error occurred when requesting to receive the token.', err);
        });
    } else {
      console.log("User Permission Denied.");
    }
  });
};
export const sendTokenToServer = async (token,username,msg) => {
  const serverKey = 'AAAAVnAf1NU:APA91bGi90tWiNHU_ZWsCm_eIiujkjydRrXFdJc5UDBsRvvz5LoVufrO5frHjVaao57gaCANhU3COH4Z2d5C4meCUsM8Y4Awt5d6PW_hLThc5wLykBdEytAO93ghw8GFXaKF9Jivm9nN'; 
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `key=${serverKey}`,
  };
  const data = {
    to: token,
    notification: {
      title:username?? 'Hello',
      body:msg?? 'Welcome to chat !',
    },
  };
  try {
    const response = await axios.post('https://fcm.googleapis.com/fcm/send', data, { headers });
    console.log('Push notification sent:', response.data);
  } catch (error) {
    console.error('Error sending push notification:', error);
  }

};

export const listenForMessages = () =>

  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
       
      console.log("ON MESSAGE !!!!");
      console.log("Payload:", payload);
      resolve(payload);
    });
  });

export { db, auth };
