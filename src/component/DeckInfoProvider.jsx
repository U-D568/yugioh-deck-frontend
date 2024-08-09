import { createContext, useContext, useState } from "react";
import { DeckData } from "../classes/DeckData";

const DeckInfoContext = createContext();

export function DeckInfoProvider(props) {
    const { children } = props;
    const [deckInfo, setDeckInfo] = useState(new DeckData());

    const apply = (deck) => {
        if (!(deck instanceof DeckData))
            throw new Error(`invalid data type: ${typeof (deck)}`);
        deck.sort();
        setDeckInfo(deck);
    }

    return (
        <DeckInfoContext.Provider value={{ deckInfo, setDeckInfo: apply }}>
            {children}
        </DeckInfoContext.Provider>
    )
}

export function useDeckInfo() {
    const context = useContext(DeckInfoContext);
    if (context === undefined)
        throw new Error("useDeskInfo must be used within an DeckInfoContextProvider");
    return context;
}