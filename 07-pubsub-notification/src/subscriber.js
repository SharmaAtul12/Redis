import Redis from 'ioredis';

const subscriber = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Subscriber Nn Subscribe Kiya 'notifications' channel Ko Means Jab Bhi 'notifications' channel Par Koi Message Publish Hoga 
// To Subscriber Ko Wo Message Mil Jayega Aur Subscriber Usko Console Par Print Karega.
subscriber.subscribe('notifications', (err) => {
  if (err) {
    console.error('Failed to subscribe: %s', err.message);
    return;
  }
  console.log('Subscribed successfully!');
});

// Subscriber Jab Bhi 'notifications' channel Par Koi Message Receive Karega To Ye Callback Function Call Hoga
//  Aur Usme Channel Aur Message Ka Data Milega.
subscriber.on('message', (channel, message) => {
  console.log("Received On ", channel, ":", JSON.parse(message));
});