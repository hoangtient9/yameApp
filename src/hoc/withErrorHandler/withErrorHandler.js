import React, { Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import httpError from '../../hooks/httpError';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = httpError(axios)

    return (
      <Fragment>
        {
        error ?
        <Modal show={error} modalClose={clearError}>
          {error ? error.message : null}
        </Modal>
        : null
        }
        
        <WrappedComponent {...props}/>
      </Fragment>
    )
  }
}

export default withErrorHandler;