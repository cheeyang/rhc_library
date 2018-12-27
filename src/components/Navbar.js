import React, { Component } from 'react';
import { Icon, Drawer } from 'antd'
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import MDrawer from '@material-ui/core/Drawer';

const sideList = (
      <div>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            drawerVisible: false
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


    render(){
        return (
            <div className='NavbarContainer'>
                <MDrawer open={this.state.drawerVisible} onClose={this._closeDrawer}>
                <div onClick={this._closeDrawer} onKeyDown={this._closeDrawer}>
                    {sideList}
                </div>
                </MDrawer>
                <button className='drawerIcon' onClick={this._openDrawer}>
                    <Icon className='icon' type="menu-unfold"/>
                </button>
                <div className='Navbar'>
                    <button className='Navbar-item' onClick={()=>this.props.history.push('/browse')}>Browse</button>
                </div>
                <button className='LogOutIcon' onClick={this._onPressLogout}>
                    <Icon className='icon' type="poweroff"/>
                </button>
            </div>
        )
    }
}

export default withRouter(Navbar);
