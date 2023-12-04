import { useState } from 'react';
import { Container, Form, Row, Col, Button, FloatingLabel, Spinner } from 'react-bootstrap';
import { adicionarUsuario} from '../redux/usuarioReducer.js'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import ESTADO from '../recursos/estado';

export default function CadastroUsuario(props) {

    const usuarioVazio = {
        nickname: '',
        url: '',

    }

    const [usuario, setUsuario] = useState(usuarioVazio);
    const { estado, mensagem, usuarios } = useSelector((state) => state.usuario);
    const dispatch = useDispatch();

    function manipularMudancas(e) {
        const componente = e.currentTarget;
        setUsuario({ ...usuario, [componente.name]: componente.value });
    }

    function manipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                dispatch(adicionarUsuario(usuario));
            }
            setUsuario(usuarioVazio);
        }

        e.stopPropagation();
        e.preventDefault();
    }

    if (estado === ESTADO.ERRO) {
        toast.error(({ closeToast }) =>
            <div>
                <p>{mensagem}</p>

            </div>
            , { toastId: estado });
    }
    else if (estado === ESTADO.PENDENTE) {
        toast(({ closeToast }) =>
            <div>
                <Spinner animation="border" role="status"></Spinner>
                <p>Processando a requisição...</p>
            </div>
            , { toastId: estado });
    }
    else {
        toast.dismiss();
        return (       
        <Container>
            <h2>Cadastro de Usuario</h2>
            <Form >
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Código:"
                                className="mb-3"
                            >
                            <Form.Control
                                    type="text"
                                    placeholder="0"
                                    id="nickname"
                                    name="nickname"
                                    value={usuario.nickname}
                                    onChange={manipularMudancas}
                                    disabled />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe seu nickmame!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Usuario:"
                                    className="mb-3"
                                >
                                <Form.Control
                                    type="text"
                                    placeholder="Informe o url da imagem"
                                    id="url"
                                    name="url"
                                    value={usuario.url}
                                    onChange={manipularMudancas}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a url!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} offset={5} className="d-flex justify-content-end">
                            <Button type="submit" variant={"primary"}>{"Cadastrar"}</Button>
                        </Col>
                        <Col md={6} offset={5}>
                            <Button type="button" variant={"secondary"} onClick={() => {
                            }
                            }>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
        );
    }
}