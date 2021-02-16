import React from 'react';
import clsx from 'clsx';

import styles from './UserForm.module.scss';
import { Link } from 'react-router-dom';

class UserForm extends React.Component {
  state = {
    email: '',
    name: '',
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

  render() {
    return (
      <section className={clsx('container-xl', styles.userForm)}>
        <p className={styles.subtitle}>Form</p>
        <form>
          <div className='mb-2'>
            <label htmlFor='email' className='form-label'>Email</label>
            <input 
              type="email" 
              className='form-control' 
              id="email"
              value={this.state.email}
              onChange={e => this.handleEmailChange(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='name' className='form-label'>Name</label>
            <input 
              type='text' 
              className='form-control' 
              id='name'
              value={this.state.name}
              onChange={e => this.handleNameChange(e.currentTarget.value)}
            />
          </div>
        </form>
        <div className='row justify-content-end'>
          <div className='col-auto'>
            <button type='button' className='btn btn-outline-success'>Submit</button>
          </div>
          <div className='col-auto'>
            <Link to='/'>
              <button type='button' className='btn btn-outline-danger'>Cancel</button>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default UserForm;