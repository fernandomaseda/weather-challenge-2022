import { Fragment } from 'react'
import styles from './main.module.css'
import moment from 'moment'

export default function MainInfo ({ main, metric }) {
  return (
    <Fragment>
      <div className={styles.main}>
        <div className={styles.mainInfo}>
          <span>Start Time</span>
          <p>
            {!metric
              ? moment.parseZone(main.startTime).format('h:mm a')
              : moment.parseZone(main.startTime).format('HH:mm')}
          </p>
        </div>
        <div className={styles.mainInfo}>
          <span>End Time</span>
          <p>
            {!metric
              ? moment.parseZone(main.endTime).format('h:mm a')
              : moment.parseZone(main.endTime).format('HH:mm')}
          </p>
        </div>
        <div className={styles.mainInfo}>
          <span>Wind Speed</span>
          <p>{main.windSpeed}</p>
        </div>
        <div className={styles.mainInfo}>
          <span>Wind Direction</span>
          <p>{main.windDirection}</p>
        </div>
      </div>
    </Fragment>
  )
}
