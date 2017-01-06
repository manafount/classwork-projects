const user = "bigpapa@gmail.com";

class Message {
  constructor(from = user, to = "", subject = "", body = "") {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.body = body;
  }
}

let messages = JSON.parse(localStorage.getItem('messages'));
let messageDraft = new Message();

if(!messages) {
  messages = {
    sent: [
      {to: "hope@mail.com", subject: "cat", body: "flufflebutt"},
      {to: "kevin@mail.com", subject: "candy", body: "seriously lemme get some"}
    ],

    inbox: [
      {from: "yongpark@mail.com", subject: "spooky alien", body: "ayyy lmao"},
      {from: "carsonjudge@mail.com", subject: "we're pairs today", body: "pyscheee it's a solo day"}
    ]
  };
}

const MessageStore = {
  getInboxMessages() {
    return messages.inbox.slice();
  },

  getSentMessages() {
    return messages.sent.slice();
  },

  getMessageDraft() {
    return messageDraft;
  },

  sendDraft() {
    messages.sent.push(messageDraft);
    messageDraft = new Message();
    localStorage.setItem('messages', JSON.stringify(messages));
  },
  
  updateDraftField(field, value) {
    messageDraft[field] = value;
  }
};

module.exports = MessageStore;
