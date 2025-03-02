const Pusher = require("pusher");
require("dotenv").config(); // Load environment variables

// Debug: Log environment variables to check for undefined values
console.log("Pusher Config:");
console.log("APP_ID:", process.env.APP_ID);
console.log("KEY:", process.env.KEY);
console.log("SECRET:", process.env.SECRET);
console.log("CLUSTER:", process.env.CLUSTER);

const pusher = new Pusher({
  appId: process.env.APP_ID, // Fix: Use "appId" instead of "APP_ID"
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER, // Fix: Use "CLUSTER" instead of "C"
  useTLS: true,
});

module.exports = pusher;
