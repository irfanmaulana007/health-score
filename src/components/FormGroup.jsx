import React from 'react';
import _ from 'lodash';

const FormGroup = (props) => {
	let inputElement = null;

	switch (props.type) {
		case ('textarea'):
			inputElement = <textarea id={props.id} {...props} className={`form-control ` + props.className } autoComplete="off"/>
			break

		default:
			inputElement = <input id={props.id} {...props} className={`form-control ` + props.className } autoComplete="off"/>
	}

	return (
		<div>
			<div className="form-group">
				<label htmlFor={_.replace(props.name, '_', ' ')} className="text-uppercase text-muted small"><b>{(props.label) ? props.label : _.replace(props.name, '_', ' ')} {(props.required) && <span className="text-danger">*</span>} </b></label>
				{inputElement}
			</div>
		</div>
	)
	
}

export default FormGroup