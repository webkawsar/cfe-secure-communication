import React from 'react';
import { useRouteError } from 'react-router-dom';

const UserError = () => {
    const error = useRouteError();
    console.log(error, 'error');
  return (
    <div>UserError</div>
  )
}

export default UserError