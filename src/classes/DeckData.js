import { getCardPriority } from "../common/common";

export class DeckData {
    constructor(mainDeck = [], extraDeck = []) {
        this.mainDeck = mainDeck;
        this.extraDeck = extraDeck;
    }

    isEmpty() {
        if (this.mainDeck.length === 0 && this.extraDeck.length === 0)
            return true;
        else
            return false;
    }

    sort() {
        this.mainDeck.sort((cardA, cardB) => getCardPriority(cardA.frameType) - getCardPriority(cardB.frameType));
        this.extraDeck.sort((cardA, cardB) => getCardPriority(cardA.frameType) - getCardPriority(cardB.frameType));
    }
}