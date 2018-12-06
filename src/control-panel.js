import { Dispatcher, Store } from './flux';

const controlPanelDispatcher = new Dispatcher();

const UPDATE_USERNAME = `UPDATE_USERNAME`;
const UPDATE_FONT_SIZE_PREFERENCE = `UPDATE_FONT_SIZE_PREFERENCE`;

const userNameUpdateAction = name => {
  return {
    type: UPDATE_USERNAME,
    value: name
  };
};

const fontSizePreferenceUpdateAction = size => {
  return {
    type: UPDATE_FONT_SIZE_PREFERENCE,
    value: size
  };
};

document
  .getElementById(`userNameInput`)
  .addEventListener(`input`, ({ target }) => {
    const name = target.value;
    console.log('Dispatching....', name);
    controlPanelDispatcher.dispatch(userNameUpdateAction(name));
  });

document.forms.fontSizeForm.fontSize.forEach(element => {
  element.addEventListener('change', ({ target }) => {
    controlPanelDispatcher.dispatch(
      fontSizePreferenceUpdateAction(target.value)
    );
  });
});

class UserPrefsStore extends Store {
  getInitialState() {
    return localStorage[`preferences`]
      ? JSON.parse(localStorage[`preferences`])
      : {
          userName: 'Jim',
          fontSize: 'small'
        };
  }

  __onDispatch(action) {
    switch (action.type) {
      case UPDATE_USERNAME:
        this.__state.userName = action.value;
        break;
      case UPDATE_FONT_SIZE_PREFERENCE:
        this.__state.fontSize = action.value;
        break;
    }
    this.__emitChange();
  }

  getUserPrefences() {
    return this.__state;
  }
}

const userPrefsStore = new UserPrefsStore(controlPanelDispatcher);

userPrefsStore.addListener(state => {
  console.info(`The current state is...`, state);
  render(state);
  localStorage[`preferences`] = JSON.stringify(state);
});

const render = ({ userName, fontSize }) => {
  document.getElementById('userName').innerText = userName;
  document.getElementsByClassName('container')[0].style.fontSize =
    fontSize === 'small' ? '16px' : '24px';
  document.forms.fontSizeForm.fontSize.value = fontSize;
};

// controlPanelDispatcher.register(action => {
//   console.info('Received action....', action);
// });
render(userPrefsStore.getUserPrefences());
