import { useTheme } from "@emotion/react";
import { Box, Paper } from "@mui/material";
import SearchBar from "./SearchBar";
import { searchCard } from "../common/api";
import { useEffect, useState } from "react";
import Card from "./Card";
import { getImageUrl } from "../common/common";
import { useDeckInfo } from "./DeckInfoProvider";

export default function SearchContainer(props) {
    const { margin, flex } = props;
    const [cards, setCards] = useState()
    const { deckInfo, setDeckInfo } = useDeckInfo();
    const theme = useTheme();

    const onSearch = async (keyword) => {
        const res = await searchCard(keyword, 0, 56);
        if (res != null) {
            setCards(res.content);
        }
    }

    const onCardClick = (index) => {
        const selectedCard = cards[index];
        let newDeck = { ...deckInfo };

        if (deckInfo) {
            let cardType = selectedCard.frameType.split("_")[0];
            if (["xyz", "fusion", "synchro", "link"].includes(cardType))
            {
                const count = deckInfo?.extraDeck?.filter(x => x.id == selectedCard.id).length;
                if (count < 3)
                    newDeck.extraDeck.push(selectedCard);
            }
            else {
                const count = deckInfo?.mainDeck?.filter(x => x.id == selectedCard.id).length;
                if (count < 3)
                    newDeck.mainDeck.push(selectedCard);
            }
        }

        setDeckInfo(newDeck);
    }

    return (
        <div className="search-container">
            <SearchBar onSearch={onSearch} />
            <div className="search-results">
                {
                    cards?.map((element, index) => {
                        return (
                            <Card
                                src={getImageUrl(element.id)}
                                width={70}
                                height={102.016}
                                onClick={(e) => { onCardClick(index) }}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}