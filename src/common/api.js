import { getAxios } from "./common";

export async function searchCard(keyword, pageIndex, chunk) {
    //search
    const param = {
        keyWord: keyword,
        page: pageIndex,
        size: chunk
    };

    const res = await getAxios("/cards/search", param);
    if (res) {
        return res;
    }
    return res
}