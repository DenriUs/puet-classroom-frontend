import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortingDirection } from '../common/types';

export interface PaginatedDataState {
  page: number;
  take: number;
  search: string;
  total: number;
  sortingField: string;
  sortingDirection?: SortingDirection;
}

const getInitialState = (): PaginatedDataState => ({
  total: 0,
  page: 1,
  search: '',
  take: 20,
  sortingField: '',
});

const initialState: PaginatedDataState = getInitialState();

const paginatedDataSlice = createSlice({
  name: 'paginated-data',
  initialState,
  reducers: {
    setPaginatedDataPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPaginatedDataPageSize: (state, action: PayloadAction<number>) => {
      state.take = action.payload;
      state.page = 1;
    },
    setPaginatedDataSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPaginatedDataSorting: (
      state,
      action: PayloadAction<{ field: string; order: SortingDirection }>,
    ) => {
      state.sortingField = action.payload.field;
      state.sortingDirection = action.payload.order;
    },
    setPaginatedDataTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    resetPaginatedDataState: (state) => {
      const initState = getInitialState();
      state.page = initState.page;
      state.search = initState.search;
      state.take = initState.take;
      state.sortingDirection = initState.sortingDirection;
      state.sortingField = initState.sortingField;
      state.total = initState.total;
    },
  },
});

export const {
  resetPaginatedDataState,
  setPaginatedDataPage,
  setPaginatedDataPageSize,
  setPaginatedDataSearch,
  setPaginatedDataSorting,
  setPaginatedDataTotal,
} = paginatedDataSlice.actions;

export const paginatedDataReducer = paginatedDataSlice.reducer;
