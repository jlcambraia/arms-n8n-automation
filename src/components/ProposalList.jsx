import { useState } from 'react';

const ProposalList = ({ proposals }) => {
	const [showModal, setShowModal] = useState(false);
	const [selectedProposalId, setSelectedProposalId] = useState(null);
	const [selectedChannel, setSelectedChannel] = useState('');
	const [destino, setDestino] = useState('');

	const handleOpenModal = (id, canal) => {
		setSelectedProposalId(id);
		setSelectedChannel(canal);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setDestino('');
	};

	const handleSend = async () => {
		try {
			const response = await fetch(
				'https://jlcambraia.app.n8n.cloud/webhook/enviar-resumo',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						_id: selectedProposalId,
						canal: selectedChannel,
						destino: destino,
					}),
				}
			);

			if (!response.ok) {
				throw new Error(`Erro na solicitação: ${response.statusText}`);
			}

			const result = await response.json();
			console.log('✅ Proposta enviada com sucesso:', result);
		} catch (error) {
			console.error('❌ Erro ao enviar proposta:', error.message);
		} finally {
			handleCloseModal();
		}
	};

	return (
		<section className='proposals-list'>
			{proposals.length === 0 ? (
				<p className='proposals-list__empty'>Nenhuma proposta disponível.</p>
			) : (
				<ul className='proposals-list__items'>
					{proposals.map(
						({
							_id,
							fornecedor,
							categoria,
							contato,
							dataRecebida,
							moeda,
							nivel_urgencia,
							observacoes,
							pontos_fortes,
							prazo_pagamento,
							prazo_entrega,
							valor,
							prazo,
							produto_serviço,
							resumo_inteligente,
							status_proposta,
						}) => {
							const produtoServico = produto_serviço || 'Não informado';
							const resumo = resumo_inteligente || 'Sem resumo disponível';
							const id = _id;

							return (
								<li key={id} className='proposals-list__item'>
									<h2 className='proposals-list__fornecedor'>
										Fornecedor: {fornecedor || 'Fornecedor não informado'}
									</h2>

									<p className='proposals-list__field'>
										<strong>Valor:</strong> {valor || 'Valor não informado'}
									</p>

									<p className='proposals-list__field'>
										<strong>Prazo:</strong> {prazo || 'Prazo não informado'}
									</p>

									<p className='proposals-list__field'>
										<strong>Produto/Serviço:</strong> {produtoServico}
									</p>

									<p className='proposals-list__resumo'>
										<strong>Resumo:</strong> {resumo}
									</p>

									<div className='proposals-list__actions'>
										<button
											className='proposals-list__btn proposals-list__btn--email'
											onClick={() => handleOpenModal(id, 'email')}
										>
											Enviar por E-mail
										</button>
										<button
											className='proposals-list__btn proposals-list__btn--whatsapp'
											onClick={() => handleOpenModal(id, 'whatsapp')}
										>
											Enviar por WhatsApp
										</button>
										<button
											className='proposals-list__btn proposals-list__btn--discord'
											onClick={() => handleOpenModal(id, 'discord')}
										>
											Enviar por Discord
										</button>
									</div>
								</li>
							);
						}
					)}
				</ul>
			)}

			{/* Modal */}
			{showModal && (
				<div className='modal'>
					<div className='modal__content'>
						<h3>
							Informe o destino para enviar via{' '}
							<strong>{selectedChannel.toUpperCase()}</strong>
						</h3>
						<input
							type='text'
							placeholder='Digite o e-mail, número ou @usuário'
							value={destino}
							onChange={(e) => setDestino(e.target.value)}
						/>
						<div className='modal__actions'>
							<button onClick={handleSend}>Enviar</button>
							<button onClick={handleCloseModal}>Cancelar</button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default ProposalList;
