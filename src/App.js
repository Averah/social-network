import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Counter from './components/Counter/Counter';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/FindUsers/UsersContainer';
import FindUsersContainer from './components/FindUsers/UsersContainer';
import Friends from './components/Friends/Friends';
import HeaderContainer from './components/Header/HeaderContainer';

import NavbarContainer from './components/Navbar/NavbarContainer';

import ProfileContainer from './components/Profile/ProfileContainer';
// import { addPost, updateNewPostText } from './redux/state';



const App = (props) => {
  return (
    <div className='app-wrapper'>
      <HeaderContainer/>
      <NavbarContainer />
      <div className='app-wrapper-content'>
        <Route path='/profile/:userId?'>
          <ProfileContainer />
        </Route>
        <Route path='/dialogs'>
          <DialogsContainer />
        </Route>
        <Route path='/friends'>
          <Friends />
        </Route>
        <Route path='/users'>
          <UsersContainer/>
        </Route>
        <Route path='/counter'>
          <Counter/>
        </Route>
      </div>
    </div>
  );
}


export default App;
