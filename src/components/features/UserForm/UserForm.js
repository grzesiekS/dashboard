import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import uid from 'uniqid';
import { Redirect } from 'react-router-dom';

import styles from './UserForm.module.scss';
import { Link } from 'react-router-dom';

class UserForm extends React.Component {
  state = {
    email: '',
    name: '',
    inputValidation: false,
    redirect: false,
  }

  componentDidMount() {
    const {fetchUsersSelected, id} = this.props;

    if(id !== 'new') {
      fetchUsersSelected(id);
    }
  }

  handleEmailChange(newValue) {
    this.setState({
      ...this.state,
      email: newValue,
    });
  }

  handleNameChange(newValue) {
    this.setState({
      ...this.state,
      name: newValue,
    });
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

    if(id === 'new' || selectedUser.id === undefined) {
      if(this.state.email === '' || this.state.name === '') {
        this.handleInputValidation();
      } else {
        await AddNewUserAPI(uid() ,this.state.email, this.state.name);
        this.handleRedirectChange();
      }
    }
  }

  render() {

    const {loadingData} = this.props;

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
                  value={this.state.email}
                  onChange={e => this.handleEmailChange(e.target.value)}
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
                  value={this.state.name}
                  onChange={e => this.handleNameChange(e.currentTarget.value)}
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
};

UserForm.defaultProps = {
  fetchUsersSelected: () => {},
  AddNewUserAPI: () => {},
};

export default UserForm;