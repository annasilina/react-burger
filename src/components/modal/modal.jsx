import React from 'react';
import ReactDOM from 'react-dom';
import {useEffect} from 'react';

import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

const modalsContainer = document.querySelector('#modals');

const Modal = ({ title, handleClose, handleCloseEsc, children }) => {

	useEffect(() => {
		document.addEventListener('keydown', handleCloseEsc);

		return () => {
			document.removeEventListener('keydown', handleCloseEsc);
		};
	}, []);

	return ReactDOM.createPortal(
		<div className={`${styles.popup}`}>
			<div className={`${styles.container} pt-10 pb-15 pr-10 pl-10`}>
				{ title && <h3 className={`${styles.title} text text_type_main-large pt-3 pb-3`}>{title}</h3> }
				<div className={`${styles.closeBtn}`} onClick={handleClose}>
					<CloseIcon type="primary" />
				</div>
				{children}
			</div>
			<ModalOverlay onClick={handleClose}/>
		</div>, modalsContainer);
};

Modal.propTypes = {
	title: PropTypes.string,
	handleClose: PropTypes.func.isRequired,
	handleCloseEsc: PropTypes.func.isRequired,
	children: PropTypes.element.isRequired
}

export default Modal;