import { Fragment } from "react";
import styles from "./card.module.css";
import MainInfo from "./mainInfo";
import Temperature from "./temperature";
import moment from "moment";

export default function Card({ weather, metric }) {
  return (
    <Fragment>
      {weather.periods.map((item, i) => {
        return (
          <div key={i} className={styles.card}>
            <div className={styles.cardHeader}>
              {weather.periods[i].name.includes("night") ||
              weather.periods[i].name.includes("Night") ? (
                <div className={styles.titleNight}>
                  {weather.periods[i].name}{" "}
                  {moment.parseZone(weather.periods[i].startTime).format("Do")}
                </div>
              ) : (
                <div className={styles.titleSun}>
                  {weather.periods[i].name}{" "}
                  {moment.parseZone(weather.periods[i].startTime).format("Do")}
                </div>
              )}
            </div>
            <div>
              <Temperature weather={weather.periods[i]} metric={metric} />
              <MainInfo main={weather.periods[i]} metric={metric} />
            </div>
          </div>
        );
      })}
    </Fragment>
  );
}
