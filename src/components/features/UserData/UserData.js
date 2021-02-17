import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './UserData.module.scss';
import PromptWindow from '../../common/PromptWindow/PromptWindow';

const UserData = ({userList, deleteUser, deleteUserLocal}) => {

  const [promptWindowVisible, setVisible] = useState(false);
  const [id, setId] = useState(0);
  const [arrayList, setArrayList] = useState([]);
  const [sortUser, setSortUser] = useState(0);

  useEffect(() => {
    setArrayList(userList);
  },[userList]);

  const handlePromptWindow = (id) => {
    setId(id);
    setVisible(true);
  };

  const handleDeleteUser = () => {
    deleteUser(id);
    setVisible(false);
    /* Only to handle local data because of the test API */
    deleteUserLocal(id);
  };

  const closePromptWindow = () => {
    setVisible(false);
  };

  const handleUsernameSort = () => {
    if(sortUser === 0) {
      setSortUser(1);
      setArrayList(arrayList.sort((a, b) => (a.username > b.username) ? 1 : -1));
    } else if(sortUser === 1) {
      setSortUser(-1);
      setArrayList(arrayList.sort((a, b) => (a.username < b.username) ? 1 : -1));
    } else {
      setSortUser(1);
      setArrayList(arrayList.sort((a, b) => (a.username > b.username) ? 1 : -1));
    }
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
                <th scope="col"><button 
                  type='button' 
                  className='btn btn-link'
                  onClick={() => handleUsernameSort()}
                >
                    Username
                </button></th>
                <th scope="col">City</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {arrayList.map(user => (
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
  deleteUserLocal: PropTypes.func,
};

export default UserData;