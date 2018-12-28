import React, { Component } from 'react';
import firebase from '../config/firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            isLoading: false
        }
    }

    componentDidMount(){
        this.fetchUsers();
    }

    fetchUsers = () => {
        this.setState({isLoading:true});
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const usersRef = db.collection('users')
        usersRef.get().then( querySnapshot => {
            const usersCollection = querySnapshot.docs;
            console.log('usersCollection :: ', usersCollection);
            const users = usersCollection.map((doc) => doc.data())
            this.setState({users: users, isLoading:false}, ()=>console.log(this.state));
        })
    }

    updateInput = event => {
        this.setState({[event.target.name] : event.target.value}, ()=>console.log('updated state :: ',this.state));
    }

    render() {
        return (
            <div className='listContainer'>
                { this.state.isLoading ?
                    <div class='fullScreen'>
                        <CircularProgress className='loadingIcon'/>
                    </div>
                : this.state.users && this.state.users.map((user, i)=>
                    <div className='listItem' key={i}>
                        <p>Name:</p>
                        <p>{user.fullName}</p>
                        <p>Email:</p>
                        <p>{user.email}</p>
                    </div>
                )}
            </div>
        )
    }
}
