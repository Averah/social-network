import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector, Provider } from "react-redux";
import { Route, HashRouter, Navigate, Routes } from 'react-router-dom';
import './App.css';
import NotFoundPage from './components/404Page/NotFoundPage';
import Preloader from './components/common/Preloader/Preloader';
import Counter from './components/Counter/Counter';
import UsersContainer from './components/FindUsers/UsersContainer';
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
      <HeaderContainer />
      <NavbarContainer />
      <div className='app-wrapper-content'>
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/profile" />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path='/profile/:userId?' element={<ProfileContainerWithHooks />} />
            <Route path='/dialogs/:userId?' element={<DialogsContainer />} />
            <Route path='/friends' element={<Friends />} />
            <Route path='/users' element={<UsersContainer />} />
            <Route path='/counter' element={<Counter />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </Suspense>

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

{/* <Route path='/profile/:userId?' element={<ProfileContainerWithHooks />}/>
            <ProfileContainerWithHooks />
          </Route>
          <Route path='/dialogs'>
            <DialogsContainer />
          </Route>
          <Route path='/friends'>
            <Friends />
          </Route>
          <Route path='/users'>
            <UsersContainer />
          </Route>
          <Route path='/counter'>
            <Counter />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route> */}