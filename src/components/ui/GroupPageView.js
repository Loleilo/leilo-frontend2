import React from 'react'
import ListView from "./ListView";

export default function(props){
    return <ListView>
        {props.children}
    </ListView>
}