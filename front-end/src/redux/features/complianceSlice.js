import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    company_name: null,
    company_address: null,
    date: null,
  },
};

export const compliance = createSlice({
  name: "comppliance",
  initialState,
  reducers: {
    updateFormValue(state, action) {
      const { field, value } = action.payload;
      state.value[field] = value;
    },
    handleComplianceDate(state, action) {
      state.value.date = action.payload;
    },
    
    resetForm(state) {
      state.value.company_name = "";
      state.value.company_address = "";
      state.value.file = "";
      state.value.date = "";
    },
  },
});

export const { updateFormValue, resetForm, handleComplianceDate } =
  compliance.actions;

export default compliance.reducer;
