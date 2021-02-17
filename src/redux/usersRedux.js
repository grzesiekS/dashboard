import Axios from 'axios';

/* SELECTORS */
export const getUsersData = ({users}) => users.usersList === undefined ? [] : users.usersList;
export const getSelectedUserData = ({users}) => users.userData === undefined ? {} : users.userData;
export const getLoadingData = ({users}) => users.loading === undefined ? {} : users.loading;

/* ACTIONS */
// action name creator
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS_ALL = createActionName('FETCH_SUCCESS_ALL');
const FETCH_SUCCESS_SELECTED = createActionName('FETCH_SUCCESS_SELECTED');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const POST_START = createActionName('POST_START');
const POST_SUCCESS = createActionName('POST_SUCCESS');
const POST_ERROR = createActionName('POST_ERROR');

const PUT_START = createActionName('PUT_START');
const PUT_SUCCESS = createActionName('PUT_SUCCESS');
const PUT_ERROR = createActionName('PUT_ERROR');

const DELETE_START = createActionName('DELETE_START');
const DELETE_SUCCESS = createActionName('DELETE_SUCCESS');
const DELETE_ERROR = createActionName('DELETE_ERROR');

const CHANGE_USER_DATA = createActionName('CHANGE_USER_DATA');
const DEFAULT_USER_DATA = createActionName('DEFAULT_USER_DATA');

// action creators
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccessAll = payload => ({ payload, type: FETCH_SUCCESS_ALL });
export const fetchSuccessSelected = payload => ({ payload, type: FETCH_SUCCESS_SELECTED });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const postStarted = payload => ({ payload, type: POST_START });
export const postSuccess = payload => ({ payload, type: POST_SUCCESS });
export const postError = payload => ({ payload, type: POST_ERROR });

export const putStarted = payload => ({ payload, type: PUT_START });
export const putSuccess = payload => ({ payload, type: PUT_SUCCESS });
export const putError = payload => ({ payload, type: PUT_ERROR });

export const deleteStarted = payload => ({ payload, type: DELETE_START });
export const deleteSuccess = payload => ({ payload, type: DELETE_SUCCESS });
export const deleteError = payload => ({ payload, type: DELETE_ERROR });

export const changeUserData = payload => ({ payload, type: CHANGE_USER_DATA });
export const restoreDefaultUserData = () => ({ type: DEFAULT_USER_DATA });

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
        dispatch(fetchError(err.message || true));
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
        dispatch(fetchError(err.message || true));
        dispatch(restoreDefaultUserData());
      });
  };
};

export const AddNewUserAPI = post => {
  return async dispatch => {
    dispatch(postStarted());

    try {
      await Axios.post('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data', post);
      await new Promise((resolve) => resolve());
      dispatch(postSuccess(post));
    } catch(err) {
      dispatch(postError(err.message || true));
    }
  };
};

export const UpdateUserAPI = put => {
  return async dispatch => {
    dispatch(putStarted());

    try {
      await Axios.put(`https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${put.id}`, put);
      await new Promise((resolve) => resolve());
      dispatch(putSuccess(put));
    } catch(err) {
      dispatch(putError(err.message || true));
    }
  };
};

export const deleteUserAPI = id => {
  return async dispatch => {
    dispatch(deleteStarted());

    try {
      await Axios.delete(`https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${id}`);
      await new Promise((resolve) => resolve());
      dispatch(deleteSuccess(id));
    } catch(err) {
      dispatch(deleteError(err.message || true));
    }
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
    case FETCH_SUCCESS_ALL: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        usersList: action.payload,
        userData: {
          id: 'new',
          name: '',
          email: '',
        },
      };
    }
    case FETCH_SUCCESS_SELECTED: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        userData: {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
        },
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
    case POST_START: {
      return {
        ...statePart,
        post: {
          active: true,
          error: false,
        },
      };
    }
    case POST_SUCCESS: {
      return {
        ...statePart,
        post: {
          active: false,
          error: false,
        },
        usersList: [
          ...statePart.usersList,
          {
            id: action.payload.id,
            email: action.payload.email,
            name: action.payload.name,
          },
        ],
      };
    }
    case POST_ERROR: {
      return {
        ...statePart,
        post: {
          active: false,
          error: action.payload,
        },
      };
    }
    case CHANGE_USER_DATA: {
      const newData = {};
      for (const data in statePart.userData) {
        if(data === action.payload.type) {
          newData[data] = action.payload.value;
        } else {
          newData[data] = statePart.userData[data];
        }
      }
      return {
        ...statePart,
        userData: newData,
      };
    }
    case DEFAULT_USER_DATA: {
      return {
        ...statePart,
        userData: {
          id: 'new',
          name: '',
          email: '',
        },
      };
    }
    case PUT_START: {
      return {
        ...statePart,
        put: {
          active: true,
          error: false,
        },
      };
    }
    case PUT_SUCCESS: {
      return {
        ...statePart,
        usersList: statePart.usersList.map(user => {
          if(user.id === action.payload.id) {
            return {
              ...user,
              name: action.payload.name,
              email: action.payload.email,
            };
          } else {
            return user;
          }
        }),
      };
    }
    case PUT_ERROR: {
      return {
        ...statePart,
        put: {
          active: false,
          error: action.payload,
        },
      };
    }
    case DELETE_START: {
      return {
        ...statePart,
        delete: {
          active: true,
          error: false,
        },
      };
    }
    case DELETE_SUCCESS: {
      return {
        ...statePart,
        delete: {
          active: false,
          error: false,
        },
        usersList: statePart.usersList.filter(user => user.id !== action.payload),
      };
    }
    case DELETE_ERROR: {
      return {
        ...statePart,
        put: {
          active: false,
          error: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
}