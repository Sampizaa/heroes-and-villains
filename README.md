# Heroes and Villains Battle Game 🏰⚔️🦹

## 📖 Descrição

Jogo de turnos estilo RPG onde um herói e um vilão se enfrentam em batalha. Desenvolvido com **Next.js** e **React**, utilizando gerenciamento de estado puro (sem bibliotecas externas).

## 🌐 Deploy

O projeto está hospedado na Vercel:
👉 Acesse o Jogo Online

## ✨ Funcionalidades

### 🦸‍♂️ Sistema de Batalha

Turnos alternados entre herói e vilão.  
4 ações disponíveis para o herói:

- ⚔️ **Atacar**: causa 10 de dano  
- 🛡️ **Defender**: recupera 5 de vida  
- 🧪 **Poção**: recupera 15 de vida  
- 🏃 **Fugir**: 70% de chance de sucesso  

### 🤖 IA do Vilão

Ações aleatórias:

- **Ataque**: causa 8 de dano  
- **Defesa**: recupera 7 de vida  

### 📊 Sistema de Vida

- Barra de vida visual (0–100%)  
- Mecânica de dano/cura  
- Condições de vitória ou derrota  

### 📜 Histórico de Batalha

- Registro detalhado de todas as ações  
- Scroll automático para novas mensagens  
- Controles de navegação manual (↑/↓)  

### 🔄 Controles do Jogo

- Reinício completo da partida  
- Feedback visual do turno ativo  
- Mensagens de status do jogo  

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js (v18+)  
- npm ou yarn

## 🛠️ Tecnologias Utilizadas

-Next.js (App Router)
-React (Hooks: useState, useEffect, useRef, useMemo)
-CSS Modules para estilização
-Vercel para deploy

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/heroes-villains-game.git

# Acesse a pasta do projeto
cd heroes-villains-game

# Instale as dependências
npm install

# Execute o projeto
npm run dev
