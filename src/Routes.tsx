import { Route, Routes as ReactRoutes } from "react-router-dom"
import { Home } from "./Pages/Home/Home"
import { ChatRoom } from "./Pages/ChatRoom/ChatRoom"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {

    return (
        <ReactRoutes>
            <Route index element={<Home />} />
            <Route path="/chat" element={<ChatRoom />} />
            <Route path="*" element={<p>not found</p>} />
        </ReactRoutes>
    )
}
