import { useState } from 'react';
import { createPortal } from 'react-dom';

const ProposalList = ({ proposals }) => {
	const [showModal, setShowModal] = useState(false);
	const [selectedProposalId, setSelectedProposalId] = useState(null);
	const [selectedChannel, setSelectedChannel] = useState('');
	const [destino, setDestino] = useState('');
	const [isLoading, setIsLoading] = useState(false);

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
		setIsLoading(true);
		try {
			const response = await fetch(import.meta.env.VITE_ENVIAR_RESUMO, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: selectedProposalId,
					canal: selectedChannel,
					destino: destino,
				}),
			});

			if (!response.ok) {
				throw new Error(`Erro na solicitação: ${response.statusText}`);
			}

			const result = await response.json();
			console.log('✅ Proposta enviada com sucesso:', result);
		} catch (error) {
			console.error('❌ Erro ao enviar proposta:', error.message);
		} finally {
			setIsLoading(false);
			handleCloseModal();
		}
	};

	const formatCurrency = (value, currency = 'BRL') => {
		if (!value) return 'Não informado';
		if (typeof value === 'string' && value.includes('R$')) return value;

		const numValue = parseFloat(value);
		if (isNaN(numValue)) return value;

		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: currency === 'USD' ? 'USD' : 'BRL',
		}).format(numValue);
	};

	const capitalizeFirstLetter = (category) => {
		if (!category) return category;
		return category.charAt(0).toUpperCase() + category.slice(1);
	};

	// Componente Modal separado
	const Modal = () => (
		<div className='modal'>
			<div className='modal__overlay' onClick={handleCloseModal}></div>
			<div className='modal__container'>
				<div className='modal__content'>
					<div className='modal__header'>
						<h3 className='modal__title'>
							Enviar via {selectedChannel.toUpperCase()}
						</h3>
						<button className='modal__close' onClick={handleCloseModal}>
							✕
						</button>
					</div>
					<div className='modal__body'>
						<div className='input-group'>
							<label className='input-group__label'>
								{selectedChannel === 'email'
									? 'E-mail de destino'
									: selectedChannel === 'whatsapp'
									? 'Número do WhatsApp'
									: 'Usuário do Discord'}
							</label>
							<input
								type='text'
								className='input-group__input'
								placeholder={
									selectedChannel === 'email'
										? 'exemplo@email.com'
										: selectedChannel === 'whatsapp'
										? '1199999999'
										: '@usuario'
								}
								value={destino}
								onChange={(e) => setDestino(e.target.value)}
							/>
						</div>
					</div>
					<div className='modal__actions'>
						<button
							className={
								isLoading
									? 'modal-btn modal-btn--primary_loading'
									: 'modal-btn modal-btn modal-btn--primary'
							}
							onClick={handleSend}
						>
							{isLoading ? 'Enviando...' : 'Enviar'}
						</button>
						<button
							className='modal-btn modal-btn--secondary'
							onClick={handleCloseModal}
						>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<>
			<section className='proposals-list'>
				{proposals.length === 0 ? (
					<div className='proposals-list__empty'>
						<div className='empty-state'>
							<div className='empty-state__icon'>📋</div>
							<h3 className='empty-state__title'>
								Nenhuma proposta disponível
							</h3>
							<p className='empty-state__subtitle'>
								As propostas aparecerão aqui quando estiverem disponíveis
							</p>
						</div>
					</div>
				) : (
					<div className='proposals-grid'>
						{proposals.map(
							({
								_id,
								fornecedor,
								categoria,
								contato,
								dataRecebida,
								moeda,
								observacoes,
								pontos_fortes,
								prazo_pagamento,
								prazo_entrega,
								valor,
								produto_serviço,
								resumo_inteligente,
							}) => {
								const produtoServico = produto_serviço || 'Não informado';
								const resumo = resumo_inteligente || 'Sem resumo disponível';
								const id = _id;

								return (
									<div key={id} className='proposal-card'>
										<div className='proposal-card__header'>
											{categoria && (
												<div className='info-item'>
													<div className='proposal-card__title-section'>
														<span className='proposal-card__category-title'>
															Categoria:
														</span>
														<span className='proposal-card__category-name'>
															{capitalizeFirstLetter(categoria)}
														</span>
													</div>
												</div>
											)}
										</div>

										<div className='proposal-card__content'>
											<div className='proposal-card__main-info'>
												<div className='info-grid'>
													<div className='info-item info-item_fornecedor'>
														<span className='info-item__icon'>🧰</span>
														<div className='info-item__content'>
															<span className='info-item__label'>
																Fornecedor:{' '}
																<span className='info-item__value'>
																	{fornecedor || 'Fornecedor não informado'}
																</span>
															</span>
														</div>
													</div>

													<div className='info-item info-item--highlight'>
														<span className='info-item__icon'>💰</span>
														<div className='info-item__content'>
															<span className='info-item__label'>Valor</span>
															<span className='info-item__value'>
																{formatCurrency(valor, moeda)}
															</span>
														</div>
													</div>

													<div className='info-item'>
														<span className='info-item__icon'>📦</span>
														<div className='info-item__content'>
															<span className='info-item__label'>
																Produto/Serviço
															</span>
															<span className='info-item__value info-item__value_service-products'>
																{produtoServico}
															</span>
														</div>
													</div>

													{prazo_entrega && (
														<div className='info-item'>
															<span className='info-item__icon'>🚚</span>
															<div className='info-item__content'>
																<span className='info-item__label'>
																	Prazo Entrega
																</span>
																<span className='info-item__value'>
																	{prazo_entrega}
																</span>
															</div>
														</div>
													)}

													{prazo_pagamento && (
														<div className='info-item'>
															<span className='info-item__icon'>💳</span>
															<div className='info-item__content'>
																<span className='info-item__label'>
																	Prazo Pagamento
																</span>
																<span className='info-item__value info-item__value_payment'>
																	{prazo_pagamento}
																</span>
															</div>
														</div>
													)}

													<div className='info-item'>
														<span className='info-item__icon'>📞</span>
														<div className='info-item__content'>
															<span className='info-item__label'>Contatos</span>
															<span className='info-item__value'>
																<span className='info-item__label'>Nome:</span>{' '}
																{contato.nome || 'Não informado'}
															</span>
															<span className='info-item__value'>
																<span className='info-item__label'>
																	E-mail:
																</span>{' '}
																{contato.email || 'Não informado'}
															</span>
															<span className='info-item__value'>
																<span className='info-item__label'>
																	WhatsApp:
																</span>{' '}
																{contato.whatsapp || 'Não informado'}
															</span>
															<span className='info-item__value'>
																<span className='info-item__label'>
																	Telefone:
																</span>{' '}
																{contato.telefone || 'Não informado'}
															</span>
														</div>
													</div>

													{dataRecebida && (
														<div className='info-item'>
															<span className='info-item__icon'>📅</span>
															<div className='info-item__content'>
																<span className='info-item__label'>
																	Data da Proposta
																</span>
																<span className='info-item__value'>
																	{dataRecebida}
																</span>
															</div>
														</div>
													)}
												</div>
											</div>

											{pontos_fortes ? (
												<div className='proposal-card__strengths'>
													<h4 className='strengths__title'>✨ Pontos Fortes</h4>
													<p className='strengths__content strengths__content_fix-height'>
														{pontos_fortes}
													</p>
												</div>
											) : (
												<div className='proposal-card__strengths'>
													<h4 className='strengths__title'>✨ Pontos Fortes</h4>
													<p className='strengths__content strengths__content_fix-height'>
														'Sem pontos fortes relevantes'
													</p>
												</div>
											)}

											<div className='proposal-card__summary'>
												<h4 className='summary__title'>
													📝 Resumo Inteligente
												</h4>
												<p className='summary__content summary__content_fix-height'>
													{resumo}
												</p>
											</div>

											{observacoes ? (
												<div className='proposal-card__observations'>
													<h4 className='observations__title'>
														💭 Observações
													</h4>
													<p className='observations__content observations__content_fix-height'>
														{observacoes}
													</p>
												</div>
											) : (
												<div className='proposal-card__observations'>
													<h4 className='observations__title'>
														💭 Observações
													</h4>
													<p className='observations__content observations__content_fix-height'>
														Sem observações relevantes
													</p>
												</div>
											)}
										</div>

										<div className='proposal-card__actions'>
											<button
												className='action-btn action-btn--email'
												onClick={() => handleOpenModal(id, 'email')}
											>
												E-mail
											</button>
											<button
												className='action-btn action-btn--whatsapp'
												onClick={() => handleOpenModal(id, 'whatsapp')}
											>
												WhatsApp
											</button>
											<button
												className='action-btn action-btn--discord'
												onClick={() => handleOpenModal(id, 'discord')}
											>
												Discord
											</button>
										</div>
									</div>
								);
							}
						)}
					</div>
				)}
			</section>

			{/* Modal renderizado via Portal - FORA da section */}
			{showModal && createPortal(<Modal />, document.body)}
		</>
	);
};

export default ProposalList;
