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
var controller = Botkit.slackbot({debug: true});
var movies = require('./data/mock');

var altbot = controller.spawn({token: token}).startRTM();

controller.hears('movie', 'direct_message,direct_mention,mention', function(bot, message) {
  var rand = Math.floor(Math.random() * 6) + 1;
  bot.reply(message, 'Do you know ' + movies[rand].title + ' made in ' + movies[rand].year + ' ?');
});

controller.hears('yes', 'direct_message,direct_mention,mention', function(bot, message) {
  bot.reply(message, 'That\'s cool');
});

controller.hears('no', 'direct_message,direct_mention,mention', function(bot, message) {
  bot.reply(message, 'Oh dear! You should go see it');
});

controller.hears('ok', 'direct_message,direct_mention,mention', function(bot, message) {
  bot.reply(message, ':thumbsup:');
});

controller.hears('thanks', 'direct_message,direct_mention,mention', function(bot, message) {
  bot.reply(message, 'My pleasure!');
});
