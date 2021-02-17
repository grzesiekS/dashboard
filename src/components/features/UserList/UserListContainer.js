import { connect } from 'react-redux';
import UserList from './UserList';

import { getUsersData, fetchUsers, restoreDefaultUserData } from '../../../redux/usersRedux';

const mapStateToProps = state => ({
  userList: getUsersData(state),
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  restoreDefaultUserData: () => dispatch(restoreDefaultUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);