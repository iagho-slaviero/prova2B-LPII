import { Container } from "react-bootstrap";
import CadastroUsuario from "./CadastroUsuario";
import TabelaUsuario from "./TabelaUsuario";
import Pagina from "../templates/Pagina";

export default function TelaUsuario(props) {

    return (
        <Container>
            <Pagina>
                <CadastroUsuario/>
                <TabelaUsuario />
            </Pagina>
        </Container>
    )
}