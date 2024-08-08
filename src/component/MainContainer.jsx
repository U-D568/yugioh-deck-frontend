import { Box, Paper } from "@mui/material";
import { DarkModeButton } from "./DarkMode";
import { useTheme } from "@emotion/react";
import DeckContainer from "./DeckContainer";
import { useEffect } from "react";
import { useDeckInfo } from "./DeckInfoProvider";


export default function MainContainer(props) {
    const { margin, flex } = props;
    const theme = useTheme();
    const { deckInfo } = useDeckInfo();

    return (
        <Paper sx={{
            bgcolor: 'background.default',
            padding: theme.spacing(2),
            margin: theme.spacing(2, 2),
            flexGrow: flex,
            overflow: "auto",
            display: "flex",
            flexDirection: "column"
        }}>
            {/* main deck container*/}
            <DeckContainer
                className="main-deck-container"
                cardList={deckInfo?.mainDeck}
                title="Main Deck"
            />
            {/* side deck container*/}
            <DeckContainer
                className="side-deck-container"
                cardList={deckInfo?.extraDeck}
                title="Extra Deck"
            />
        </Paper>
    );
}