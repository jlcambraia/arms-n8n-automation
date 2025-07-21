import { useEffect, useState } from 'react';
import ProposalsList from './components/ProposalList.jsx';

const App = () => {
	const [proposals, setProposals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchProposals = async () => {
		setIsLoading(true);
		try {
			const res = await fetch(import.meta.env.VITE_BUSCAR_PROPOSTAS);
			const data = await res.json();
			setProposals(data);
		} catch (error) {
			console.error('Erro ao buscar propostas:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchProposals();
	}, []);

	console.log('Atualizou');

	return (
		<div className='app'>
			<header className='app__header'>
				<div className='header-content'>
					<h1 className='app__title'>
						<span className='title-icon'>💼</span>
						Dashboard de Propostas
					</h1>
				</div>

				<div className='stats-grid'>
					<div className='stat-card'>
						<div className='stat-card__icon'>🔄</div>
						<div className='stat-card__content' onClick={fetchProposals}>
							<span className='stat-card__text'>
								{isLoading ? 'Buscando...' : 'Buscar propostas'}
							</span>
						</div>
					</div>
				</div>
			</header>

			<main className='app__content'>
				{isLoading ? (
					<div className='loading-state'>
						<div className='loading-spinner'></div>
						<p>Carregando propostas...</p>
					</div>
				) : (
					<ProposalsList proposals={proposals} />
				)}
			</main>
		</div>
	);
};

export default App;
