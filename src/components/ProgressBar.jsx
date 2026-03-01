const COLD_TO_HOT_EMOJIS = ["🧊", "❄️", "🌧️", "⛅", "☀️", "🌶️", "🔥"];

function getEmojiForPercent(percent) {
  if (percent <= 0) return COLD_TO_HOT_EMOJIS[0];
  const index = Math.min(
    COLD_TO_HOT_EMOJIS.length - 1,
    Math.floor((percent / 100) * COLD_TO_HOT_EMOJIS.length)
  );
  return COLD_TO_HOT_EMOJIS[index];
}

function ProgressBar({ current = 0, total = 1 }) {
  const safeTotal = total <= 0 ? 1 : total;
  const percent = Math.min(100, Math.max(0, (current / safeTotal) * 100));
  const emoji = getEmojiForPercent(percent);

  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}>
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{
            width: `${percent}%`,
            backgroundSize: percent > 0 ? `${(100 / percent) * 100}% 100%` : "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 0",
          }}
        />
      </div>
      <span className="progress-bar__emoji" style={{ left: `${percent}%` }} aria-hidden="true">
        {emoji}
      </span>
    </div>
  );
}

export default ProgressBar;
