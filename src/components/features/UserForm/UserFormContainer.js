import { connect } from 'react-redux';
import UserForm from './UserForm';

import { getSelectedUserData,
  fetchUsersSelected, 
  AddNewUserAPI,
  getLoadingData } from '../../../redux/usersRedux';

const mapStateToProps = (state) => ({
  selectedUser: getSelectedUserData(state),
  loadingData: getLoadingData(state),
});

const mapDispatchToProps = dispatch => ({
  fetchUsersSelected: id => dispatch(fetchUsersSelected(id)),
  AddNewUserAPI: (id, email, name) => dispatch(AddNewUserAPI({id, email, name})),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);