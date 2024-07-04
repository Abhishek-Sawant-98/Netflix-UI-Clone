import Row from "./components/Row";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import AppAlert from "./components/AppAlert";
import TrailerModal from "./components/TrailerModal";
import requests from "./utils/requests";

const App = () => {
    return (
        <div className="app">
            <Navbar />

            <Banner />

            {/* Rows */}
            <section>
                {requests.map((req, i) => (
                    <Row
                        key={`movieRow${i}`}
                        title={req.title}
                        fetchUrl={req.url}
                        isLargePoster={req.isLargePoster as boolean}
                    />
                ))}
            </section>

            <AppAlert />

            <TrailerModal />

            <footer>
                Made with 💙 by &nbsp;
                <a
                    id="footerLink"
                    href="https://github.com/Abhishek-Sawant-98"
                    target="blank"
                >
                    <strong>Abhishek Sawant</strong>
                </a>
            </footer>
        </div>
    );
};

export default App;
