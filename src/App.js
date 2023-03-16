import React from 'react';
import { Icon } from '@iconify/react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	return (
		<div className='container'>
			<h1 className ='mt-3'>
				BudgetBook
			</h1>
			<span>
				<a href="https://www.linkedin.com/in/ryangormican/">
					<Icon icon="mdi:linkedin" color="#0e76a8" width="40" />
				</a>
				<a href="https://github.com/RyanGormican/BudgetBook">
					<Icon icon="mdi:github" color="#e8eaea" width="40" />
				</a>
				<a href="https://ryangormicanportfoliohub.vercel.app/">
					<Icon icon="teenyicons:computer-outline" color="#199c35" width="40" />
				</a>
			</span>
			<div className="row mt-3">
				<div className="col-sm">

				</div>
			</div>
		</div> 
	);
};

export default App;
