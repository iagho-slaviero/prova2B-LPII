import Menu from './Menu';

export default function Pagina(props) {
    return (
        <>
            <Menu />
            <div>
                {props.children} 
            </div>
        </>
    )
}

