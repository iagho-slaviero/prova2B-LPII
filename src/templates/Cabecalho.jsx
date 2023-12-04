import { Alert } from "react-bootstrap";
export default function Cabecalho(props) {
    return (
        <header>
            <Alert variant="light" className={'text-center'}>
                {props.conteudo || "Pagina"}
            </Alert>
        </header>
    )
}