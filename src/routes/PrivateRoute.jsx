import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';



const PrivateRoute = ({children}) => {
    const {user} =  useSelector(state => state.auth);
    const location = useLocation();
    const loadedComponent = user ? children : <Navigate to='/login' state={{from: location.pathname}} />

    return (
        <>
            {loadedComponent}
        </>
    );
};

export default PrivateRoute;