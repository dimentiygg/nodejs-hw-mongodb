const calcPaginationData = ({ total, perPage, page }) => {
  const totalPages = Math.ceil(total / perPage);
  const hasNextPage = page !== totalPages;
  const hasPrevPage = page !== 1;

  return {
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};

export default calcPaginationData;
