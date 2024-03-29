import React, {useState, useEffect} from 'react'
import _ from 'lodash'
import GroupList from '../../common/groupList'
import {paginate} from '../../../utils/paginate'
import SearchStatus from '../../ui/searchStatus'
import UsersTable from '../../ui/usersTable'
import Pagination from '../../common/pagination'
import {useSelector} from 'react-redux'
import {
  getProfessions,
  getProfessionsLoadingStatus
} from '../../../store/professions'
import {getCurrentUserId, getUsersList} from '../../../store/users'

const UsersListPage = () => {
  const professions = useSelector(getProfessions())
  const professionsLoading = useSelector(getProfessionsLoadingStatus())
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({path: 'name', order: 'asc'})
  const [searchValue, setSearchValue] = useState('')

  const currentUserId = useSelector(getCurrentUserId())

  const pageSize = 6

  const users = useSelector(getUsersList())

  const handleDelete = (userId) => {
    // setUsers(users.filter((user) => user._id !== userId))
    console.log(userId)
  }

  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return {...user, bookmark: !user.bookmark}
      }
      return user
    })
    console.log(newArray)
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, searchValue])

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
    if (searchValue !== '') setSearchValue('')
  }

  const changeSearchValue = ({target}) => {
    const value = target.value
    setSearchValue(value)
    setSelectedProf(undefined)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  if (users) {
    const filterUsers = (data) => {
      const filteredUsers = searchValue
        ? data.filter(
            (user) =>
              user.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
          )
        : selectedProf
        ? data.filter(
            (user) =>
              JSON.stringify(user.profession) === JSON.stringify(selectedProf)
          )
        : data
      return filteredUsers.filter((u) => u._id !== currentUserId)
    }
    const filteredUsers = filterUsers(users)
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    const clearFilter = () => {
      setSelectedProf()
    }

    return (
      <div className='d-flex'>
        {professions && !professionsLoading && (
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
            name='searchValue'
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

export default UsersListPage
