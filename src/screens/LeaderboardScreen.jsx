import { useState } from 'react';

export default function LeaderboardScreen({ wallet, game }) {
  const [activeTab, setActiveTab] = useState('score');
  const leaderboard = game.getLeaderboard();

  const tabs = [
    { id: 'score', label: 'Top Score' },
    { id: 'catches', label: 'Catchers' },
    { id: 'battles', label: 'Battlers' },
  ];

  const sortedData = [...leaderboard].sort((a, b) => {
    if (activeTab === 'catches') return b.catches - a.catches;
    return b.score - a.score;
  });

  const getRankStyle = (index) => {
    if (index === 0) return 'gold';
    if (index === 1) return 'silver';
    if (index === 2) return 'bronze';
    return '';
  };

  const getRankEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  return (
    <div>
      {/* Header */}
      <div className="screen-header">
        <h1 className="screen-title">Leaderboard</h1>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          Your Score: {game.playerStats.score}
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stats banner */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8,
        padding: '0 16px 16px',
      }}>
        {[
          { label: 'Catches', value: game.playerStats.totalCatches, icon: '🎯' },
          { label: 'Battles', value: game.playerStats.totalBattles, icon: '⚔️' },
          { label: 'Score', value: game.playerStats.score, icon: '⭐' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card" style={{ textAlign: 'center', padding: 12 }}>
            <div style={{ fontSize: 20 }}>{stat.icon}</div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              fontWeight: 800,
              color: 'var(--monad-purple-light)',
            }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Leaderboard list */}
      <div>
        {sortedData.map((entry, index) => (
          <div
            key={index}
            className="leaderboard-item"
            style={{
              background: entry.isPlayer ? 'rgba(131, 110, 249, 0.08)' : 'transparent',
              borderLeft: entry.isPlayer ? '3px solid var(--monad-purple)' : '3px solid transparent',
            }}
          >
            <div className={`leaderboard-rank ${getRankStyle(index)}`}>
              {getRankEmoji(index)}
            </div>
            <div className="leaderboard-avatar">{entry.avatar}</div>
            <div className="leaderboard-info">
              <div className="leaderboard-name">
                {entry.name}
                {entry.isPlayer && (
                  <span style={{
                    marginLeft: 6,
                    fontSize: 10,
                    padding: '2px 6px',
                    background: 'var(--monad-purple)',
                    borderRadius: 4,
                    verticalAlign: 'middle',
                  }}>
                    YOU
                  </span>
                )}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                {entry.catches} catches
              </div>
            </div>
            <div className="leaderboard-score">
              {activeTab === 'catches' ? entry.catches : entry.score}
            </div>
          </div>
        ))}
      </div>

      {/* Activity feed */}
      {game.activityFeed.length > 0 && (
        <div style={{ padding: 16 }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 14,
            color: 'var(--text-secondary)',
            marginBottom: 12,
            letterSpacing: 1,
          }}>
            Recent Activity
          </h3>
          {game.activityFeed.slice(0, 10).map((activity) => (
            <div key={activity.id} style={{
              padding: '10px 14px',
              borderBottom: '1px solid rgba(131, 110, 249, 0.1)',
              fontSize: 13,
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span>{activity.message}</span>
              <span style={{ fontSize: 10, color: 'var(--text-dim)', whiteSpace: 'nowrap', marginLeft: 8 }}>
                {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
