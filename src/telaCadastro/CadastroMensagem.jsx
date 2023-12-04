import { useState } from 'react';
import { toast } from 'react-toastify';
import ESTADO from '../recursos/estado.js';
import { incluirMensagem } from '../redux/mensagemReducer.js';
import { Container, Form, Row, Col, Button, FloatingLabel, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { buscarUsuarios } from '../redux/usuarioReducer.js'

export default function CadastroMensagem(props) {

    const mensagVazio = {
        mensagem: '',
        usuario: null
    }

    const [mensag, setMensag] = useState(mensagVazio);
    const { estado, mensagem, mensags } = useSelector((state) => state.mensagem);
    const dispatch = useDispatch();

    function manipularMudancas(e) {
        const componente = e.currentTarget;
        setMensag({ ...mensag, [componente.name]: componente.value });
    }
    function manipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                dispatch(incluirMensagem(mensag));
            }
            setMensag(mensagVazio);
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
                <h2>Enviar mensagem</h2>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Usuário:"
                                    className="mb-3"
                                >

                                    <Form.Control
                                        type="text"
                                        placeholder="0"
                                        id="nickname"
                                        name="nickname"
                                        value={""}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe nome do usuario</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Mensagem:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        id="mensagem"
                                        name="mensagem"
                                        value={mensag.mensagem}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe a mensagem</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} offset={5} className="d-flex justify-content-end">
                            <Button type="submit" variant={"primary"}>{"Enviar"}</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}