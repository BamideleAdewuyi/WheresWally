import App from "../../App";
import Game from "../Game/Game";
import Homepage from "../Homepage/Homepage";
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "/", element: <Homepage />},
            {path: "/play", element: <Game />},
        ]
    }
]);

export default router;