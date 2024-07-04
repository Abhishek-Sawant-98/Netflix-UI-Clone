import Row from "../Row";
import Banner from "../Banner";
import Navbar from "../NavBar";
import AppAlert from "../AppAlert";
import TrailerModal from "../TrailerModal";
import requests from "../../config/requests";
import './index.scss';

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
