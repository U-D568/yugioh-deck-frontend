import { decodeDeckData as decodeDeckCode, encodeDeckData, getImageUrl, removeClassName, updateDeckCode } from "../common/common";
import "../style/deckContainer.css";
import { useDeckInfo } from "./DeckInfoProvider";
import { useEffect, useRef, useState } from "react";
import { DeckData } from "../classes/DeckData";
import { useCardDetail, ZoomInPanel } from "./CardDetailPanel";
import Card from "./Card";
import { IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

export default function DeckContainer(props) {
    const {
        title,
        className = "",
        cardList = ["83104731.jpg"]
    } = props;

    const [zoomIn, setZoomIn] = useState(false);
    const { deckInfo, setDeckInfo } = useDeckInfo();
    const { open, close } = useCardDetail();
    const zoomedCard = useRef();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const deckCode = urlParams.get("deck");
        if (deckCode !== null) {
            if (deckCode.length > 0 && deckInfo.isEmpty()) {
                const obj = decodeDeckCode(deckCode);
                const deckData = new DeckData(obj.mainDeck, obj.extraDeck);
                setDeckInfo(deckData);
            }
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

    const zoomInCard = (e, element) => {
        open(element.id);
        // if (!zoomIn) {
        //     let className = e.target.className.split(" ");
        //     if (className.findIndex((e) => e === "zoom-in") === -1) {
        //         className.push("zoom-in")
        //         e.target.className = className.join(" ");
        //     }
        //     zoomedCard.current = e.target;
        // }
    }

    const empty = (e) => {
        let newDeck = new DeckData();
        if (className === "main-deck-container") {
            newDeck.extraDeck = deckInfo.extraDeck;
            setDeckInfo(newDeck);
        }
        else if (className === "side-deck-container") {
            newDeck.mainDeck = deckInfo.mainDeck;
            setDeckInfo(newDeck);
        }
    }

    return (
        <div className={className + " deck-container"}>
            <div className="deck-container-title">
                <span>{title}</span>
                {cardList.length > 0 &&
                    <IconButton onClick={empty}>
                        <ClearIcon />
                    </IconButton>
                }
            </div>
            <div className="card-container">
                {
                    cardList.map((element, index) => (
                        <Card
                            key={index}
                            src={getImageUrl(element.id)}
                            width={98} height={143}
                            onClick={(e) => zoomInCard(e, element)}
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