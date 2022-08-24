import React, {useState, useEffect} from 'react'
import {paginate} from '../utils/paginate'
import Pagination from './pagination'
import GroupList from './groupList'
import api from '../api/index'
import SearchStatus from './searchStatus'
import UsersTable from './usersTable'
import _ from 'lodash'

const UsersList = () => {
  const pageSize = 6

  const [users, setUsers] = useState()

  useEffect(() => {
    api.users.fetchAll().then((response) => setUsers(response))
  }, [])

  useEffect(() => {
    setSearchedUsers(users)
  }, [users])

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return {...user, bookmark: !user.bookmark}
        }
        return user
      })
    )
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({path: 'name', order: 'asc'})
  const [searchedUsers, setSearchedUsers] = useState(users)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  if (searchedUsers) {
    const filteredUsers = selectedProf
      ? searchedUsers.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : searchedUsers
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    const handleProfessionSelect = (item) => {
      setSelectedProf(item)
      setSearchValue('')
      setSearchedUsers(users)
    }

    const handlePageChange = (pageIndex) => {
      setCurrentPage(pageIndex)
    }

    const clearFilter = () => {
      setSelectedProf()
    }

    const handleSort = (item) => {
      setSortBy(item)
    }

    const changeSearchValue = ({target}) => {
      const value = target.value
      setSearchValue(value)
      setSearchedUsers(
        users.filter((user) =>
          user.name.toLowerCase().includes(value.toLowerCase())
        )
      )
    }

    return (
      <div className='d-flex'>
        {professions && (
          <div className='d-flex flex-column flex-shrink-0 p-3'>
            <GroupList
              items={professions}
              onItemSelect={handleProfessionSelect}
              selectedItem={selectedProf}
            />
            <button onClick={clearFilter} className='btn btn-secondary mt-2'>
              Очистить
            </button>
          </div>
        )}
        <div className='d-flex flex-column'>
          <SearchStatus length={count} />

          <input
            type='text'
            value={searchValue}
            onChange={changeSearchValue}
            placeholder='Search...'
          />

          {count > 0 && (
            <UsersTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className='d-flex justify-content-center'>
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    )
  }
  return <h1>Loading users...</h1>
}

export default UsersList
