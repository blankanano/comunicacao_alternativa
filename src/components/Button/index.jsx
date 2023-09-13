import Button from '@mui/material/Button';

const ButtonComponent = ({ label, style, variant, ...rest }) => {
    return <Button 
                {...rest}
                variant={variant}
                style={{
                    width: rest.fullWidth ? 'calc(100% - 16px)' : 'auto',
                    border: null,
                    borderRadius: 4,
                    padding: 8,
                    ...style
                }}>{label}</Button>
}

ButtonComponent.defaultProps = {
    style: {},
    variant: "contained"
}

export default ButtonComponent;