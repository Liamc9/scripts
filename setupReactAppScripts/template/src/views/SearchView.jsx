import React from 'react';
import styled from 'styled-components';
import { FeedItem } from 'liamc9npm';
import Feed from '../components/search/Feed';
import Sort from '../components/search/Sort';
import Search2 from '../components/search/Search2';
import FilterDrawer from '../components/search/FilterDrawer';

// Styled components
const SearchViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 0 auto;
  overflow-y: auto;
  max-height: 80vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const SortContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const ScrollableFeedContainer = styled.div`
  width: 100%;
  border: 1px solid #ccc;
`;

const SearchView = ({
  items,
  searchedItems,
  sortedItems,
  selectedFilters,
  handleSearch,
  setSelectedFilters,
  setSortedItems,
  containerRef,
}) => {
  return (
    <SearchViewContainer ref={containerRef}>
      <Search2 items={items} onSearch={handleSearch} />
      <ButtonContainer>
        <FilterContainer>
          <FilterDrawer onChange={setSelectedFilters} />
        </FilterContainer>
        <SortContainer>
          <Sort items={searchedItems} onSortedChange={setSortedItems} />
        </SortContainer>
      </ButtonContainer>
      <ScrollableFeedContainer>
        <Feed
          items={sortedItems}
          selectedFilters={selectedFilters}
          infiniteScroll={5} // loads 5 items at a time
          ItemComponent={FeedItem}
          scrollContainerRef={containerRef}
        />
      </ScrollableFeedContainer>
    </SearchViewContainer>
  );
};

export default SearchView;
