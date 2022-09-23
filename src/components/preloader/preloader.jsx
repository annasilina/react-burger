import styles from './preloader.module.css';

const Preloader = () => {
	return (
		<div className={`${styles.main}`}>
			<div className={`${styles.spinner}`}></div>
		</div>
	);
};

export default Preloader;
