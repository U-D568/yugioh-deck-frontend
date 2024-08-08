import { createContext, useContext, useState } from "react";

const DeckInfoContext = createContext();

export function DeckInfoProvider(props) {
    const { children } = props;
    const [deckInfo, setDeckInfo] = useState({
        mainDeck: [],
        extraDeck: []
    });

    return (
        <DeckInfoContext.Provider value={{ deckInfo, setDeckInfo }}>
            {children}
        </DeckInfoContext.Provider>
    )
}

export function useDeckInfo () {
    const context = useContext(DeckInfoContext);
    if (context === undefined)
        throw new Error("useDeskInfo must be used within an DeckInfoContextProvider");
    return context;
}