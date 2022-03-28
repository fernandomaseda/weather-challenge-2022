import axios from 'axios'
import { FORECAST_URL, GEOCODING_URL } from './config'

export const getAdressGeocoding = async (street, city, state) => {
  try {
    const data = await axios.get(GEOCODING_URL, {
      params: {
        street: street,
        city: city,
        state: state,
        benchmark: 'Public_AR_Census2020',
        format: 'json'
      }
    })
    return data
  } catch (error) {
    return error
  }
}

export const getForecastService = async (y, x) => {
  try {
    const data = await axios.get(FORECAST_URL + `/${y},${x}`, {})
    return data
  } catch (error) {
    return error
  }
}

export const getWeather = async (WEATHER_URL) => {
  try {
    const data = await axios.get(WEATHER_URL)
    return data
  } catch (error) {
    return error
  }
}
