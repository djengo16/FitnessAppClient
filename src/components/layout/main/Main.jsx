import { Routes, Route } from "react-router-dom";
import { AuthenticatedRoute } from '../../../utils/guards/AuthenticatedRoute'
import { NonAuthenticatedRoute } from '../../../utils/guards/NonAuthenticatedRoute'
import routes from '../../../utils/routes'

export function Main(){
    return(
        <Routes>
            {routes.map(({ component: Component, path, authenticated }) => (
        <Route path={`/${path}`} key={path} element=
            {authenticated 
            ? (<AuthenticatedRoute> <Component /></AuthenticatedRoute>) 
            : (<NonAuthenticatedRoute> <Component /></NonAuthenticatedRoute>) }>
        </Route>
      ))}
        </Routes>
    )
}