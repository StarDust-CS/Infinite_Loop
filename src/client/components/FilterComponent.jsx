import React from 'react';

const FilterComponent = (props) => {
  const { updateFilterConfig, filterConfig } = props;
  const filterBar = [];
  filterBar.push(
    <div className="main-filter-dropdown-container">
      <span className="main-filter-text">Status:</span>
      <br />
      <select className="main-filter-dropdown" name="status" onChange={updateFilterConfig} value={filterConfig.status}>
        <option value="ANY STATUS">ANY STATUS</option>
        <option value="OPEN">OPEN</option>
        <option value="IN PROGRESS">IN PROGRESS</option>
        <option value="CLOSED">CLOSED</option>
      </select>
    </div>,
  );
  filterBar.push(
    <div className="main-filter-dropdown-container">
      <span className="main-filter-text">Category:</span>
      <br />
      <select className="main-filter-dropdown" name="category" onChange={updateFilterConfig} value={filterConfig.category}>
        <option value="ANY CATEGORY">ANY CATEGORY</option>
        <option value="JS Fundamentals">JS Fundamentals</option>
        <option value="CSS Fundamentals">CSS Fundamentals</option>
        <option value="Data/Algorithms">Data/Algorithms</option>
        <option value="React/Redux">React/Redux</option>
        <option value="Node/Express">Node/Express</option>
        <option value="Databases">Databases</option>
        <option value="Authentication">Authentication</option>
        <option value="Testing">Testing</option>
        <option value="Miscellaneous">Miscellaneous</option>
      </select>
    </div>,
  );
  
  return (
    <div className="main-filter-bar">
      <span className="main-filter-text">Filter:</span>
      {filterBar}
    </div>
  );
}

export default FilterComponent;
