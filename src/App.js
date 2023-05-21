import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector, Provider } from "react-redux";
import { Route, HashRouter, Navigate, Routes } from 'react-router-dom';
import './App.css';
import NotFoundPage from './components/404Page/NotFoundPage';
import Preloader from './components/common/Preloader/Preloader';
import Counter from './components/Counter/Counter';
import FindUsersContainer from './components/FindUsers/FindUsersContainer';
import Friends from './components/Friends/Friends';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/LoginPage';
import NavbarContainer from './components/Navbar/NavbarContainer';
import { initialization } from './redux/appReducer';
import store from './redux/redux-store';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainerWithHooks = React.lazy(() => import('./components/Profile/ProfileContainerWithHooks'));


const App = (props) => {

  const dispatch = useDispatch()
  const isAppInitialized = useSelector(state => state.app.initialized)

  useEffect(() => {
    dispatch(initialization())
  }, [])

  if (!isAppInitialized) {
    return <Preloader />
  }
  return (
    <div className='app-wrapper'>
      <div className='header'>
        <HeaderContainer />
      </div>
      <div className='flex-container'>
      <div className='navigation'>
        <NavbarContainer />
      </div>
      <div className='content'>
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/profile" />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path='/profile/:userId?' element={<ProfileContainerWithHooks />} />
            <Route path='/dialogs/:userId?' element={<DialogsContainer />} />
            <Route path='/friends' element={<Friends />} />
            <Route path='/users' element={<FindUsersContainer />} />
            <Route path='/counter' element={<Counter />} />
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

