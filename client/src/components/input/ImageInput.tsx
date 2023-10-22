import React, {ChangeEvent} from 'react'
import {Input, Label} from 'reactstrap'
import {Trash} from 'react-bootstrap-icons'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {removeImage, setImage} from "../../feutures/imageInputSlice";

const ImageInput: React.FC = () => {
    const image = useSelector((state: RootState) => state.imageInput.image)
    const dispatch = useDispatch()

    const handleUpload = ({target}: ChangeEvent<HTMLInputElement>) => {
        const {files} = target;
        const file = files && files[0]
        if (file) {
            dispatch(setImage(file))
            target.value = ""
        }
    };

    const handleRemove = () => {
        dispatch(removeImage())
    }

    return (
        <div className="personal-image heading-title">
            <Label for="image" className="label" style={{marginBottom: 0}}>
                <figure className="personal-figure">
                    {image && <img
                        src={URL.createObjectURL(image)}
                        className="personal-avatar" alt="not found"
                    />}
                    <figcaption className={
                        `personal-figcaption ${!image && "personal-figcaption-visible"}`
                    }>
                        <img alt="not found"
                             src="/images/camera-white.png"/>
                        <div style={{color: "white"}}>Upload avatar</div>
                    </figcaption>
                </figure>
            </Label>
            <Input
                id="image" accept="image/jpeg"
                className="d-none" type="file"
                onChange={handleUpload}
            />
           <div className="trash-icon">{image && <Trash onClick={handleRemove}/>}</div>
        </div>
    )
}

export default ImageInput