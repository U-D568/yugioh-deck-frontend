import { createContext, useContext, useEffect, useRef, useState } from "react"
import { getImageUrl } from "../common/common";
import { getCardInfo } from "../common/api";

const CardDetailContext = createContext(false);

export function CardDetailProvider(props) {
    const { children } = props;
    const [openState, setOpenState] = useState(false);
    const [imgSrc, setSrc] = useState("");
    const [detail, setDetail] = useState({ title: "", description: "" });

    const close = () => {
        setOpenState(false);
    }

    const open = async (cardId) => {
        const imageUrl = getImageUrl(cardId);
        setSrc(imageUrl);
        setOpenState(true);

        const res = await getCardInfo(cardId);
        if (res) {
            setDetail({
                title: res.name,
                description: res.korDesc
            });
        }
    }

    return (
        <CardDetailContext.Provider value={{ open, close }}>
            {openState &&
                <div className="card-detail-panel" onClick={close}>
                    <img
                        className="card-detail-image"
                        src={imgSrc != "" ? imgSrc : null}
                    />
                    <div className="detail">
                        <div className="title">{detail.title}</div>
                        <div className="description">{detail.description}</div>
                    </div>
                </div>
            }

            {children}
        </CardDetailContext.Provider>
    )
}

export function useCardDetail() {
    const context = useContext(CardDetailContext);
    return context;
}
