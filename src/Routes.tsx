import { Route, Routes as ReactRoutes } from "react-router-dom"
import { Home } from "./Pages/Home/Home"
import React from "react"
import { useUser } from "./hooks/useUser"
import { RoomsPage } from "./Pages/Rooms/RoomsPage"
import { NotFound } from "./Pages/NotFound"

interface RoutesProps {}

export interface RouteItem {
    path: string
    index?: boolean
    element: React.ReactNode
    label: string
    id: string
}

export const routes: RouteItem[] = [
    { path: "/", index: true, element: <Home />, label: "Início", id: "home" },
    { path: "*", element: <Home />, label: "Não encontrado", id: "not-found" },
]

export const authenticatedRoutes: RouteItem[] = [{ path: "/rooms/:id?", element: <RoomsPage />, label: "Salas", id: "rooms" }]

export const Routes: React.FC<RoutesProps> = ({}) => {
    const user = useUser()

    return (
        <ReactRoutes>
            {user.dto && authenticatedRoutes.map((route) => <Route key={route.path} path={route.path} index={route.index} element={route.element} />)}

            {/* <Route path="*" element={<NotFound />} /> */}
            {routes.map((route) => (
                <Route key={route.path} path={route.path} index={route.index} element={route.element} />
            ))}
        </ReactRoutes>
    )
}
