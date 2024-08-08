import { decodeDeckData as decodeDeckCode, encodeDeckData, getImageUrl, isExtraDeck, updateDeckCode } from "../common/common";
import Card from "./Card";
import "../style/deckContainer.css";
import { useDeckInfo } from "./DeckInfoProvider";
import { useEffect } from "react";
import { getCardInfo } from "../common/api";
import { DeckData } from "../classes/DeckData";

export default function DeckContainer(props) {
    const {
        title,
        className = "",
        cardList = ["83104731.jpg"]
    } = props;

    const { deckInfo, setDeckInfo } = useDeckInfo();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const deckCode = urlParams.get("deck");
        if (deckCode.length > 0 && deckInfo.isEmpty()) {
            const deck = decodeDeckCode(deckCode);
            setDeckInfo(deck);
            console.log("test");
        }
    }, []);


    const removeCard = (cardData) => {
        let newDeck = new DeckData(deckInfo.mainDeck, deckInfo.extraDeck);
        const mainDeckIndex = deckInfo.mainDeck.findIndex((e) => e === cardData);
        const extraDeckIndex = deckInfo.extraDeck.findIndex((e) => e === cardData);

        if (mainDeckIndex !== -1) {
            newDeck.mainDeck.splice(mainDeckIndex, 1);
        }

        if (extraDeckIndex !== -1) {
            newDeck.extraDeck.splice(extraDeckIndex, 1);
        }

        setDeckInfo(newDeck);
        const deckCode = encodeDeckData(newDeck);
        updateDeckCode(deckCode);
    }

    return (
        <div className={className + " deck-container"}>
            <div className="deck-container-title">{title}</div>
            <div className="card-container">
                {
                    cardList.map((element, index) => (
                        <Card
                            key={index}
                            src={getImageUrl(element.id)}
                            width={98} height={143}
                            onClick={(e) => {
                                console.log("click");
                            }}
                            onRightClick={(e) => {
                                e.preventDefault();
                                removeCard(element);
                            }}
                        />
                    ))
                }
            </div>
        </div>
    )
}