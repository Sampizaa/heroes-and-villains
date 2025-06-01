import { useState, useEffect, useRef } from "react";

export default function gameManager() {
    const initialHero = {
        life: 100,
        name: "Herói",
        image: "/hero.png" // Novo campo para imagem
    };
    const initialVillain = {
        life: 100,
        name: "Vilão",
        image: "/villain.png" // Novo campo para imagem
    };

    const [hero, setHero] = useState(initialHero);
    const [villain, setVillain] = useState(initialVillain);
    const [isHeroTurn, setIsHeroTurn] = useState(true);
    const [history, setHistory] = useState([]);
    const [gameStatus, setGameStatus] = useState('playing');

    // Referência para controlar o estado do jogo
    const isGameActive = useRef(true);
    const lastAction = useRef({}); // Rastreia a última ação

    useEffect(() => {
        isGameActive.current = gameStatus === 'playing';
    }, [gameStatus]);

    const modifyLife = (target, amount, actionName, actor) => {
        const setter = target === "hero" ? setHero : setVillain;
        setter((prev) => {
            const currentLife = prev.life;
            const newLife = Math.min(100, Math.max(0, currentLife + amount));
            const effectiveAmount = newLife - currentLife;

            if (effectiveAmount !== 0 || actionName === "Defendeu") {
                let actionText = "";

                if (effectiveAmount < 0) {
                    actionText = `causou ${Math.abs(effectiveAmount)} de dano`;
                } else if (effectiveAmount > 0) {
                    actionText = `recuperou ${effectiveAmount} de vida`;
                } else {
                    actionText = `não teve efeito`;
                }

                const message = `${actor} ${actionName}: ${actionText}`;

                // Verifica se é diferente da última ação antes de adicionar
                if (message !== lastAction.current.message) {
                    setHistory(prev => [...prev, message]);
                    lastAction.current = { message };
                }
            }

            return { ...prev, life: newLife };
        });
    };

    // Verifica fim de jogo
    useEffect(() => {
        if (hero.life <= 0) {
            const message = `${villain.name} venceu o jogo!`;
            setHistory(prev => [...prev, message]);
            lastAction.current = { message };
            setGameStatus('lost');
        } else if (villain.life <= 0) {
            const message = `${hero.name} venceu o jogo!`;
            setHistory(prev => [...prev, message]);
            lastAction.current = { message };
            setGameStatus('won');
        }
    }, [hero.life, villain.life]);

    const actions = {
        attack: () => {
            modifyLife("villain", -10, "Atacou", hero.name);
        },
        defense: () => {
            modifyLife("hero", 5, "Defendeu", hero.name);
        },
        usePotion: () => {
            modifyLife("hero", 15, "Usou Poção", hero.name);
        },
        flee: () => {
            const fleeChance = 0.7;
            const didFlee = Math.random() < fleeChance;

            if (didFlee) {
                const message = `${hero.name} fugiu com sucesso!`;
                setHistory(prev => [...prev, message]);
                lastAction.current = { message };
                setGameStatus('fled');
            } else {
                const message = `${hero.name} tentou fugir e falhou!`;
                setHistory(prev => [...prev, message]);
                lastAction.current = { message };
                setIsHeroTurn(false);
            }
        }
    };

    // Ações do vilão (automáticas)
    const villainAI = () => {
        const actions = ['attack', 'attack', 'attack', 'defense'];
        const action = actions[Math.floor(Math.random() * actions.length)];

        if (action === 'attack') {
            modifyLife("hero", -8, "Atacou", villain.name);
        } else {
            modifyLife("villain", 7, "Defendeu", villain.name);
        }
    };

    const handleHeroAction = (action) => {
        if (!isHeroTurn || gameStatus !== 'playing') return;

        actions[action]?.();
        setIsHeroTurn(false);

        // Não agenda turno do vilão se o jogo terminou
        if (!isGameActive.current) return;

        setTimeout(() => {
            // Verifica novamente antes da ação
            if (!isGameActive.current || villain.life <= 0) {
                return;
            }

            villainAI();

            // Passa o turno apenas se o jogo ainda estiver ativo
            if (isGameActive.current) {
                setIsHeroTurn(true);
            }
        }, 1500);
    };

    const resetGame = () => {
        setHero(initialHero);
        setVillain(initialVillain);
        setIsHeroTurn(true);
        setHistory([]);
        setGameStatus('playing');
        isGameActive.current = true;
        lastAction.current = {};
    };

    return {
        hero,
        villain,
        handleHeroAction,
        isHeroTurn,
        history,
        gameStatus,
        resetGame
    };
}