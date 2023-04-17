import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector, Provider } from "react-redux";
import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Preloader from './components/common/Preloader/Preloader';
import Counter from './components/Counter/Counter';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/FindUsers/UsersContainer';
import Friends from './components/Friends/Friends';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/LoginPage';
import NavbarContainer from './components/Navbar/NavbarContainer';
// import ProfileContainerWithHooks from './components/Profile/ProfileContainerWithHooks';
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
        <Route path='/profile/:userId?'>
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
        </Route>
        </Suspense>

      </div>
    </div>
  );
}

const SocialNetworkApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
}

export default SocialNetworkApp;
