'use strict';

require('dotenv').config();

var token = process.env.BOT_TOKEN;
var apiUser = process.env.CLEVERBOT_API_USER;
var apiKey = process.env.CLEVERBOT_API_KEY;

if (!token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var Botkit = require('./lib/Botkit');
var os = require('os');
var cleverbot = require('cleverbot.io');
var controller = Botkit.slackbot({debug: true});

cleverbot = new cleverbot(apiUser, apiKey);
cleverbot.setNick("Bob");
cleverbot.create(function(err, session) {
  if (err) {
    console.log('cleverbot create fail.');
  } else {
    console.log('cleverbot create success.');
  }
});

var altbot = controller.spawn({token: token}).startRTM();

controller.hears('', 'direct_message,direct_mention,mention', function(bot, message) {
  var msg = message.text;

  cleverbot.ask(msg, function(err, response) {
    if (!err) {
      bot.reply(message, response);
    } else {
      console.log('cleverbot err: ' + err);
    }
  });
});
