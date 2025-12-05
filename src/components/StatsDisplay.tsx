import type { StatsDisplayProps } from "../types";

function StatsDisplay({ stats, showReadingTime = true }: StatsDisplayProps) {
  return (
    <div className="stats-display">
      <div className="stat-item">
        <span className="stat-label">Characters:</span>
        <span className="stat-value">{stats.characterCount}</span>
      </div>

      <div className="stat-item">
        <span className="stat-label">Words:</span>
        <span className="stat-value">{stats.wordCount}</span>
      </div>

      {showReadingTime && (
        <div className="stat-item">
          <span className="stat-label">Reading Time:</span>
          <span className="stat-value">
            {stats.readingTime} {stats.readingTime === 1 ? "minute" : "minutes"}
          </span>
        </div>
      )}
    </div>
  );
}

export default StatsDisplay;
