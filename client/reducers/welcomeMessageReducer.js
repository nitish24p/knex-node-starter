const initialState = {
  welcomeMessage: ''
};

export default function message(state = initialState, action) {

  switch (action.type) {
  case 'SET_WELCOME_MESSAGE':
    return {
      ...state,
      welcomeMessage: action.message
    };

  default:
    return state;
  }
}