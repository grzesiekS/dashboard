import { connect } from 'react-redux';
import UserList from './UserList';

import { getUsersData, fetchUsers, restoreDefaultUserData, deleteUserAPI, deleteSuccess } from '../../../redux/usersRedux';

const mapStateToProps = state => ({
  userList: getUsersData(state),
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  restoreDefaultUserData: () => dispatch(restoreDefaultUserData()),
  deleteUser: id => dispatch(deleteUserAPI(id)),
  /* Only to handle local data because of the test API */
  deleteSuccess: id => dispatch(deleteSuccess(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);