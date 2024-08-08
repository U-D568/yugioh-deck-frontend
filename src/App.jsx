import MainContainer from './component/MainContainer';
import SearchContainer from './component/SearchContainer';
import { DarkModeProvider } from './component/DarkMode';

import "./style/style.css"
import { DeckInfoProvider } from './component/DeckInfoProvider';
import Header from './component/Header';
import Footer from './component/Footer';


function App() {
    return (
        <DarkModeProvider>
            <div className="app">
                <Header />
                <div className="content">
                    <DeckInfoProvider>
                        <MainContainer />
                        <SearchContainer />
                    </DeckInfoProvider>
                </div>
                <Footer />
            </div>
        </DarkModeProvider >
    );
}

export default App;
