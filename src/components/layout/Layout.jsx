/* eslint-disable no-useless-constructor */
import React, { Suspense } from "react";
import {Main} from './main/Main'

export default class Layout extends React.Component{
    constructor(props){
        super(props);
    }
        render() {
            return(
                <Suspense fallback={null}><Main></Main></Suspense>
            )
        };
}