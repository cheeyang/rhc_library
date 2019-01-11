import React, { Component } from 'react';
import { Icon } from 'antd'
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import './Navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            drawerVisible: false
        }

        this.routeTitleMapping = {
            'Users' : '/users',
            'Browse' : '/browse',
            'Add A Book' : '/add',
            'Confirmation' : '/confirmation',
            'Account' : '/account',
        }
    }
    _onPressLogout = () => {
        firebase.auth().signOut();
        this.props.history.push('/');
    }

    _openDrawer = () => {
        console.log('open drawer');
        this.setState({drawerVisible:true});
    }

    _closeDrawer = () => {
        this.setState({drawerVisible:false});
    }

    _onClickDrawerElement = (text) => {
        const newRoute = this.routeTitleMapping[text];
        switch(text) {
            case 'Logout' :
                this._onPressLogout();
                break;
            default:
                !!newRoute
                ? this.props.history.push(newRoute)
                : this.props.history.push('/page-not-found')
        }
    }

    _getTitleFromRoute = (route) =>
        Object.keys(this.routeTitleMapping).find(key => this.routeTitleMapping[key] === route)


    render(){
        const sideList = (
          <div>
            <List>
              {['Users', 'Browse', 'Add A Book', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text} onClick={()=>this._onClickDrawerElement(text)}>
                  <ListItemText primary={text}/>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['Account', 'Logout'].map((text, index) => (
                <ListItem button key={text} onClick={()=>this._onClickDrawerElement(text)}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        );

        return (
            <div className='NavbarContainer'>
                <Drawer open={this.state.drawerVisible} onClose={this._closeDrawer}>
                    <div onClick={this._closeDrawer} onKeyDown={this._closeDrawer}>
                        {sideList}
                    </div>
                </Drawer>
                <button className='drawerIcon' onClick={this._openDrawer}>
                    <Icon className='icon' type="menu-unfold" style={{fontSize:17}}/>
                </button>
                <div className='Navbar'>
                    <span className='Navbar-item'>{this._getTitleFromRoute(this.props.location.pathname)}</span>
                </div>
                <button className='logOutIcon' onClick={this._onPressLogout}>
                    <Icon className='icon' type="poweroff" style={{fontSize:17}}/>
                </button>
            </div>
        )
    }
}

export default withRouter(Navbar);
