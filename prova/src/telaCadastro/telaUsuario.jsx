import { Container } from "react-bootstrap";
import cadastroUsuario from "./cadastroUsuario";
import tabelaUsuario from "./tabelaUsuario";
import { useState } from "react";

export default function telaUsuario(props) {
    const [exibirCadastro, setExibirCadastro] = useState(false);
    const [usuarioParaEdicao, setUsuarioParaEdicao] = useState({
        nickname: '0',
        url: ''
    });
    const [modoEdicao, setModoEdicao] = useState(false);

    return (
        <Container>
            <Pagina>
                {
                    exibirCadastro ? <cadastroUsuario exibirCadastro={setExibirCadastro}
                        usuarioParaEdicao={usuarioParaEdicao}
                        setUsuarioParaEdicao={setUsuarioParaEdicao}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                    />
                        :
                        <tabelaUsuario exibirCadastro={setExibirCadastro}
                            usuarioParaEdicao={usuarioParaEdicao}
                            setUsuarioParaEdicao={setUsuarioParaEdicao}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                        />
                }
            </Pagina>
        </Container>
    )
}