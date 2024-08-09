import SearchIcon from '@mui/icons-material/Search';
import "../style/searchBar.css";
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export default function (props) {
    const { onSearch = () => { } } = props;

    const onKeyDown = (ev) => {
        if (ev.key === "Enter") {
            onSearch(ev.target.value);
        }
    }

    const clearText = () => {

    }

    return (
        <div className="search-bar">
            <SearchIcon />
            <span className="search-bar-warpper">
                <input onKeyDown={onKeyDown} className="search-bar-input" placeholder="Search"></input>
            </span>
            <IconButton onClick={clearText} sx={{padding: "0px"}}>
                <ClearIcon fontSize='small' />
            </IconButton>
        </div>
    )
}