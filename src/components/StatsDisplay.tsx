import type { StatsDisplayProps } from "../types";

function StatsDisplay({
  stats,
  showReadingTime = true,
  minWords,
  maxWords,
}: StatsDisplayProps) {
  const getWordProgress = (): number => {
    if (maxWords) {
      return Math.min((stats.wordCount / maxWords) * 100, 100);
    }
    if (minWords) {
      return Math.min((stats.wordCount / minWords) * 100, 100);
    }
    return 0;
  };

  const wordProgress = getWordProgress();
  const showProgress = minWords || maxWords;

  return (
    <div className="stats-display">
      <div className="stat-item">
        <span className="stat-label">Characters</span>
        <span className="stat-value">{stats.characterCount}</span>
      </div>

      <div className="stat-item">
        <span className="stat-label">Words</span>
        <span className="stat-value">{stats.wordCount}</span>
        {showProgress && (
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${wordProgress}%` }}
            />
          </div>
        )}
      </div>

      {showReadingTime && (
        <div className="stat-item">
          <span className="stat-label">Reading Time</span>
          <span className="stat-value">
            {stats.readingTime} {stats.readingTime === 1 ? "min" : "mins"}
          </span>
        </div>
      )}
    </div>
  );
}

export default StatsDisplay;
