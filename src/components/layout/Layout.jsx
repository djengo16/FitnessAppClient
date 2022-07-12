/* eslint-disable no-useless-constructor */
import React from "react";
import {Main} from './main/Main'

export default class Layout extends React.Component{
    constructor(props){
        super(props);
    }
        render() {
            return(
                <Main></Main>
            )
        };
}