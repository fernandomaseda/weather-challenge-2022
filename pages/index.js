import Head from "next/head";
import styles from "../styles/Home.module.css";
import Search from "../components/Search/search";
import Card from "../components/Card/card";
import { getAdressGeocoding, getForecastService, getWeather } from "../lib/api";
import Custom404 from "../pages/404";
import { useState } from "react";
import Header from "../components/Header";

export default function Home({ weather, notFound }) {
  console.log(weather);

  const [metric, setMetric] = useState(false);

  if (notFound) {
    return <Custom404 />;
  } else {
    return (
      <div className={styles.container}>
        <Head>
          <title>Weather Challenge</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          {weather ? (
            <div>
              <Header weather={weather} metric={metric} setMetric={setMetric} />
              <Card weather={weather} metric={metric} />
            </div>
          ) : (
            <h1 className={styles.mainTitle}>
              Weather Challenge
              <Search />
            </h1>
          )}
        </main>

        <footer className={styles.footer}>
          Powered by
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </footer>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  let weather = null;
  const param = context.query;

  if (param.street && param.city && param.state) {
    try {
      const resGeocoding = await getAdressGeocoding(
        param.street,
        param.city,
        param.state
      );
      const jsonGeocoding = await JSON.parse(JSON.stringify(resGeocoding.data));
      const pos = jsonGeocoding.result.addressMatches[0].coordinates;

      const resForecastService = await getForecastService(pos.y, pos.x);
      const jsonForecastService = await JSON.parse(
        JSON.stringify(resForecastService.data)
      );
      const WEATHER_URL = jsonForecastService.properties.forecast;

      const resWeather = await getWeather(WEATHER_URL);
      weather = await JSON.parse(JSON.stringify(resWeather.data.properties));
      weather.city = param.city;
      weather.state = param.state;
    } catch (error) {
      console.log(error);
      const notFound = true;
      return { props: { weather, notFound } };
    }
  }

  return { props: { weather } };
}
