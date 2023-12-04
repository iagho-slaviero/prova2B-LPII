import { Button, Container, Spinner, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { buscarUsuario} from "../../redux/usuarioReducer";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ESTADO from "../recursos/estado";
export default function tabelaUsuario(props) {

    const { estado, mensagem, usuarios } = useSelector(state => state.usuario);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(buscarUsuario());
    }, [dispatch]);

    if (estado === ESTADO.PENDENTE) {
        toast(({ closeToast }) =>
            <div>
                <Spinner animation="border" role="status"></Spinner>
                <p>Buscando usuarios....</p>
            </div>
        ,{toastId:estado});
    }
    else if (estado === ESTADO.ERRO) {
        toast.error(({ closeToast }) =>
            <div>
                <p>{mensagem}</p>

            </div>
        , {toastId: estado});
    }
    else {
        toast.dismiss();
        return (
            <Container>
                <Button type="button" onClick={() => {
                    props.exibirCadastro(true);
                }}>Novo Usuario</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>NickName</th>
                            <th>Url</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios.map((usuario) => {
                                return (<tr key={usuario.id}>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.nickname}</td>
                                    <td>{usuario.url}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }
}