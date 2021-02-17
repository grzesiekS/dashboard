import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './UserData.module.scss';
import PromptWindow from '../../common/PromptWindow/PromptWindow';

const UserData = ({userList, deleteUser}) => {

  const [promptWindowVisible, setVisible] = useState(false);
  const [id, setId] = useState(0);

  const handlePromptWindow = (id) => {
    setId(id);
    setVisible(true);
  };

  const handleDeleteUser = () => {
    deleteUser(id);
    setVisible(false);
  };

  const closePromptWindow = () => {
    setVisible(false);
  };

  return (
    <div>
      {
        promptWindowVisible 
          ?
          <PromptWindow 
            title='Delete' 
            confirmAction={() => handleDeleteUser()} 
            declineAction={() => closePromptWindow()} 
          />
          :
          null
      }
      {
        userList.length > 0 
          ?
          <table className='table'>
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">City</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {userList.map(user => (
                <tr key={user.id}>
                  <th scope='row'>{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.address === undefined ? '' : user.address.city}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link to={`/addedit/${user.id}`}>
                      <button type='button' className='btn btn-warning'>Edit</button>
                    </Link>
                  </td>
                  <td>
                    <button 
                      type='button' 
                      className='btn btn-danger'
                      onClick={() => handlePromptWindow(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          :
          <h1 className={styles.titleError}>Empty List of Users</h1>
      }
    </div>
  );
};

UserData.propTypes = {
  userList: PropTypes.array,
  deleteUser: PropTypes.func,
};

export default UserData;