import { Container } from "react-bootstrap";
import CadastroUsuario from "./CadastroUsuario";
import TabelaUsuario from "./TabelaUsuario";
import Pagina from "../templates/Pagina";
import { useState } from "react";

export default function telaUsuario(props) {
    const [exibirCadastro, setExibirCadastro] = useState(false);

    return (
        <Container>
            <Pagina>
                {
                    exibirCadastro ? <CadastroUsuario/>
                    :
                    <TabelaUsuario />
                }
            </Pagina>
        </Container>
    )
}