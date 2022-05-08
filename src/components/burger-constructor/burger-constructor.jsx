import React from "react";
import burgerConstructorStyles from './burger-constructor.module.css';

import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor() {
	return (
		<article className={burgerConstructorStyles.container}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
				<ConstructorElement
					type="top"
					isLocked={true}
					text="Краторная булка N-200i (верх)"
					price={200}
					thumbnail={''}
				/>
				<ConstructorElement
					text="Краторная булка N-200i (верх)"
					price={50}
					thumbnail={''}
				/>
				<ConstructorElement
					type="bottom"
					isLocked={true}
					text="Краторная булка N-200i (низ)"
					price={200}
					thumbnail={''}
				/>
			</div>
		</article>
	)
}

export default BurgerConstructor;