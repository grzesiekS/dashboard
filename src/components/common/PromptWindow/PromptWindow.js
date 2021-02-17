import React from 'react';
import PropTypes from 'prop-types';

import styles from './PromptWindow.module.scss';


const PromptWindow = ({title, confirmAction, declineAction}) => {
  return(
    <div className={styles.promptWindow}>
      <div>
        <p className={styles.promptTitle}>{title}</p>
        <div className='row'>
          <div className='col-auto'>
            <button 
              type='button' 
              className='btn btn-warning'
              onClick={() => confirmAction()}
            >
                Yes
            </button>
          </div>
          <div className='col-auto'>
            <button 
              type='button' 
              className='btn btn-danger'
              onClick={() => declineAction()}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PromptWindow.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  confirmAction: PropTypes.func,
  declineAction: PropTypes.func,
};

PromptWindow.defaultProps = {
  confirmAction: () => {},
  declineAction: () => {},
};

export default PromptWindow;