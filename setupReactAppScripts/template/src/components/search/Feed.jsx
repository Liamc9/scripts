// src/components/search/Feed.jsx
import React from 'react';
import styled from 'styled-components';
import { FeedItem, FeedLogic, PaginationControls, LoadMoreButton } from 'liamc9npm';

// Styled component for the feed container
const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Feed = ({
  items = [],
  sortBy,
  selectedFilters = {},
  ItemComponent = FeedItem,
  pagination,         // Optional: number of items per page
  loadMore,           // Optional: number of items to load per click
  infiniteScroll,     // Optional: number of items to load on bottom scroll
  scrollContainerRef  // Optional: container ref for infinite scrolling
}) => {
  // Retrieve computed values and logic from FeedLogic
  const {
    itemsToRender,
    pages,
    currentPage,
    setCurrentPage,
    hasMoreItems,
    handleLoadMore,
  } = FeedLogic({
    items,
    sortBy,
    selectedFilters,
    pagination,
    loadMore,
    infiniteScroll,
    scrollContainerRef,
  });

  return (
    <FeedContainer>
      {itemsToRender.map((item, index) => (
        <ItemComponent key={index} data={item} />
      ))}

      <PaginationControls
        pages={pages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <LoadMoreButton
        loadMore={loadMore}
        hasMoreItems={hasMoreItems}
        onLoadMore={handleLoadMore}
      />
    </FeedContainer>
  );
};

export default Feed;
