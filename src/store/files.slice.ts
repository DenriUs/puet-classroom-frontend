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
    createFiles: (state, action: PayloadAction<FileEntity>) => {
      state.files?.push(action.payload);
    },
    deleteFiles: (state, action: PayloadAction<string | undefined>) => {
      const newFiles = state.files?.filter((file) => file.id !== action.payload);
      state.files = newFiles;
    },
  },
});

export const { setFiles, setFile, deleteFiles, createFiles } = filesSlice.actions;

export const filesReducer = filesSlice.reducer;
