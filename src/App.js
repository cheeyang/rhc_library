import React from 'react';
import Register from './containers/Register';
import Navbar from './components/Navbar';
import Browse from './containers/Browse';
import Login from './containers/Login';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from 'core/store';

const App = () =>
    <Provider store={Store}>
        <Router>
            <div className='AppWrapper'>
                <Navbar/>
                <div className='AppBody'>
                    <Route exact path='/' render={()=><Redirect to='/login'/>}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/browse' component={Browse}/>
                </div>
            </div>
        </Router>
    </Provider>

export default App;
