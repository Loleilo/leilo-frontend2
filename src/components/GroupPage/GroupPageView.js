import React from 'react'
import ListView from "../WidgetEdit/ListView";

export default function(props){
    return <ListView spacing="20px">
        {props.children}
    </ListView>
}