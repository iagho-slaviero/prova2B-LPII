import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ESTADO from '../recursos/estado';
const urlBase = 'https://backend-bcc-2-b.vercel.app/usuario';

export const buscarUsuario = createAsyncThunk('buscarUsuario', async () => {
    try { 
        const resposta = await fetch(urlBase, { method: 'GET' });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                listaUsuario: dados.listaUsuario,
                mensagem: ""
            }   
        }
        else {
            return {
                status: dados.status,
                listaUsuario: [],
                mensagem: dados.mensagem
            }
        }
    } catch (erro) {
        return {
            status: false,
            listaUsuario: [],
            mensagem: 'Ocorreu um erro ao recuperar os usuarios da base de dados:' + erro.message
        }
    }
});

export const adicionarUsuario = createAsyncThunk('usuario/adicionar', async (usuario) => {
    const resposta = await fetch(urlBase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }).catch(erro => {
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao cadastrar o usuario:' + erro.message
        }
    });
    if (resposta.ok) {
        const dados = await resposta.json();
        return {
            status: dados.status,
            mensagem: dados.mensagem,
            usuario
        }
    }
    else {
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao cadastrar o usuario.',
            usuario
        }
    }
});

const estadoInicial = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    usuarios: []
}

const usuarioSlice = createSlice({
    name: 'usuario',
    initialState: estadoInicial,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(buscarUsuario.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Buscando usuarios...";
            })
            .addCase(buscarUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = "Usuario recuperado";
                    state.usuarios = action.payload.listaUsuario;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.usuarios = [];
                }
            })
            .addCase(buscarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.pyload.message;
                state.usuarios = [];
            })
            .addCase(adicionarUsuario.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.usuarios.push(action.payload.usuario);
                state.mensagem = action.payload.mensagem;
            })
            .addCase(adicionarUsuario.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Adicionando usuario...";
            })
            .addCase(adicionarUsuario.rejected, (state, action) => {
                state.mensagem = "Erro ao adicionar o usuario: " + action.error.message;
                state.estado = ESTADO.ERRO;
            })
    }
});

export default usuarioSlice.reducer;