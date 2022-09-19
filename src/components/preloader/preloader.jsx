import styles from './preloader.module.css';

const Preloader = () => {
	return (
		<div className='p-10'>
			<div className={`${styles.spinner}`}>
			</div>
		</div>
	)
}


export default Preloader
