import { Fragment } from 'react'
import styles from './temp.module.css'

export default function Temperature ({ weather, metric }) {
  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.imageDescription}>
          <img
            alt=""
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '20px',
              marginRight: '20px'
            }}
            src={weather.icon}
          />
          <p className={styles.description}> {weather.detailedForecast}</p>

          <div className={styles.temp}>
            {!metric
              ? (
              <h3>{weather.temperature} °F</h3>
                )
              : (
              <h3>
                {Math.round(((Number(weather.temperature) - 32) * 5) / 9)} °C
              </h3>
                )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}
