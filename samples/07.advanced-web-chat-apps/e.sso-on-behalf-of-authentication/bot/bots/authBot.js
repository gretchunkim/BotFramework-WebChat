// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { DialogBot } = require('./dialogBot');

class AuthBot extends DialogBot {
  constructor(conversationState, userState, dialog) {
    super(conversationState, userState, dialog);

    this.onMembersAdded(async (context, next) => {
      const {
        activity: { membersAdded, recipient }
      } = context;
      for (const { id } of membersAdded) {
        if (id !== recipient.id) {
          await context.sendActivity(
            "Welcome to Authentication Bot on MSGraph. Type anything to get logged in. Type 'logout' to sign-out."
          );
        }
      }

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onTokenResponseEvent(async (context, next) => {
      console.log('Running dialog with Token Response Event Activity.');

      // Run the Dialog with the new Token Response Event Activity.
      await this.dialog.run(context, this.dialogState);

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });
  }
}

module.exports.AuthBot = AuthBot;