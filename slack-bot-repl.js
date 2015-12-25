/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# RUN THE BOT:

  Get a Bot token from Slack:

    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:

    token=<MY TOKEN> node team_bot.js

# USE THE BOT:

  5+5 --> 10
  var x = 2; x + x --> 4

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

var Botkit = require('botkit');


if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var controller = Botkit.slackbot({
 debug: false,
});

controller.spawn({
  token: process.env.token
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});

controller.hears(['[\s\S]*'],['direct_message','direct_mention','mention', 'ambient'],function(bot,message) {
  console.log("I heard something!")
  try {
    bot.reply(message, "" + eval(message.text));
  } catch (e) {
    bot.reply(message, "" + e)
  }
});