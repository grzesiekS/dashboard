import { connect } from 'react-redux';
import UserForm from './UserForm';

import { getSelectedUserData,
  getSelectedUserLocal,
  fetchUsersSelected, 
  AddNewUserAPI,
  UpdateUserAPI,
  changeUserData,
  restoreDefaultUserData, 
  getLoadingData,
  fetchSuccessSelected,
  putSuccess,
} from '../../../redux/usersRedux';

const mapStateToProps = (state, props) => ({
  selectedUser: getSelectedUserData(state),
  loadingData: getLoadingData(state),
  /* Only to handle local data because of the test API */
  getSelectedUserLocal: getSelectedUserLocal(state, props.id),
});

const mapDispatchToProps = dispatch => ({
  fetchUsersSelected: id => dispatch(fetchUsersSelected(id)),
  AddNewUserAPI: (id, email, name) => dispatch(AddNewUserAPI({id, email, name})),
  changeUserData: (type, value) => dispatch(changeUserData({type, value})),
  UpdateUserAPI: (id, email, name) => dispatch(UpdateUserAPI({id, email, name})),
  restoreDefaultUserData: () => dispatch(restoreDefaultUserData()),
  /* Only to handle local data because of the test API */
  fetchSuccessSelected: (id, name, email) => dispatch(fetchSuccessSelected({id, name, email})),
  putSuccess: (id, email, name) => dispatch(putSuccess({id, email, name})),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);