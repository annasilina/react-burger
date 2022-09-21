import React from 'react';

import CheckMarkIcon from '../../images/CheckMarkIcon.svg';
import PropTypes from 'prop-types';

const OrderDetails = React.memo(({orderID}) => {
	return (
		<>
			<p className='text text_type_digits-large pt-20'>{orderID}</p>
			<p className='text text_type_main-default pt-8'>идентификатор заказа</p>
			<img src={CheckMarkIcon} alt='успешный заказ' className='pt-15 pb-15'/>
			<p className='text text_type_main-default pb-2'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-default text_color_inactive pb-15'>
				Дождитесь готовности на орбитальной станции
			</p>
		</>
	);
});

OrderDetails.propTypes = {
	orderID: PropTypes.number.isRequired,
};

export default OrderDetails;
