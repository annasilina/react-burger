import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import {useEffect} from 'react';

import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import {ModalContext} from '../../context/modal-context';

const modalsContainer = document.querySelector('#modals');

const Modal = ({ title, children }) => {
	const ingredientDetailsVisibility = useContext(ModalContext).setIsIngredientDetailsOpened;
	const orderDetailsVisibility = useContext(ModalContext).setIsOrderDetailsOpened;

	const closeAllModals = () => {
		ingredientDetailsVisibility(false)
		orderDetailsVisibility(false)
	};

	useEffect(() => {
		const handleCloseEsc = (e) => {
			e.key === "Escape" && closeAllModals();
		}

		document.addEventListener('keydown', handleCloseEsc);

		return () => {
			document.removeEventListener('keydown', handleCloseEsc);
		};
	}, []);

	return ReactDOM.createPortal(
		<div className={`${styles.popup}`}>
			<div className={`${styles.container} pt-10 pb-15 pr-10 pl-10`}>
				{ title && <h3 className={`${styles.title} text text_type_main-large pt-3 pb-3`}>{title}</h3> }
				<div className={`${styles.closeBtn}`} onClick={closeAllModals}>
					<CloseIcon type="primary" />
				</div>
				{children}
			</div>
			<ModalOverlay onClick={closeAllModals}/>
		</div>, modalsContainer);
};

Modal.propTypes = {
	title: PropTypes.string,
	children: PropTypes.element.isRequired
}

export default Modal;