import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import FindUsersContainer from './components/FindUsers/UsersContainer';
import Friends from './components/Friends/Friends';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import NavbarContainer from './components/Navbar/NavbarContainer';
import Profile from './components/Profile/Profile';
// import { addPost, updateNewPostText } from './redux/state';



const App = (props) => {
  return (
    <div className='app-wrapper'>
      <Header />
      <NavbarContainer />
      <div className='app-wrapper-content'>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/dialogs'>
          <DialogsContainer />
        </Route>
        <Route path='/friends'>
          <Friends />
        </Route>
        <Route path='/users'>
          <FindUsersContainer />
          
        </Route>
      </div>
    </div>
  );
}


export default App;
