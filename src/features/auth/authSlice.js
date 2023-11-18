import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.token = action.payload
        }
    }
})
const selectAuthToken = state => state.auth.token
export const { setAuthToken } = authSlice.actions
export { selectAuthToken }
export default authSlice.reducer
