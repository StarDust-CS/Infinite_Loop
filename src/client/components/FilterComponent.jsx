import React from 'react';

const FilterComponent = (props) => {
  const { updateFilterConfig, filterConfig } = props;
  const filterBar = [];
  filterBar.push(
    <select className="main-filter-status" name="status" onChange={updateFilterConfig} value={filterConfig.role}>
      <option value="ALL" disabled>ALL</option>
      <option value="OPEN">OPEN</option>
      <option value="IN PROGRESS">IN PROGRESS</option>
      <option value="CLOSED">CLOSED</option>
    </select>,
  );
  
  return (
    <div className="main-filter-bar">
      Filter:
      {filterBar}
    </div>
  );
}

export default FilterComponent;
