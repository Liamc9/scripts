import React, { useState, useRef } from 'react';
import SearchView from '../views/SearchView';

const sampleItems = [
  { title: 'Task 1', description: 'Do this', status: 'completed', priority: 'high', date: '2023-08-20' },
  { title: 'Task 2', description: 'Do that', status: 'pending', priority: 'medium', date: '2023-08-22' },
  { title: 'Task 3', description: 'Another task', status: 'completed', priority: 'low', date: '2023-08-21' },
  { title: 'Task 4', description: 'Yet another task', status: 'inProgress', priority: 'medium', date: '2023-08-23' },
  { title: 'Task 5', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 6', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 7', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 8', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 9', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 10', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 11', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 12', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 13', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 14', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 15', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 16', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 17', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 18', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 19', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 20', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 21', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 22', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 23', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 24', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 25', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 26', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 27', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 28', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 29', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 30', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 31', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 32', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 33', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 34', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 35', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 36', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 37', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 38', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 39', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 40', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 41', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 42', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
  { title: 'Task 43', description: 'Final task', status: 'completed', priority: 'high', date: '2023-08-24' },
];

const Search = () => {
  const [searchedItems, setSearchedItems] = useState(sampleItems);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [sortedItems, setSortedItems] = useState(sampleItems);
  const containerRef = useRef(null);

  const handleSearch = (newSearchResults) => {
    setSearchedItems(newSearchResults);
    setSelectedFilters({});           // Reset filters
    setSortedItems(newSearchResults); // Reset sorting base to the new search results
  };

  return (
    <SearchView
      items={sampleItems}
      searchedItems={searchedItems}
      sortedItems={sortedItems}
      selectedFilters={selectedFilters}
      handleSearch={handleSearch}
      setSelectedFilters={setSelectedFilters}
      setSortedItems={setSortedItems}
      containerRef={containerRef}
    />
  );
};

export default Search;
