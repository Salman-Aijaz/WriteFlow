const pusher = require("./pusher");

pusher.subscribe("comments").bind("new_comment", (data) => {
  console.log("🔔 New Comment Notification: ", data);
  // Optionally, store notification in a database
});
