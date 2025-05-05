import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import config from './config.json';
// import ReactGA from 'react-ga4';

// Initialize Firebase
initializeApp(config.firebaseConfig);
const messaging = getMessaging();
export default async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        const token = await getToken(messaging, {
            vapidKey:
                "BCMGZ8mh6gELGTmUdr34kjWNnTgapFKRDu0vVyYAAoPrxMCZeaibZKqnH8rIpufz8Jsotq77wURB9nWXhGF_bQU",
        });
        return token;
    } else if (permission === "denied") {
    }
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
export const checkNotificationPermission = () => {
    return Notification.permission; // Returns "granted", "denied", or "default"
};
