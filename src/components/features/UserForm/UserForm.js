import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import uid from 'uniqid';
import { Redirect } from 'react-router-dom';

import styles from './UserForm.module.scss';
import { Link } from 'react-router-dom';

class UserForm extends React.Component {
  state = {
    inputValidation: false,
    redirect: false,
  }

  async componentDidMount() {
    const {fetchUsersSelected, id} = this.props;

    if(id !== 'new') {
      fetchUsersSelected(id);
    }
  }

  handleRedirectChange() {
    this.setState({
      ...this.state,
      redirect: true,
    });
  }

  handleInputValidation() {
    this.setState({
      ...this.state,
      inputValidation: true,
    });
  }

  async handleSubmit() {
    const {selectedUser, id, AddNewUserAPI} = this.props;


    if(this.state.email === '' || this.state.name === '') {
      this.handleInputValidation();
    } else {
      if(id === 'new' || selectedUser.id === undefined) {
        await AddNewUserAPI(uid() ,this.state.email, this.state.name);
        this.handleRedirectChange();
      } else if (selectedUser.id.toString() === id) {
        console.log('test');
      }
    }  
  }

  render() {

    const {loadingData, selectedUser, changeUserData} = this.props;

    if(this.state.redirect) {
      return (<Redirect to='/' />);
    } else {
      return (
        loadingData.active && loadingData.active === undefined
          ?
          null
          :
          <section className={clsx('container-xl', styles.userForm)}>
            <p className={styles.subtitle}>Form</p>
            <form>
              <div className='mb-2'>
                <label htmlFor='email' className='form-label'>Email</label>
                <input 
                  type="email" 
                  className={this.state.inputValidation && this.state.email === '' ? clsx('form-control', styles.inputError) : 'form-control'}
                  id="email"
                  value={selectedUser.email || ''}
                  onChange={e => changeUserData(e.currentTarget.id, e.currentTarget.value)}
                />
                {
                  this.state.inputValidation && this.state.email === '' 
                    ? 
                    <p className={styles.errorMessage}>Email is required</p>
                    :
                    null
                }
              </div>
              <div className='mb-2'>
                <label htmlFor='name' className='form-label'>Name</label>
                <input 
                  type='text' 
                  className={this.state.inputValidation && this.state.name === '' ? clsx('form-control', styles.inputError) : 'form-control'} 
                  id='name'
                  value={selectedUser.name || ''}
                  onChange={e => changeUserData(e.currentTarget.id, e.currentTarget.value)}
                />
                {
                  this.state.inputValidation && this.state.name === '' 
                    ? 
                    <p className={styles.errorMessage}>Name is required</p>
                    :
                    null
                }
              </div>
            </form>
            <div className='row justify-content-end'>
              <div className='col-auto'>
                <Link to='/'>
                  <button type='button' className='btn btn-outline-danger'>Cancel</button>
                </Link>
              </div>
              <div className='col-auto'>
                <button 
                  type='button' 
                  className='btn btn-outline-success'
                  onClick={() => this.handleSubmit()}
                >Submit</button>
              </div>
            </div>
          </section>
      );
    }
  }
}

UserForm.propTypes = {
  selectedUser: PropTypes.object,
  fetchUsersSelected: PropTypes.func,
  id: PropTypes.string,
  loadingData: PropTypes.object,
  AddNewUserAPI: PropTypes.func,
  changeUserData: PropTypes.func,
};

UserForm.defaultProps = {
  fetchUsersSelected: () => {},
  AddNewUserAPI: () => {},
  changeUserData: () => {},
};

export default UserForm;