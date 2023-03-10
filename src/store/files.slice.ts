import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileEntity } from '../common/types';

export interface FilesState {
  files?: FileEntity[];
  file?: FileEntity;
}

const getInitialState = (): FilesState => ({});

const initialState: FilesState = getInitialState();

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<FileEntity[]>) => {
      state.files = action.payload;
    },
    setFile: (state, action: PayloadAction<FileEntity>) => {
      state.file = action.payload;
    },
  },
});

export const { setFiles, setFile } = filesSlice.actions;

export const filesReducer = filesSlice.reducer;
