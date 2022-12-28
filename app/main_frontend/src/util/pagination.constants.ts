export const ITEMS_PER_PAGE = 20;

export interface IPaginationBaseState {
  itemsPerPage: number;
  sort: string;
  order: string;
  activePage: number;
}
export const getSortState = (
  location: any,
  itemsPerPage: number
): IPaginationBaseState => {
  const _urlBase = new URL(`http://localhost${location}`);
  const pageParam = _urlBase.searchParams.get('page');
  const sortParam = _urlBase.searchParams.get('sort');

  let sort = 'id';
  let order = 'asc';
  let activePage = 1;

  if (pageParam && !isNaN(parseInt(pageParam, 10))) {
    activePage = parseInt(pageParam, 10);
  }

  if (sortParam) {
    sort = sortParam.split(',')[0];
    order = sortParam.split(',')[1];
  }
  return { itemsPerPage, sort, order, activePage };
};
