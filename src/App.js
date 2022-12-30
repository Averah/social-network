import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import DialogsContainer from './components/Dialogs/DialogsContainer';
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
        <Route path='/profile' render={() =>
          <Profile  />
        }
        />
        <Route path='/dialogs' render={() => <DialogsContainer />} />
        <Route path='/friends' render={() => <Friends />} />
      </div>
    </div>
  );
}


export default App;
