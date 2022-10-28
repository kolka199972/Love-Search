import React, {useEffect} from 'react'
import Qualitie from './qualitie'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList
} from '../../../store/qualities'

const QualitiesList = ({qualities}) => {
  const dispatch = useDispatch()

  const isLoading = useSelector(getQualitiesLoadingStatus())
  const qualitiesList = useSelector(getQualitiesByIds(qualities))

  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])

  if (isLoading) return 'Loading...'

  return (
    <>
      {qualitiesList.map((quality) => (
        <Qualitie key={quality._id} {...quality} />
      ))}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
