import { createStore } from 'redux';

const defaultState = {
  messages: [
    {
      date: new Date('2016-10-10 10:11:55'),
      postedBy: `Stan`,
      content: `I <3 the new productivity app!`
    },
    {
      date: new Date('2016-10-10 10:12:55'),
      postedBy: `Jerry`,
      content: `I dont know if the new feature....`
    }
  ],
  userStatus: `ONLINE`
};

const store = createStore((state = defaultState) => {
  return state;
});

const render = () => {
  const { messages, userStatus } = store.getState();
  document.getElementById('messages').innerHTML = messages
    .sort((a, b) => b.date - a.date)
    .map(message => `<div>${message.postedBy} : ${message.content}</div>`)
    .join('');
};

render();
