import React from 'react'
import {Card} from 'reactstrap'
import {CardWrapperProps} from '../../model/props'

const CardWrapper: React.FC<CardWrapperProps> = (
    {children, handleRemove}
) => {
    return (
        <div className="heading-title">
            <Card style={{padding: 20}}>
                <span className="delete-btn" onClick={() => handleRemove()}>&times;</span>
                {children}
            </Card>
        </div>
    )
}

export default CardWrapper