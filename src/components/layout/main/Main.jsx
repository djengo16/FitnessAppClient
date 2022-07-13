import {Routes, Route} from 'react-router-dom'
import Login from '../../../pages/login/Login'
import Home from '../../../pages/home/Home'

export function Main(){
    return(
        <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path='/home' element={<Home/>}></Route>
        </Routes>
    )
}