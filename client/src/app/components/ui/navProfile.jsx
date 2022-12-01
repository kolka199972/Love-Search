import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCurrentUserData} from '../../store/users'

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData())
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((pS) => !pS)

  if (!currentUser) return 'Loading...'
  return (
    <div className='dropdown'>
      <div
        className='dropdown-toggle btn d-flex align-items-center'
        onClick={toggleMenu}
      >
        <div className='me-2'>{currentUser.name}</div>
        <img
          src={currentUser.image}
          className='img-responsive rounded-circle'
          height='40'
          width='150'
        />
      </div>
      <div className={'w-100 dropdown-menu ' + (isOpen ? 'show' : '')}>
        <Link className='dropdown-item' to={`/users/${currentUser._id}`}>
          Profile
        </Link>
        <Link className='dropdown-item' to='/logout'>
          Log Out
        </Link>
      </div>
    </div>
  )
}

export default NavProfile
