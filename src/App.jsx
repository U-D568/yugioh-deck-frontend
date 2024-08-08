import MainContainer from './component/MainContainer';
import SearchContainer from './component/SearchContainer';
import Container from '@mui/material/Container';
import { DarkModeProvider } from './component/DarkMode';
import { Grid } from '@mui/material';

import "./style/style.css"
import { DeckInfoProvider } from './component/DeckInfoProvider';


function App() {
    return (
        <DarkModeProvider>
            <Container sx={{
                bgcolor: 'background.default',
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                width: "100%"
            }}>
                <DeckInfoProvider>
                    <MainContainer flex={3} />
                    <SearchContainer flex={1} />
                </DeckInfoProvider>
            </Container>
        </DarkModeProvider >
    );
}

export default App;
