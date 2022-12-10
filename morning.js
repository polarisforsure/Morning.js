// Set the time zone to Stockholm
process.env.TZ = 'Europe/Stockholm';

// Import the necessary libraries
const fs = require('fs');
const schedule = require('node-schedule');
const teams = require('@microsoft/teams-js');
const readline = require('readline');

// Set the default time when the message should be sent
const defaultTime = '30 07 * * 1-5';

// Set the default language (English or Swedish)
const defaultLanguage = 'sv';

// Set the default messages (in English and Swedish)
const messages = {
  en: [
    'Good morning!',
    'Good afternoon!',
    'Good evening!',
    'Hello everyone!',
    'How is everyone?',
    'Another beautiful morning today.',
    'Good morning everyone.'
  ],
  sv: [
    'God morgon!',
    'Morsning!',
    'Ugh! Idag behöver man verkligen en extra kopp kaffe för att piggna till.',
    'Hallå där!',
    'Hej där!',
    'Ny dag, nya möjligheter.',
    'Morgon på er!'
  ]
};

// Set the default name of the Microsoft Teams chat
const defaultChat = 'Servicedesk';

// Parse the command-line arguments
const args = process.argv.slice(2);

// Parse the time when the message should be sent
let time = defaultTime;
if (args.length >= 1) {
  time = args[0];
}

// Parse the language (English or Swedish)
let language = defaultLanguage;
if (args.length >= 2) {
  language = args[1];
}

// Parse the name of the Microsoft Teams chat
let chat = defaultChat;
if (args.length >= 3) {
  chat = args[2];
}

// Check for the existence of a lock file
const lockFile = './.lock';
if (fs.existsSync(lockFile)) {
  console.error('Script is already running!');
  process.exit(1);
}

// Create a new Microsoft Teams client
const client = teams.Teams.getClient();

// Set up a scheduler to send a random message every weekday at the specified time
const scheduler = schedule.scheduleJob(time, async () => {
  try {
    // Connect to the Microsoft Teams chat
    await client.connect();
    const teamChat = await client.teams.getChat(chat);

    // Select a random message
    const message = messages[language][Math.floor(Math.random() * messages[language].length)];

    // Send the message
    await teamChat.sendMessage(message);
    console.log(`Sent message: "${message}"`);
  } catch (err) {
    // Handle any errors
    console.error(err);
  } finally {
    // Disconnect from the chat
    await client.disconnect();
  }
});

// Start the scheduler
scheduler.start();

// Create the lock file to indicate that the script is running
fs.closeSync(fs.openSync(lockFile, 'w'));

// Clean up the lock file when the script exits
process.on('exit', () => {
  fs.unlinkSync(lockFile);
});
