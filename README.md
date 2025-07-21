# Dashboard de Propostas

Um dashboard moderno e intuitivo para visualização e gerenciamento de propostas comerciais, construído com React e focado na experiência do usuário.

## Características

### Visualização Completa

- **Cards interativos** com informações detalhadas de cada proposta
- **Formatação automática** de valores monetários (BRL/USD)
- **Layout responsivo** que se adapta a diferentes tamanhos de tela
- **Estado de carregamento** com feedback visual ao usuário

### Informações da Proposta

- Dados do fornecedor e informações de contato
- Valor da proposta com formatação de moeda
- Categoria, produto/serviço oferecido
- Prazos de entrega e pagamento
- Data de recebimento da proposta
- Pontos fortes destacados
- Resumo inteligente automatizado
- Observações adicionais

### Canais de Envio

- **E-mail**: Envio direto por e-mail
- **WhatsApp**: Compartilhamento via WhatsApp
- **Discord**: Envio para usuários do Discord

### Experiência do Usuário

- **Interface limpa** com ícones intuitivos
- **Modal interativo** para seleção de canal de envio
- **Estados de loading** durante operações
- **Feedback visual** para ações do usuário
- **Layout em grid** para melhor organização

## Tecnologias

- **React** 18+ com Hooks
- **JavaScript ES6+**
- **CSS3** com metodologia BEM
- **Fetch API** para requisições HTTP
- **Vite** como bundler

## Estrutura do Projeto

```
src/
├── components/
│   └── ProposalList.jsx    # Componente principal das propostas
├── App.jsx                 # Componente raiz da aplicação
└── styles/                 # Arquivos de estilo CSS
```

## Como Usar

### Visualizar Propostas

1. O dashboard carrega automaticamente todas as propostas disponíveis
2. Use o botão "Buscar propostas" para atualizar a lista
3. Cada card mostra informações completas da proposta

### Enviar Proposta

1. Clique em um dos botões de canal (E-mail, WhatsApp, Discord)
2. Insira o destino no modal que abre
3. Clique em "Enviar" para processar o envio
4. Aguarde a confirmação da operação

## Personalização

### Estilos

O projeto utiliza metodologia BEM para organização do CSS.

### Componentes

- **App.jsx**: Gerencia estado global e busca de propostas
- **ProposalList.jsx**: Renderiza lista de propostas e modal de envio

## Estados da Aplicação

- **Loading**: Mostrado durante carregamento inicial
- **Empty State**: Exibido quando não há propostas
- **Error Handling**: Logs de erro no console para debugging
- **Modal States**: Loading durante envio de propostas

## Responsividade

O dashboard é totalmente responsivo e se adapta a:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## Funcionalidades Futuras

- [ ] Filtros e busca por propostas
- [ ] Ordenação por diferentes critérios
- [ ] Exportação de dados
- [ ] Notificações de envio
- [ ] Dashboard de analytics
- [ ] Modo escuro/claro

---

**Desenvolvido por João Luiz Cambraia com ❤️ para facilitar o gerenciamento de propostas comerciais**
