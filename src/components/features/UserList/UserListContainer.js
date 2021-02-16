import { connect } from 'react-redux';
import UserList from './UserList';

import { getUsersData, fetchUsers } from '../../../redux/usersRedux';

const mapStateToProps = state => ({
  userList: getUsersData(state),
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);