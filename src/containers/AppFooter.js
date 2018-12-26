import React, { Component } from 'react';
import { connect } from 'react-redux';

class AppFooter extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='AppFooterWrapper'>
                {!!this.props.session.user ?
                    this.props.session.user.isAnonymous ?
                        `You are currently logged in anonymously. You will not be able to borrow books.`
                        : `You are currently logged in as: ${this.props.session.user.displayName}`
                : `You are not logged in. You will not be able to borrow books.`}
            </div>
        )
    }
}

export default connect(state=>({session: state.session}))(AppFooter);
