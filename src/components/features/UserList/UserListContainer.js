import { connect } from 'react-redux';
import UserList from './UserList';

import { getUsersData, fetchUsers, restoreDefaultUserData, deleteUserAPI } from '../../../redux/usersRedux';

const mapStateToProps = state => ({
  userList: getUsersData(state),
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  restoreDefaultUserData: () => dispatch(restoreDefaultUserData()),
  deleteUser: id => dispatch(deleteUserAPI(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);