import Cabecalho from './Cabecalho';
import Menu from './Menu';
import Rodape from './Rodape';
export default function Pagina(props) {
    return (
        <>
            <Cabecalho conteudo='ChatMS' />
            <Menu />
            <div>
                {props.children} 
            </div>
            <Rodape />
        </>
    )
}

