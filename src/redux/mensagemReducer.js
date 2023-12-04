import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "../recursos/estado.js";
const urlBase = "https://backend-bcc-2-b.vercel.app/mensagem";

export const buscarMensagens = createAsyncThunk('buscarMensagens', async () => {
    try {
        const resposta = await fetch(urlBase, { method: "GET" });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                mensagem: "",
                listaMensagens: dados.listaMensagens
            }
        }
        else {
            return {
                status: dados.status,
                mensagem: dados.mensagem,
                listaMensagens: []
            }
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: "Erro ao recuperar mensagens:" + erro.message,
            listaMensagens: []
        }
    }
});

export const incluirMensagem = createAsyncThunk('incluirMensagem', async (men) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "mensagem": men.mensagem,
                "usuario": {
                    "id": men.usuario.id,
                }
            })
        });
        const dados = await resposta.json();
        if (dados.status) {
            men.id = dados.id;
            return {
                status: dados.status,
                mensagem: dados.mensagem,
                novaMensagem: men
            }
        }
        else {
            return {
                status: dados.status,
                mensagem: dados.mensagem
            }
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: "Erro ao incluir mensagem: " + erro.message
        }
    }
});

const estadoInicial = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    mensagens: []
}

const mensagemSlice = createSlice({
    name: 'mensagem',
    initialState: estadoInicial,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(buscarMensagens.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Buscando mensagens...';
            })
            .addCase(buscarMensagens.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = "Mensagens recuperadas do backend!";
                    state.mensagens = action.payload.listaMensagens;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.mensagens = [];
                }
            })
            .addCase(buscarMensagens.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.mensagens = [];
            })
            .addCase(incluirMensagem.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Incluindo mensagem...';
            })
            .addCase(incluirMensagem.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.mensagens.push(action.payload.novaMensagem);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
});

export default mensagemSlice.reducer;
