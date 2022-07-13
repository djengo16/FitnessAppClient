import { Routes, Route } from "react-router-dom";
import Login from '../../../pages/login/Login'
import Home from '../../../pages/home/Home'
import { AuthenticatedRoute } from '../../../utils/guards/AuthenticatedRoute'
import { NonAuthenticatedRoute } from '../../../utils/guards/NonAuthenticatedRoute'

export function Main(){
    return(
        <Routes>
        <Route path="/login" element={<NonAuthenticatedRoute><Login /></NonAuthenticatedRoute>} />
        <Route path='/home' element={<AuthenticatedRoute><Home/></AuthenticatedRoute>} />
        </Routes>
    )
}