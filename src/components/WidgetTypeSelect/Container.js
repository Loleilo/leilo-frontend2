import React from 'react'
import View from "../util/SelectView"
import widgetList from '../widgets/list'

export default function (props) {
    return <View
        selections={Object.keys(widgetList).map((key) => {
            return {
                value: key,
                displayName: widgetList[key].displayName,
                icon: widgetList[key].icon,
            }
        })}
        selected={props}
    />
}