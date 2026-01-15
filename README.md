# Desafio FullStack Senior - Fernando Burgos

> O README.md do projeto deve conter:
> + Instruções claras de como rodar (focadas no Docker).
> + Explicar por que escolheu tais bibliotecas no Frontend.
> + Prints ou GIF da aplicação rodando.

## Como rodar
apenas executar `docker compose up` no repositório da api ou do frontend para iniciar os 3 containers (mariadb, backend e frontend)
> se já possuir um container com o nome mariadb rodando, pode ser necessário remover primeiro

## bibliotecas no Frontend
decidi user MUI (Material Design) por seus componentes battleproof, praticidade e design intuitivo, pois é o padrão de design da Google, além de ser uma biblioteca que eu já tenho muita proficiência, então ajudou no tempo de desenvolvimento

## aplicação rodando
<img width="1920" height="1020" alt="Captura de tela 2026-01-15 023953" src="https://github.com/user-attachments/assets/0a8644b3-c039-4d55-8be8-7677ad736f58" />

login/cadastro
![video1](https://github.com/user-attachments/assets/d4476047-5a88-4c84-822a-e76f54a1b51e)

envio e recebimento de mensagens
![video2](https://github.com/user-attachments/assets/a94ee53e-c66a-4db5-9be0-03b8e55630b2)

# Requisitos
 > não apliquei Lazy Loading e nem Error Boundaries neste projeto, de resto, tudo ✅
 
 > não escrevi os testes manualmente, uso o copilot para automatizar essa tarefa há um bom tempo

acabei desenvolvendo vários outros recursos e detalhes não solicitados, prezando pela qualidade:
+ ordenação de salas e mensagens com base no horário (de envio / criação)
+ salas públicas e privadas
+ senhas de usuários e salas com hash utilizando bcrypt
+ filtro e busca de salas
+ design do chat extremamente moderno e intuitivo
+ access_token com expiração de 5m e é renovado com um refresh_token que expira em 1h (mas também é renovado)

## 🎯 Objetivo
- [x] Backend (API + WebSocket): NestJS + MariaDB.
- [x] Frontend (SPA): React + Vite + ~~TailwindCSS~~ MUI. 
- [x] Infra: Docker & Docker Compose.

## 🔥 Requisitos Funcionais (Obrigatórios)
1. Autenticação & Usuários
- [x] Login/Cadastro: O usuário deve criar conta (email/senha) ou entrar.
- [x] Segurança: Autenticação via JWT (JSON Web Token).
- [x] Socket Auth: A conexão WebSocket só deve ser estabelecida se o token JWT for válido (Handshake Auth).

2. Gestão de Salas (Rooms)
- [x] Usuários podem criar novas salas ou entrar em salas existentes.
- [x] Contador de Usuários: A lista de salas deve mostrar, em tempo real, quantos usuários estão online naquela sala (Ex: "Devs Java (3 online)").
- [x] Relacionamento: Um usuário pode estar em várias salas? Ou apenas uma por vez? (Defina a regra e implemente consistentemente). Sugestão: Apenas uma por vez para simplificar o socket, ou múltiplas para aumentar o desafio. (decidi por mútiplas salas simultâneas)

3. Mensagens & Persistência
- [x] Histórico: Todas as mensagens devem ser salvas no Banco de Dados (MariaDB).
- [x] Relacionamentos: User -> Message (1:N) e Room -> Message (1:N)
- [x] Ao entrar em uma sala, o usuário deve carregar o histórico de mensagens anterior.

4. Funcionalidades de Chat (Real-time)
- [x] Envio e recebimento de mensagens instantâneo.
- [x] Broadcast: Apenas usuários na mesma sala recebem a mensagem.

## 💎 frontend Pro: Regras de Ouro (Aprofundado)
🎨 1. Arquitetura e State Management
- [x] Separação de Estado: Demonstre clareza entre Global State (sessão do usuário, tema UI - ex: Zustand/Context API) e Server State (listas de mensagens, salas - ex: TanStack Query). Não misture tudo em um Redux gigante sem necessidade.
- [x] Feature-Based Structure: Organize seu projeto por features (features/auth, features/chat), não apenas por tipo de arquivo (components, hooks).
- [x] Custom Hooks: Toda lógica complexa deve ser extraída para hooks customizados (ex: useChatSocket, useAuth).

⚡ 2. Performance e UX Avançada
- [x] Optimistic Updates: Quando o usuário enviar uma mensagem, ela deve aparecer imediatamente na lista (UI), antes mesmo do servidor confirmar (aplique status "enviando..." e trate erros caso falhe).
- [x] Lista Virtualizada: Se o chat tiver 10.000 mensagens, o navegador vai travar? Implemente Virtual Scroll (ex: react-virtuoso ou react-window) para renderizar apenas o visível.
- [x] Skeleton Loading: Nada de "spinners" genéricos o tempo todo. Use Skeletons enquanto os dados carregam.
- [ ] Lazy Loading: Use React.lazy e Suspense para carregar rotas ou componentes pesados sob demanda.

🛡️ 3. Robustez e Tratamento de Erros
- [ ] Error Boundaries: O que acontece se um componente quebrar? A tela fica branca? Implemente Error Boundaries para capturar falhas de renderização.
- [x] Reconexão Inteligente: Se a internet cair, o chat deve avisar e tentar reconectar (Socket.io já ajuda, mas a UI deve refletir isso com clareza).
- [x] Tratamento de Forms: Use React Hook Form + Zod para validação de formulários (Login/Cadastro). Feedback visual imediato nos inputs inválidos.

♿ 4. Acessibilidade (Bônus de Senioridade)
- [x] A aplicação é navegável via Teclado (Tab)?
- [x] Os inputs tem Labels corretos ou aria-label?
- [x] O contraste de cores está adequado?

## ⚙️ Backend & DevOps (Requisitos Profissionais)
- [x] Banco de Dados: Use MariaDB rodando via Docker.
- [x] ORM: TypeORM (com Migrations).
- [x] Validação Robustas: class-validator em todos os DTOs.
- [x] E2E & Testes Unitários: O backend deve ter testes. Pelo menos os serviços principais.
- [x] Docker Compose: O avaliador deve rodar apenas docker-compose up e ter TUDO rodando (Banco + Back + Front).
