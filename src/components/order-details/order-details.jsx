import React from 'react';

import CheckMarkIcon from '../../images/CheckMarkIcon.svg';

const OrderDetails = () => {
	return (
		<>
			<p className="text text_type_digits-large pt-20">034536</p>
			<p className="text text_type_main-default pt-8">идентификатор заказа</p>
			<img src={CheckMarkIcon} alt="успешный заказ" className="pt-15 pb-15" />
			<p className="text text_type_main-default pb-2">Ваш заказ начали готовить</p>
			<p className="text text_type_main-default text_color_inactive pb-15">Дождитесь готовности на орбитальной станции</p>
		</>
	)
}

export default OrderDetails;
