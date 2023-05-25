import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector, Provider } from "react-redux";
import { Route, HashRouter, Navigate, Routes } from 'react-router-dom';
import './App.css';
import NotFoundPage from './components/404Page/NotFoundPage';
import Preloader from './components/common/Preloader/Preloader';
import FindUsers from './components/FindUsers/FindUsers';
import Friends from './components/Friends/Friends';
import LoginPage from './components/Login/LoginPage';
import { initialization } from './redux/appReducer.ts';
import store from './redux/redux-store';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


const App = (props) => {

  const dispatch = useDispatch()
  const isAppInitialized = useSelector(state => state.app.initialized)

  useEffect(() => {
    dispatch(initialization())
  }, [dispatch])

  if (!isAppInitialized) {
    return <Preloader />
  }
  return (
    <div className='app-wrapper'>
      <div className='header'>
        <Header />
      </div>
      <div className='flex-container'>
      <div className='navigation'>
        <Navbar />
      </div>
      <div className='content'>
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/profile" />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path='/profile/:userId?' element={<ProfileContainer />} />
            <Route path='/dialogs/:userId?' element={<Dialogs />} />
            <Route path='/friends' element={<Friends />} />
            <Route path='/users' element={<FindUsers />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </Suspense>
        </div>
      </div>
    </div>
  );
}

const SocialNetworkApp = (props) => {
  return <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
}

export default SocialNetworkApp;

