import { createContext, useContext, useEffect, useState } from "react";

const Base_url = "http://localhost:8000";
const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, SetCitites] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [currentCities,SetCurrentCities]=useState({});
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsloading(true);
        const res = await fetch(`${Base_url}/cities`);
        const data = await res.json();
        SetCitites(data);
      } catch {
        alert("there is data loading error");
      } finally {
        setIsloading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id)
{
    try {
      setIsloading(true);
      const res = await fetch(`${Base_url}/cities/${id}`);
      const data = await res.json();
      SetCurrentCities(data);
    } catch {
      alert("there is data loading error");
    } finally {
      setIsloading(false);
    }
  
}

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isloading,
        currentCities,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities()
{
  const context=useContext(CitiesContext);
  if(context===undefined){throw new Error("cities context is use outside the cities provider")
  }
  return context;
}

export { CitiesProvider,useCities};


  


