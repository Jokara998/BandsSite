import React from "react"
import {Button as MuiButton} from "@material-ui/core"

const Button = (props) =>{

    const {text, type, fullWidth, className, variant, onClick, size} = props;

    return(
        <MuiButton
            type = {type}
            fullWidth = {fullWidth}
            className = {className}
            variant = {variant}
            onClick = {onClick}
            size = {size}
        >
            {text}

        </MuiButton>
    );
}

export default Button;