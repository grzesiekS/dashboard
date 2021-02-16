import { connect } from 'react-redux';
import UserForm from './UserForm';

import { getSelectedUserData, fetchUsersSelected } from '../../../redux/usersRedux';

const mapStateToProps = (state) => ({
  selectedUser: getSelectedUserData(state),
});

const mapDispatchToProps = dispatch => ({
  fetchUsersSelected: id => dispatch(fetchUsersSelected(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);