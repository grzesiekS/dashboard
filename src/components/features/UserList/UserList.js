import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './UserList.module.scss';

import UserData from '../UserData/UserData';
import { Link } from 'react-router-dom';

class UserList extends React.Component {

  componentDidMount() {
    const {fetchUsers} = this.props;

    fetchUsers();
  }

  render() {

    const {userList} = this.props;

    return (
      <section className={clsx('container-xl', styles.userList)}>
        <div className='row justify-content-between align-items-center'>
          <div className='col'>
            <p className={styles.subtitle}>User List</p>
          </div>
          <div className='col text-right'>
            <Link to='/addedit/new'>
              <button type='button' className='btn btn-primary'>Add new</button>
            </Link>
          </div>
        </div>
        <UserData userList={userList} />
      </section>
    );
  }
}

UserList.propTypes = {
  fetchUsers: PropTypes.func,
  userList: PropTypes.array,
};

UserList.defaultProps = {
  fetchUsers: () => {},
};

export default UserList;