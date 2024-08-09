import axios from "axios";
const pako = require('pako');

const baseUrl = "http://www.yugiohdeck.store:8081";
// const baseUrl = "/";

export async function getAxios(url, params) {
    const config = {
        params: params,
        'content-type': 'application/json;charset=UTF-8',
        accept: 'application/json'
    }
    const response = await axios.get(encodeURI(`${baseUrl + url}`), config);

    if (response.status == 200) {
        return response.data;
    } else {
        throw new Error(`status: ${response.status} url: ${url}`);
    }
}

export function getImageUrl(imageId) {
    return `http://www.yugiohdeck.store/images/${imageId}.jpg`;
    // return `${baseUrl}/images/${imageId}`;
}

export function isExtraDeck(cardData) {
    let cardType = cardData.frameType.split("_")[0];
    let extraDeckTypes = ["xyz", "fusion", "synchro", "link"];

    if (extraDeckTypes.includes(cardType))
        return true;
    else
        return false;
}

export function encodeDeckData(deckData) {
    let reduced = { ...deckData };
    for (let key of Object.keys(reduced)) {
        reduced[key] = reduced[key].map((card) => ({ id: card.id, frameType: card.frameType }));
    }
    let stringify = JSON.stringify(reduced);
    let deflated = pako.deflate(stringify, { to: "string" });
    let hexCode = Array.from(deflated).map((num) => num.toString(16).padStart(2, "0"));
    hexCode = hexCode.join("");

    return hexCode;
}

export function decodeDeckData(hexCode) {
    const bytesLength = hexCode.length / 2;
    const uint8Array = new Uint8Array(bytesLength);
    for (let i = 0; i < bytesLength; i++) {
        const hex = hexCode.substring(i * 2, (i + 1) * 2);
        uint8Array[i] = parseInt(hex, 16);
    }
    const inflated = pako.inflate(uint8Array, { to: "string" });
    const deckData = JSON.parse(inflated);

    return deckData;
}

export function updateDeckCode(code) {
    const newURL = `${window.location.origin}?deck=${code}`;
    window.history.pushState({}, "", newURL);
}

export function getCardPriority(cardType) {
    const priority_enum = {
        normal: 0,
        normal_pendulum: 1,
        effect: 2,
        effect_pendulum: 3,
        ritual: 4,
        ritual_pendulum:5,
        spell: 6,
        trap: 7,
        fusion: 8,
        fusion_pendulum: 9,
        synchro: 10,
        synchro_pendulum: 11,
        xyz: 12,
        xyz_pendulum: 13,
        link: 14
    }

    return priority_enum[cardType];
}

export function addClassName(className, newClass) {
    let classList = className.split(" ");
    if (classList.findIndex((e) => e === newClass) === -1) {
        classList.push(newClass);
    }

    return classList.join(" ");
}

export function removeClassName(className, target) {
    let classList = className.split(" ");
    let index = classList.findIndex((e) => e === target);
    if (index !== -1) {
        classList.splice(index, 1);
    }

    return classList.join(" ");
}