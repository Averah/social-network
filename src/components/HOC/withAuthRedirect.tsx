import React from "react";
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { Navigate } from 'react-router-dom';
import { FC } from 'react';


export function withAuthRedirect<P>(Component: React.ComponentType<P>) {
    const RedirectComponent: FC<P> = (props) => {
        const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
        if (!isAuth) return <Navigate to ='/login' />
        return <Component { ...props } />
    }
    return RedirectComponent
}