var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BDggjaUorMtifs9QtgOiAw5jU_NSr_vxvR5k157iG8Fc7TaSxEct6hC8itUOcDJTOHbBo0f7smD71yUUMvUBXDg",
    "privateKey": "YIpC2hbQ0Nzr0kZWlyxYJEqoIPh84Dr1VCpbNw6jT7E"
};


webPush.setVapidDetails(
    'mailto:hafidsiraj.aw@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eJVm-v87iAQ:APA91bHHHgL8BKIajnHRB5UQMqDy1mQQU-SCcz25D-We-UMWvgLYU3Mw3kLxpR-kCmP1GhTRVrSzGZ4pwqfyRHZJPY7hdy8d_n_LHBj5sS2NkJveN14B_VxtkSmrSdpeq1ag0nmRB5-U",
    "keys": {
        "p256dh": "BKUb3AurkHvmFpwijF9KHfmXmEwlkXq3ausVPIkSWWIniReF/irU+iJnPXJdfamHj2EA09QzlpqZIFxoYa7gt0Y=",
        "auth": "tcC9PAsN6SFg0sUCGB+c9w=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '344132175670',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);