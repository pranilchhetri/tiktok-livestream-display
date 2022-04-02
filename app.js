var express = require('express');
var path = require('path');
var {WebcastPushConnection} = require('tiktok-livestream-chat-connector');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname + '/public'));
//Username of someone who is currently live
let tiktokUsername = "aanshvermaa_100";

//create a new wrapper object and pass the username
let tiktokChatConnection = new WebcastPushConnection(tiktokUsername);

// Connect to the chat (await can be used as well)
tiktokChatConnection.connect().then(state => {
    console.info(`Connected to roomId ${state.roomId}`);
}).catch(err =>{
    console.error('Failed to connect', err);
})

//Define the events that you want to handle
//In this case we listen to chat messages( comments)


// //And here we receive gifts sent to the streamer
tiktokChatConnection.on('gift',data =>{
    console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
})

const PORT = 8080;

var router = express.Router();

tiktokChatConnection.on('chat', data=>{
  console.log(`${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`);
 
})
router.get('/', function (request, response) {
  response.render('index', { title: 'Welcome!' });
});

router.get('/livedata', function (request, response) {

response.render('index', { title: 'livedata' });
});

router.get('/teacher', function (request, response) {
  response.render('index', { title: 'Welcome, teacher!' });
});

app.use('/', router);

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
