import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserData = ({userList}) => (
  <div>
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
            <td>{user.address.city}</td>
            <td>{user.email}</td>
            <td>
              <Link to={`/addedit/${user.id}`}>
                <button type='button' className='btn btn-warning'>Edit</button>
              </Link>
            </td>
            <td><button type='button' className='btn btn-danger'>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

UserData.propTypes = {
  userList: PropTypes.array,
};

export default UserData;