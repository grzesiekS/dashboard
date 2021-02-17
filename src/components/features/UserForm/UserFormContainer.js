import { connect } from 'react-redux';
import UserForm from './UserForm';

import { getSelectedUserData,
  fetchUsersSelected, 
  AddNewUserAPI,
  UpdateUserAPI,
  changeUserData,
  restoreDefaultUserData,
  getLoadingData } from '../../../redux/usersRedux';

const mapStateToProps = (state) => ({
  selectedUser: getSelectedUserData(state),
  loadingData: getLoadingData(state),
});

const mapDispatchToProps = dispatch => ({
  fetchUsersSelected: id => dispatch(fetchUsersSelected(id)),
  AddNewUserAPI: (id, email, name) => dispatch(AddNewUserAPI({id, email, name})),
  changeUserData: (type, value) => dispatch(changeUserData({type, value})),
  UpdateUserAPI: (id, email, name) => dispatch(UpdateUserAPI({id, email, name})),
  restoreDefaultUserData: () => dispatch(restoreDefaultUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);