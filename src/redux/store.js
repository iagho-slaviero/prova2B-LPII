import {configureStore} from '@reduxjs/toolkit';
import usuarioSlice from './usuarioReducer';

const store = configureStore({
    reducer:{
        usuario: usuarioSlice,
    }   
});

export default store;