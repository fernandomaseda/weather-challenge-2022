import { Fragment, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import LoadingButton from '@mui/lab/LoadingButton'

export default function Search () {
  const [formState, setFormState] = useState({
    validStreet: true,
    validCity: true,
    validState: true,
    valueStreet: '4600 Silver Hill Rd',
    valueCity: 'Washington',
    valueState: 'DC',
    fullValidate: true,
    loading: false
  })

  useEffect(() => {
    if (formState.validStreet && formState.validCity && formState.validState) {
      setFormState({
        ...formState,
        fullValidate: true
      })
    } else {
      setFormState({
        ...formState,
        fullValidate: false
      })
    }
  }, [formState.validStreet, formState.validCity, formState.validState])

  function handleSubmit (e) {
    setFormState({
      ...formState,
      loading: true
    })

    setTimeout(() => {
      setFormState({
        ...formState,
        loading: false
      })
    }, 10000)
  }

  return (
    <Fragment>
      <div style={{ marginTop: '30px' }}>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' }
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-required"
                name="street"
                label="Street"
                autoComplete="Enter Street"
                value={formState.valueStreet}
                onChange={(e) => handleChange(e, 'Street')}
              />
            </div>
            <div>
              <TextField
                id="outlined-required"
                name="city"
                label="City"
                autoComplete="Enter City"
                value={formState.valueCity}
                onChange={(e) => handleChange(e, 'City')}
              />
            </div>
            <div>
              <TextField
                id="outlined-required"
                name="state"
                label="State"
                autoComplete="Enter State"
                value={formState.valueState}
                onChange={(e) => handleChange(e, 'State')}
              />
            </div>
            <LoadingButton
              variant="contained"
              type="submit"
              disabled={!formState.fullValidate}
              loading={formState.loading}
              loadingPosition="end"
              endIcon={<SearchIcon />}
            >
              Search
            </LoadingButton>
          </Box>
        </form>
      </div>
    </Fragment>
  )

  function handleChange (e, type) {
    e.preventDefault()

    const value = e.target.value.trim()

    setFormState({ ...formState, ['value' + type]: value })

    setFormState((prevState) => {
      if (value.length > 0) {
        return { ...prevState, ['valid' + type]: true }
      } else {
        return { ...prevState, ['valid' + type]: false }
      }
    })
  }
}
