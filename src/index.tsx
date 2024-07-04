import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/App";
import { store } from "./redux/store";
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.css';
import "./index.scss";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
