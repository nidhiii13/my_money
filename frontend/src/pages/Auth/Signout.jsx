import React from 'react'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../redux/ducks/user'

const Signout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(logoutUser())
        sessionStorage.removeItem('user_id')
        sessionStorage.removeItem('token')
        navigate('/login')
    }, [])
    
  return (
    <div></div>
  )
}

export default Signout