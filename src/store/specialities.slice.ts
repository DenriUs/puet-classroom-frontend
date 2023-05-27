import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SpecialityEntity } from '../common/types';

export interface SpecialitiesState {
  specialities?: SpecialityEntity[];
  speciality?: SpecialityEntity;
}

const getInitialState = (): SpecialitiesState => ({});

const initialState: SpecialitiesState = getInitialState();

const specialitiesSlice = createSlice({
  name: 'specialities',
  initialState,
  reducers: {
    setSpecialities: (state, action: PayloadAction<SpecialityEntity[]>) => {
      state.specialities = action.payload;
    },
    setSpeciality: (state, action: PayloadAction<SpecialityEntity>) => {
      state.speciality = action.payload;
    },
    createSpecialities: (state, action: PayloadAction<SpecialityEntity>) => {
      state.specialities?.push(action.payload);
    },
    updateSpecialities: (state, action: PayloadAction<SpecialityEntity>) => {
      state.speciality = action.payload;
      const newSpecialities = state.specialities?.map((speciality) =>
        speciality.id === action.payload.id ? action.payload : speciality,
      );
      state.specialities = newSpecialities;
    },
    deleteSpecialities: (state, action: PayloadAction<string | undefined>) => {
      state.specialities = state.specialities?.filter(
        (speciality) => speciality.id !== action.payload,
      );
    },
  },
});

export const {
  setSpecialities,
  setSpeciality,
  createSpecialities,
  updateSpecialities,
  deleteSpecialities,
} = specialitiesSlice.actions;

export const specialitiesReducer = specialitiesSlice.reducer;
