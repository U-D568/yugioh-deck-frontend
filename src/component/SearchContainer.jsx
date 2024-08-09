import { useTheme } from "@emotion/react";
import SearchBar from "./SearchBar";
import { searchCard } from "../common/api";
import { useState } from "react";
import { encodeDeckData, getImageUrl, isExtraDeck, updateDeckCode } from "../common/common";
import { useDeckInfo } from "./DeckInfoProvider";
import { DeckData } from "../classes/DeckData";
import Card from "./Card";

export default function SearchContainer(props) {
    const [cards, setCards] = useState()
    const { deckInfo, setDeckInfo } = useDeckInfo();

    const onSearch = async (keyword) => {
        const res = await searchCard(keyword, 0, 56);
        if (res != null) {
            setCards(res.content);
        }
    }

    const onCardClick = (index) => {
        const selectedCard = cards[index];
        let newDeck = new DeckData(deckInfo.mainDeck, deckInfo.extraDeck);

        if (deckInfo) {
            if (isExtraDeck(selectedCard)) {
                const count = deckInfo?.extraDeck?.filter(x => x.id == selectedCard.id).length;
                if (count < 3 && deckInfo.extraDeck.length < 15) {
                    newDeck.extraDeck.push(selectedCard);
                    newDeck.extraDeck.sort((a, b) => a.id - b.id);
                }
            }
            else {
                const count = deckInfo?.mainDeck?.filter(x => x.id == selectedCard.id).length;
                if (count < 3 && deckInfo.mainDeck.length < 60) {
                    newDeck.mainDeck.push(selectedCard);
                    newDeck.mainDeck.sort((a, b) => a.id - b.id);
                }
            }
        }

        setDeckInfo(newDeck);
        const deckCode = encodeDeckData(newDeck);
        updateDeckCode(deckCode);
    }

    return (
        <div className="search-container">
            <SearchBar onSearch={onSearch} />
            <div className="search-wrapper">
                <div className="search-result">
                    {
                        cards?.map((element, index) => {
                            return (
                                <Card
                                    key={index}
                                    src={getImageUrl(element.id)}
                                    width={70}
                                    height={102.016}
                                    onClick={(e) => { onCardClick(index) }}
                                    name={element.name}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}