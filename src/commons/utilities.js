/* eslint-disable eqeqeq */
import React from 'react';
import _ from 'lodash';
import NumberFormat from 'react-number-format';

export const convertCurrencyToInteger = (amount) => {
    let formatedAmount;
    formatedAmount = _.replace(amount, 'Rp ', '');
    formatedAmount = _.replace(formatedAmount, new RegExp('[.]','g'), '');

    return formatedAmount;
}

export const convertIntegerToCurrency = (amount) => {
    return <NumberFormat value={amount} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp '} />
}

export const PermissionAlertComponent = () => {
    return <div className="m-2 p-2 bg-warning"><p className="m-0 text-muted"><i className="fa fa-lock"></i> You have no perrmission access.</p></div>
}