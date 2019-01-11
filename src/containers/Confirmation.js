import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Confirmation extends Component {
    render() {
        return (
            <div> confirmation {this.props.location.state.bookIdsSelected}</div>
        )
    }
}

export default withRouter(Confirmation);
