import React, { Component } from 'react';
import './ProceedButton.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearSelected } from 'containers/Browse/actions.js';
import { withRouter } from 'react-router-dom';

class ProceedButton extends Component {
    constructor(props) {
        super(props);
    }
    _goToConfirmationPage = (bookIdsSelected) => {
        this.props.history.push({
            pathname: '/confirmation',
            state: {
                bookIdsSelected
            }
        });
    }
    render() {
        const { bookIdsSelected } = this.props.browse;
        console.log('location :: ', this.props.location.pathname);
        const showButton = !!bookIdsSelected.length>0 && this.props.location.pathname==='/browse';
        return (
            <div className='proceedButtonWrapper'>
                <div onClick={()=>this._goToConfirmationPage(bookIdsSelected)} className={`${showButton?'show' : 'hide'} proceedButton`}>
                    <span>Proceed to borrow {bookIdsSelected.length} {bookIdsSelected.length>1?'books':'book'}</span>
                    <img className='nextArrow' src={require('resources/images/nextArrow.png')}/>
                </div>
            </div>
        )
    }

}

export default withRouter(connect( ({browse})=>({browse}), (dispatch)=>bindActionCreators({clearSelected}, dispatch))(ProceedButton));
