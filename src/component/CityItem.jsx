import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../Contexts/CitiesContexts";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
function CityItem({ city }) {
  const {currentCities}=useCities();
  const { cityName, emoji, date, id, position } = city;
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${id===currentCities.id?styles['cityItem--active']:" "}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>X</button>
      </Link>
    </li>
  );
}

export default CityItem;
