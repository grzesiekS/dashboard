import Axios from 'axios';

/* SELECTORS */
export const getUsersData = ({users}) => users.usersList === undefined ? [] : users.usersList;
export const getSelectedUserData = ({users}) => users.user === undefined ? {} : users.user;
export const getLoadingData = ({users}) => users.loading === undefined ? {} : users.loading;

/* ACTIONS */
// action name creator
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCESS_ALL = createActionName('FETCH_SUCESS_ALL');
const FETCH_SUCESS_SELECTED = createActionName('FETCH_SUCESS_SELECTED');
const FETCH_ERROR = createActionName('FETCH_ERROR');

// action creators
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccessAll = payload => ({ payload, type: FETCH_SUCESS_ALL });
export const fetchSuccessSelected = payload => ({ payload, type: FETCH_SUCESS_SELECTED });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

/* thunk creators */

export const fetchUsers = () => {
  return dispatch => {
    dispatch(fetchStarted());

    Axios
      .get('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data')
      .then(res => {
        dispatch(fetchSuccessAll(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || false));
      });
  };
};

export const fetchUsersSelected = id => {
  return dispatch => {
    dispatch(fetchStarted());

    Axios
      .get(`https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${id}`)
      .then(res => {
        dispatch(fetchSuccessSelected(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || false));
      });
  };
};

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCESS_ALL: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        usersList: action.payload,
      };
    }
    case FETCH_SUCESS_SELECTED: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        user: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
}