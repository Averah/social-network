import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import Friends from './components/Friends/Friends';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';




const App = () => {
  let dialogsData = [
    { id: 1, name: "Sasha" },
    { id: 2, name: "Anna" },
    { id: 3, name: "Kate" },
    { id: 4, name: "Max" },
    { id: 5, name: "Dasha" },
  ];

  let messagesData = [
    { id: 1, message: "Hello" },
    { id: 2, message: "Its me" },
    { id: 3, message: "How is your day" },
  ];

  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/profile' component={Profile} />
          <Route path='/dialogs' component={() => <Dialogs appDialogsData={dialogsData} appMessagesData={messagesData} />} />
          <Route path='/friends' component={Friends} />
        </div>
      </div>
    </BrowserRouter>);
}


export default App;
