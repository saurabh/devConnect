import React, { Fragment } from 'react'

const NotFound = () => {
  return (
    <Fragment>
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle"/> Page Not Found
      </h1>
      <p className="large">X_X This page does not exist X_X</p>
    </Fragment>
  )
}

export default NotFound