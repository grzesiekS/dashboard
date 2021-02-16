import { connect } from 'react-redux';
import UserForm from './UserForm';

import { getSelectedUserData,
  fetchUsersSelected, 
  AddNewUserAPI,
  changeUserData,
  getLoadingData } from '../../../redux/usersRedux';

const mapStateToProps = (state) => ({
  selectedUser: getSelectedUserData(state),
  loadingData: getLoadingData(state),
});

const mapDispatchToProps = dispatch => ({
  fetchUsersSelected: id => dispatch(fetchUsersSelected(id)),
  AddNewUserAPI: (id, email, name) => dispatch(AddNewUserAPI({id, email, name})),
  changeUserData: (type, value) => dispatch(changeUserData({type, value})),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);