
import HumidityGauge from './HumidityGuage';const styles = {
  card: {
    background: "#eef4e6",
    border: "1px solid #c9d9b4",
    borderRadius: 12,
    padding: "18px 20px",
    maxWidth: 320,
    color: "#2b3a1f",
    fontFamily: "system-ui, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 12,
  },
  city: { margin: 0, fontSize: 16, fontWeight: 600 },
  condition: { margin: 0, fontSize: 13, color: "#5c6f48" },
  temp: { fontSize: 44, fontWeight: 700, lineHeight: 1, margin: "4px 0 14px" },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
    borderTop: "1px solid #c9d9b4",
    paddingTop: 12,
  },
  statValue: { margin: 0, fontSize: 15, fontWeight: 600 },
  statLabel: { margin: 0, fontSize: 12, color: "#5c6f48" },
};

function WeatherCard({
  city = "Bhalwal",
  temperature = 29,
  condition = "Mostly cloudy",
  humidity = 54,
  wind = 12,
  rainChance = 10,
}) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.city}>{city}</h3>
        <p style={styles.condition}>{condition}</p>
      </div>

      <p style={styles.temp}>{temperature}°C</p>

      <div style={styles.stats}>
        <div><HumidityGauge humidity={humidity} /></div>
        <div>
          <p style={styles.statValue}>{wind} km/h</p>
          <p style={styles.statLabel}>Wind</p>
        </div>
        <div>
          <p style={styles.statValue}>{rainChance}%</p>
          <p style={styles.statLabel}>Rain chance</p>
        </div>
        </div>

  </div>
    
  );
}

export default WeatherCard;
