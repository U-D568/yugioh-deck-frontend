export default function Card(props) {
    const {
        src,
        onClick,
        width = 98,
        height = 143,
        name
    } = props;

    return (
        <span className="card">
            <img src={src} onClick={onClick} width={width} height={height} />
            {name && <div>{name}</div>}
        </span>
    )
}
