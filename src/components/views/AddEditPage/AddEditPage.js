import React from 'react';
import PropTypes from 'prop-types';

import UserForm from '../../features/UserForm/UserFormContainer';

const AddEditPage = ({...props}) => (
  <UserForm id={props.match.params.id} />
);

AddEditPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default AddEditPage;