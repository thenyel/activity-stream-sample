/*
 * Serve content over a socket
 */

module.exports = function (socket) {
  socket.emit('send:name', {
    name: 'Bob'
  });

  setInterval(function () {
    socket.emit('send:new activity', makeRandomActivity());
  }, 1000);
};


var activities = [
  {"createdOn": "Mon Nov 16 2015 20:11:19 GMT+0000 (UTC)", "category": "silver", "viewed": false, "text": "Subject 145 in category `silver` was updated.", "_id": "5669ba8ae388b7b9d8947bdb"},
  {"createdOn": "Fri Aug 21 2015 00:57:29 GMT+0000 (UTC)", "category": "silver", "viewed": false, "text": "Subject 150 in category `silver` was updated.", "_id": "5669ba8a085f0aee1a06d116"},
  {"createdOn": "Thu Aug 06 2015 04:21:25 GMT+0000 (UTC)", "category": "gold",   "viewed": false, "text": "Subject 135 in category `gold` was updated.", "_id": "5669ba8a5c1220cfc7205b3e"},
  {"createdOn": "Tue Dec 08 2015 20:09:48 GMT+0000 (UTC)", "category": "bronze", "viewed": false, "text": "Subject 133 in category `bronze` was updated.", "_id": "5669ba8aa9b4596961e6de94"},
  {"createdOn": "Fri Mar 07 2014 19:06:18 GMT+0000 (UTC)", "category": "bronze", "viewed": false, "text": "Subject 103 in category `bronze` was updated.", "_id": "5669ba8a682ef1e637c9a95c"},
  {"createdOn": "Fri Nov 14 2014 22:56:29 GMT+0000 (UTC)", "category": "gold",   "viewed": true,  "text": "Subject 139 in category `gold` was updated.", "_id": "5669ba8ac38045d044ecbe04"},
  {"createdOn": "Sat Mar 01 2014 11:59:18 GMT+0000 (UTC)", "category": "silver", "viewed": true,  "text": "Subject 105 in category `silver` was updated.", "_id": "5669ba8a64964f689a41f18a"},
  {"createdOn": "Sun Apr 20 2014 08:04:19 GMT+0000 (UTC)", "category": "silver", "viewed": false, "text": "Subject 103 in category `silver` was updated.", "_id": "5669ba8a5b92455f2490709c"},
  {"createdOn": "Sun Jun 07 2015 13:06:01 GMT+0000 (UTC)", "category": "silver", "viewed": true,  "text": "Subject 103 in category `silver` was updated.", "_id": "5669ba8a5a7cbcaa05403ebb"},
  {"createdOn": "Sun Mar 30 2014 18:16:39 GMT+0000 (UTC)", "category": "silver", "viewed": false, "text": "Subject 136 in category `silver` was updated.", "_id": "5669ba8abf08b5aeb979d466"},
  {"createdOn": "Sun Aug 17 2014 09:24:35 GMT+0000 (UTC)", "category": "gold",   "viewed": false, "text": "Subject 143 in category `gold` was updated.", "_id": "5669ba8a759772b645c69c61"},
  {"createdOn": "Tue Oct 07 2014 05:15:19 GMT+0000 (UTC)", "category": "gold",   "viewed": true,  "text": "Subject 134 in category `gold` was updated.", "_id": "5669ba8a5e96c53e0724afe6"},
  {"createdOn": "Wed May 28 2014 17:30:58 GMT+0000 (UTC)", "category": "silver", "viewed": false, "text": "Subject 100 in category `silver` was updated.", "_id": "5669ba8aabb1cdecc4c8cec3"},
  {"createdOn": "Thu Sep 24 2015 02:27:25 GMT+0000 (UTC)", "category": "silver", "viewed": true,  "text": "Subject 144 in category `silver` was updated.", "_id": "5669ba8a1c5a7bffaf8c0d8c"},
  {"createdOn": "Tue Jan 27 2015 02:06:46 GMT+0000 (UTC)", "category": "bronze", "viewed": false, "text": "Subject 112 in category `bronze` was updated.", "_id": "5669ba8a3e17c74d5cb61fe4"},
  {"createdOn": "Fri Aug 14 2015 09:26:48 GMT+0000 (UTC)", "category": "bronze", "viewed": true,  "text": "Subject 147 in category `bronze` was updated.", "_id": "5669ba8aa948c38807313a02"},
  {"createdOn": "Tue Jul 01 2014 06:37:10 GMT+0000 (UTC)", "category": "gold",   "viewed": false, "text": "Subject 143 in category `gold` was updated.", "_id": "5669ba8a1bc2c4b4f8e2c8b7"},
  {"createdOn": "Wed Mar 12 2014 22:11:08 GMT+0000 (UTC)", "category": "silver", "viewed": true,  "text": "Subject 112 in category `silver` was updated.", "_id": "5669ba8ac04f224299cd02e2"},
  {"createdOn": "Sun Aug 02 2015 18:05:48 GMT+0000 (UTC)", "category": "silver", "viewed": false, "text": "Subject 147 in category `silver` was updated.", "_id": "5669ba8a5b03fa07d45614f5"},
  {"createdOn": "Sun Mar 30 2014 14:28:33 GMT+0000 (UTC)", "category": "gold",   "viewed": true,  "text": "Subject 149 in category `gold` was updated.", "_id": "5669ba8a1ff0170b3312ffca"},
  {"createdOn": "Fri Feb 14 2014 04:28:05 GMT+0000 (UTC)", "category": "bronze", "viewed": true,  "text": "Subject 133 in category `bronze` was updated.", "_id": "5669ba8abfee454644038c52"},
  {"createdOn": "Mon Nov 02 2015 16:24:08 GMT+0000 (UTC)", "category": "bronze", "viewed": true,  "text": "Subject 130 in category `bronze` was updated.", "_id": "5669ba8a4cf1484cc7383f11"},
  {"createdOn": "Tue Jun 30 2015 16:22:24 GMT+0000 (UTC)", "category": "silver", "viewed": false, "text": "Subject 119 in category `silver` was updated.", "_id": "5669ba8a2aceb57468405cef"},
  {"createdOn": "Sat Oct 25 2014 08:52:10 GMT+0000 (UTC)", "category": "bronze", "viewed": true,  "text": "Subject 124 in category `bronze` was updated.", "_id": "5669ba8a9e5be38feac1f634"},
  {"createdOn": "Fri May 08 2015 12:48:20 GMT+0000 (UTC)", "category": "gold",   "viewed": true,  "text": "Subject 119 in category `gold` was updated.", "_id": "5669ba8a144c2e6ff00dad37"}
];

function makeRandomActivity () {
  return activities[random(0, 25)];
}

function random (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}