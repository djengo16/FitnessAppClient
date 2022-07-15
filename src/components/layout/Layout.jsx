/* eslint-disable no-useless-constructor */
import React from "react";
import {Main} from './main/Main'
import {Header} from './header/Header'
import {Footer} from './footer/Footer'

export default function Layout() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}