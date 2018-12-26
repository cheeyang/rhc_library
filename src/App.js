import React from 'react';
import Register from './containers/Register';
import Navbar from './components/Navbar';
import Browse from './containers/Browse';
import Login from './containers/Login';
import AdminPage from './containers/AdminPage';
import PreLoginHeader from './components/PreLoginHeader';
import AppFooter from './containers/AppFooter';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const App = (props) => {
    const { user } = props.session;
    return (
        <Router>
            <div className='AppWrapper'>
                {!!user ? <Navbar/> : <PreLoginHeader/>}
                <div className='AppBody'>
                    <Route exact path='/' render={()=><Redirect to='/login'/>}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/browse' component={Browse}/>
                    <Route exact path='/admin' component={AdminPage}/>
                </div>
                <AppFooter/>
            </div>
        </Router>
    )
}

export default connect(({session})=>({session}))(App);
