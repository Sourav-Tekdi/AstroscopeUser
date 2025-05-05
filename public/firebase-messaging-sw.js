// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyAt6v6ckiEUsyXSAUsWU79zcURJzxBs_1g",
    authDomain: "astrology-e84c0.firebaseapp.com",
    projectId: "astrology-e84c0",
    storageBucket: "astrology-e84c0.firebasestorage.app",
    messagingSenderId: "208357954562",
    appId: "1:208357954562:web:b1c2f514d079cb3428c31b",
    measurementId: "G-NQDJR7FBT7"
};

// Initialize the Firebase app in the service worker by passing the generated config
firebase.initializeApp(firebaseConfig);
// Retrieve firebase messaging
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const navigate_to = payload.notification.navigate_to;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
        },
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
    if (navigate_to != "" && navigate_to != undefined) {
        // Open the specified URL when the notification is clicked
        self.addEventListener('notificationclick', function (event) {
            event.notification.close();
            event.waitUntil(
                clients.openWindow(navigate_to)
            );
        });
    }
});
