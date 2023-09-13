import { TextField } from '@mui/material';

const TextFieldComponent = ({ style, label, variant, type, ...rest }) => { 
    return <TextField 
                style={{
                    width: rest.fullWidth ? 'calc(100% - 16px)' : 'auto',
                    ...style
                }}
                {...rest} 
                label={label} 
                variant={variant} 
                type={type}/>
}

TextFieldComponent.defaultProps = {
    style: {},
    variant: "outlined",
    type:"text"
}

export default TextFieldComponent;