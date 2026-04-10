import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstname: 'First Name',
    lastname: 'Last Name',
    token: '',
  },

  reducers: {
    setUser: (state, action) => {
      state.firstname = action.payload.firstname
      state.lastname = action.payload.lastname
      state.token = action.payload.token
    },
  },
})

// Action creators are generated for each case reducer function
//export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default userSlice.reducer
