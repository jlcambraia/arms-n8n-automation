import { useEffect, useState } from 'react';
import ProposalsList from './components/ProposalList.jsx';

const App = () => {
	const [proposals, setProposals] = useState([]);

	useEffect(() => {
		const fetchProposals = async () => {
			try {
				const res = await fetch(
					'https://jlcambraia.app.n8n.cloud/webhook/propostas'
				);
				const data = await res.json();
				setProposals(data);
			} catch (error) {
				console.error('Erro ao buscar propostas:', error);
			}
		};

		fetchProposals();

		const intervalId = setInterval(fetchProposals, 10000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className='app'>
			<header className='app__header'>
				<h1 className='app__title'>Propostas Comerciais</h1>
			</header>

			<main className='app__content'>
				<ProposalsList proposals={proposals} />
			</main>
		</div>
	);
};

export default App;
