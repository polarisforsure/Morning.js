
# Morning.js

A node.js script that sends a random "Good morning" message in English or Swedish through Microsoft Teams every weekday at 07:30.

## Requirements
node.js 12 or higher

An active Microsoft Teams account

The node-schedule, @microsoft/teams-js, and readline npm packages

## Usage

To use the morning.js script, follow these steps:

1. Clone this repository by running th efollowing command in Git bash:
```bash
  git clone https://github.com/polarisforsure/Morning.js.git
```
2. Install the node-schedule, @microsoft/teams-js, and readline npm packages by running the following command:
```bash
  npm install node-schedule @microsoft/teams-js readline
```
3. Configure the morning.js script with your Microsoft Teams credentials. This can be done by setting the clientId, clientSecret, and token values in the client variable at the top of the script. For more information on how to obtain these values, see the @microsoft/teams-js documentation.

4. Add the morning.js script to your system's startup programs. This will ensure that the script is automatically started when you log in to your computer and continues to run in the background until you log out or shut down your computer. The exact steps for doing this will depend on your operating system, but you can typically find the startup folder in the Start menu.

5. When you first run the morning.js script, you will be prompted to select the language (English or Swedish) that you want to use for the messages. To do this, simply enter en for English or sv for Swedish and press enter.

6. (Optional) You can customize the time when the message is sent, the language (English or Swedish), and the name of the Microsoft Teams chat by providing command-line arguments when starting the script. For example, the following command would send the message in Swedish at 08:00 instead of 07:30:
```bash
  node morning.js 00 08 sv
```
The command-line arguments are specified in the following order: time language chat, where time is the time when the message should be sent (in the format mm hh * * d-w), language is the language to use for the message (en for English or sv for Swedish), and chat is the name of the Microsoft Teams chat. If you omit any of these arguments, the script will use the default values specified in the script.

For more information, see the node-schedule documentation.

License

This project is licensed under the MIT License. See the LICENSE file for details.
