// Componente que representa um personagem (herói ou vilão)
import React from 'react';

export default function Character({ data, isHero, onAction, isActive }) {
    // Define ações disponíveis apenas para heróis
    const actions = isHero ? [
        { name: "Atacar", action: "attack", icon: "⚔️" },
        { name: "Defender", action: "defense", icon: "🛡️" },
        { name: "Poção", action: "usePotion", icon: "🧪" },
        { name: "Fugir", action: "flee", icon: "🏃" }
    ] : [];

    return (
        <div className={`character ${isHero ? 'hero' : 'villain'} ${isActive ? 'active-turn' : ''}`}>
            <div className="character-header">
                <div className="character-image-container">
                    <img
                        src={data.image}
                        alt={data.name}
                        className="character-image"
                    />
                    {isActive && <div className="turn-indicator">Sua vez!</div>}
                </div>
                <h2>{data.name}</h2>
            </div>

            <div className="life-container">
                <div className="life-bar" style={{ width: `${data.life}%` }}>
                    <span className="life-text">{data.life}%</span>
                </div>
            </div>

            {isHero && (
                <div className="actions">
                    {actions.map((btn) => (
                        <button
                            key={btn.action}
                            onClick={() => onAction(btn.action)}
                            disabled={!isActive}
                            className="action-btn"
                        >
                            <span className="action-icon">{btn.icon}</span>
                            {btn.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}