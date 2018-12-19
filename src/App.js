import React from 'react';
import Register from './containers/Register';
import Navbar from './components/Navbar';
import Browse from './containers/Browse';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const App = () =>
    <Router>
        <div className='AppWrapper'>
            <Navbar/>
            <div className='AppBody'>
                <Route exact path='/' render={()=><Redirect to='/register'/>}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/browse' component={Browse}/>
            </div>
        </div>
    </Router>

export default App;
