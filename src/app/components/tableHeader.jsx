import React from 'react'
import PropTypes from 'prop-types'

const TableHeader = ({selectedSort, onSort, columns}) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort(() => ({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      }))
    } else {
      onSort({path: item, order: 'asc'})
    }
  }

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            role={columns[column].path && 'button'}
            scope='col'
          >
            {columns[column].name}
            {selectedSort.path === columns[column].path && (
              <i
                className={`bi bi-caret-${
                  selectedSort.order === 'asc' ? 'up' : 'down'
                }-fill`}
              ></i>
            )}
          </th>
        ))}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  columns: PropTypes.object.isRequired
}

export default TableHeader