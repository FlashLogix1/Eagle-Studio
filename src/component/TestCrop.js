import Cropper from "react-easy-crop";
import {useState} from "react";


export const TestCrop = ({image, cropSize, onCropComplete, visible, setVisible }) => {

    const [crop, setCrop] = useState({ x: 0, y: 0 })

    return(
        <div className="">
            <div className="cropContainer">
                <Cropper
                    style={{zIndex: 9000}}
                    image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
                    crop={crop}
                    // zoom={zoom}
                    cropSize={{ width: 400, height: 190 }}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    // onZoomChange={setZoom}
                    // initialCroppedAreaPercentages={initialCroppedArea}
                />
            </div>
    </div>)
}