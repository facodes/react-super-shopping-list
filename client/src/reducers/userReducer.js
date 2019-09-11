import * as TYPES from '../actions/types';

const bookReducer = (state, action) => {
  switch (action.type) {
    case 'login':

      return [...state, { obj: 'new object' }];

    default:
      return state;
  }
};

export default bookReducer;
