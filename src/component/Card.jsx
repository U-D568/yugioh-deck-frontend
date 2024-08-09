import "../style/card.css";


export default function Card(props) {
    const {
        src,
        onClick,
        onDoubleClick,
        onRightClick,
        width = 98,
        height = 143,
        name
    } = props;

    return (
        <span className="card search-thumbnail">
            <img
                src={src}
                onDoubleClick={onDoubleClick}
                onClick={onClick}
                onContextMenu={onRightClick}
                width={width} height={height}
            />
            {name && <div className="card-name">{name}</div>}
        </span>
    )
}
