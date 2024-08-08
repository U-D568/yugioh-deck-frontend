import axios, { Axios } from "axios";

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