import React from "react";
import CircularProgress from "material-ui/CircularProgress";

export default function(entity){
    if(!entity)
        return <CircularProgress size={40}/>;

    return entity;
}