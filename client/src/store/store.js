import { configureStore } from "@reduxjs/toolkit";
import  userreducer  from "../slice/userslice"

export const store = configureStore({
    reducer: {
        userdata :  userreducer,
    }
})

