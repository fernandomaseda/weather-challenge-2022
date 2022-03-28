import styles from '../../styles/Home.module.css'
import { Fragment } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import moment from 'moment'

const localStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}

export default function Header ({ weather, metric, setMetric }) {
  const timeZone = moment.parseZone(weather.periods[0].startTime).format('Z')

  return (
    <Fragment>
      <div style={localStyles.header}>
        <Button onClick={() => window.history.back()}>
          <ArrowBackIosIcon color="primary" />
          Go Back
        </Button>
        <FormControlLabel
          sx={{
            display: 'block'
          }}
          control={
            <Switch
              checked={metric}
              onChange={() => setMetric(!metric)}
              name="Metric System"
              color="primary"
            />
          }
          label="Metric System"
        />
      </div>
      <h1 className={styles.title}>
        {weather.city}, {weather.state}
      </h1>
      <h4 className={styles.subtitle}>
        Generated At{' '}
        {moment(weather.generatedAt)
          .utc()
          .utcOffset(timeZone)
          .format('MMMM Do YYYY, h:mm:ss a [UTC] Z')}
      </h4>
    </Fragment>
  )
}
