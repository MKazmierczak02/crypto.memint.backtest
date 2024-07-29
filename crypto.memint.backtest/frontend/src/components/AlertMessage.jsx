import React from 'react'
import { Alert } from 'react-bootstrap'

function AlertMessage({ variant, children }) {
    return (
        <Alert style={{fontSize: "2rem", textAlign: "center"}} variant={variant}>
            {children}
        </Alert>
    )
}

export default AlertMessage