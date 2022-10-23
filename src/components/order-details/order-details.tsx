import React, {FC} from 'react';

import CheckMarkIcon from '../../images/CheckMarkIcon.svg';

interface IOrderDetailsProps {
	orderID: string;
}

const OrderDetails: FC<IOrderDetailsProps> = React.memo(({orderID}) => {
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


export default OrderDetails;
