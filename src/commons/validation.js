/* eslint-disable eqeqeq */
import store from './../store';

import _ from 'lodash';
import { formErrorHandler } from './../actions';

export const createProductDetail = (payload) => {
	if (payload.product_category_id === 0) {
		store.dispatch(formErrorHandler('*Kategori Produk harus dipilih'));
		return false;
	}
	if (!payload.name && !payload.product_id) {
		store.dispatch(formErrorHandler('*Nama harus diisi'));
		return false;
	}
	if (payload.stock0 === undefined || payload.stock0 <= 0) {
		store.dispatch(formErrorHandler('*Stok harus diisi'));
		return false;
	}
	if (!('supplier_id' in payload) || payload.supplier_id == 0) {
		store.dispatch(formErrorHandler('*Supplier harus dipilih'));
		return false;
	}
	if (!_.isEmpty(payload.supplier) && (_.isEmpty(payload.supplier_phone) || payload.supplier_phone === '')) {
		store.dispatch(formErrorHandler('*Nomor Telepon Supplier harus diisi'));
		return false;
	}

	store.dispatch(formErrorHandler(''));
	return true;
}
