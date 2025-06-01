'use client'
import Character from "@/app/components/Character";
import gameManager from "@/app/hooks/gameManager";
import { useMemo, useEffect, useRef } from "react";

export default function Home() {
    const {
        hero,
        villain,
        handleHeroAction,
        isHeroTurn,
        history,
        gameStatus,
        resetGame
    } = gameManager();

    const historyContentRef = useRef(null);

    // Função para rolar para o topo (já que novas mensagens ficam no topo)
    const scrollToTop = () => {
        if (historyContentRef.current) {
            historyContentRef.current.scrollTop = 0;
        }
    };

    useEffect(() => {
        scrollToTop();
    }, [history]);

    const statusMessage = useMemo(() => {
        switch(gameStatus) {
            case 'won': return `${hero.name} venceu! 🏆`;
            case 'lost': return `${villain.name} venceu! 💀`;
            case 'fled': return `${hero.name} fugiu! 🏃`;
            default: return isHeroTurn ? "Sua vez! ⏳" : "Vez do vilão...";
        }
    }, [gameStatus, isHeroTurn]);

    return (
        <div className="game-container">
            <header className="game-header">
                <h1>⚔️ Heroes and Villains 🦹</h1>
                <div className="status-banner">
                    <div className="status-message">{statusMessage}</div>
                    <button onClick={resetGame} className="reset-btn">↻ Reiniciar</button>
                </div>
            </header>

            <div className="battle-area">
                <Character
                    data={hero}
                    isHero={true}
                    onAction={handleHeroAction}
                    isActive={isHeroTurn && gameStatus === 'playing'}
                />

                <div className="vs-container">
                    <div className="vs">VS</div>
                </div>

                <Character
                    data={villain}
                    isHero={false}
                    isActive={false}
                />
            </div>

            <div className="history">
                <div className="history-header">
                    <h3>📜 Histórico de Batalha</h3>
                    <div className="history-controls">
                        <button
                            className="history-btn"
                            onClick={() => historyContentRef.current.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            ↑
                        </button>
                        <button
                            className="history-btn"
                            onClick={() => historyContentRef.current.scrollTo({ top: historyContentRef.current.scrollHeight, behavior: 'smooth' })}
                        >
                            ↓
                        </button>
                    </div>
                </div>
                <div
                    className="history-content"
                    ref={historyContentRef}
                >
                    <ul className="history-list">
                        {history.map((entry, index) => (
                            <li key={index} className="history-item">{entry}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}