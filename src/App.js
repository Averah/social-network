import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import Friends from './components/Friends/Friends';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
// import { addPost, updateNewPostText } from './redux/state';



const App = (props) => {


  return (

    <div className='app-wrapper'>
      <Header />
      <Navbar state={props.state.sidebar} />
      <div className='app-wrapper-content'>
        <Route path='/profile' render={() =>
          <Profile
            dispatch={props.dispatch}
            profilePage={props.state.profilePage} />
        }
        />
        <Route path='/dialogs' render={() => <Dialogs 
        dialogsPage={props.state.dialogsPage} 
        dispatch={props.dispatch}/>} />
        <Route path='/friends' render={() => <Friends />} />
      </div>
    </div>
  );
}


export default App;
