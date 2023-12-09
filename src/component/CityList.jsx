import CityItem from "./CityItem"
import styles from "./CityList.module.css"
import Spinner from "./Spinner"
import Message from "./Message"
import { useCities } from "../Contexts/CitiesContexts"
function CityList() {
  const {cities,isloading}=useCities();
  if(isloading) return<Spinner/>
  if(!cities.length) return <Message message={"add city"}/>
  return <ul className={styles.cityList}>
      {cities.map(city=><CityItem city={city} key={city.id}/>)}
    </ul>
}

export default CityList
