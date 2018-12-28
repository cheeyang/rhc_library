import React, { Component } from 'react';
import { Icon } from 'antd'
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';

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

    _onClickDrawerElement = (text) => {
        switch(text) {
            case 'Logout' :
                this._onPressLogout();
                break;
            case 'Users' :
                this.props.history.push('/users');
                break;
            case 'Browse' :
                this.props.history.push('/browse');
                break;
            case 'Add A Book':
                this.props.history.push('/add');
                break;
            case 'Account':
                this.props.history.push('/account');
                break;
            default:
                this.props.history.push('/not-found');
        }
    }


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
                    <span className='Navbar-item'>Browse</span>
                </div>
                <button className='logOutIcon' onClick={this._onPressLogout}>
                    <Icon className='icon' type="poweroff" style={{fontSize:17}}/>
                </button>
            </div>
        )
    }
}

export default withRouter(Navbar);
