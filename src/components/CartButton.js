import React, { Component } from 'react';
import './CartButton.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const CartButton = (props) => {
    const { bookIdsSelected } = props.browse;
    console.log('location :: ', props.location.pathname);
    const showButton = !!bookIdsSelected.length>0 && props.location.pathname==='/browse';
    return (
        <div className='cartButtonWrapper'>
            <div className={`${showButton?'show' : 'hide'} cartButton`}>
                Borrow {bookIdsSelected.length} {bookIdsSelected.length>1?'Books':'Book'}
            </div>
        </div>
    )
}

export default withRouter(connect( ({browse})=>({browse}) )(CartButton));
