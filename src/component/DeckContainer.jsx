import { getImageUrl } from "../common/common";
import Card from "./Card";

export default function DeckContainer(props) {
    const {
        title,
        className = "",
        cardList = ["83104731.jpg"]
    } = props;


    return (
        <div className={className + " deck-container"}>
            <div className="deck-container-title">{title}</div>
            <div className="card-container">
                {
                    cardList.map((element) => <Card src={getImageUrl(element.id) } width={98} height={143} />)
                }
            </div>
        </div>
    )
}