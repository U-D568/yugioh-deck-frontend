import SearchIcon from '@mui/icons-material/Search';
import "../style/searchBar.css";

export default function (props) {
    const { onSearch = () => { } } = props;

    const onKeyDown = (ev) => {
        if (ev.key === "Enter") {
            onSearch(ev.target.value);
        }
    }

    return (
        <div className="search-bar">
            <SearchIcon />
            <span className="search-bar-warpper">
                <input onKeyDown={onKeyDown} className="search-bar-input" placeholder="Search"></input>
            </span>
        </div>
    )
}