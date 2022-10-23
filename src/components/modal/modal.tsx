import React, {FC, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalsContainer = document.querySelector('#modals') as HTMLElement;

interface IModalProps {
	title: string;
	children: JSX.Element;
	handleClose: () => void;
}

const Modal: FC<IModalProps> = ({title, children, handleClose}) => {
	useEffect(() => {
		const handleCloseEsc = (e: KeyboardEvent) => {
			e.key === 'Escape' && handleClose();
		};

		document.addEventListener('keydown', handleCloseEsc);

		return () => {
			document.removeEventListener('keydown', handleCloseEsc);
		};
	}, [handleClose]);

	return ReactDOM.createPortal(
		<div className={`${styles.popup}`}>
			<div className={`${styles.container} pt-10 pb-15 pr-10 pl-10`}>
				{title && (
					<h3 className={`${styles.title} text text_type_main-large pt-3 pb-3`}>
						{title}
					</h3>
				)}
				<div className={`${styles.closeBtn}`} onClick={handleClose}>
					<CloseIcon type='primary'/>
				</div>
				{children}
			</div>
			<ModalOverlay onClick={handleClose}/>
		</div>,
		modalsContainer
	);
};

export default Modal;
