'use client';

import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';
export default function ImagePicker({label, name}: {label: string, name: string}){
    const [pickedImage, setPickedImage] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const pickImageHandler = () => {
        if(inputRef.current){
            inputRef.current.click();
        }
    }

    const imageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(file){
            setPickedImage(URL.createObjectURL(file));
        }else{
            setPickedImage(null);
        }
    }
    return <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {
                    !pickedImage && <p>No image picked yet</p>
                }
                {
                    pickedImage && <Image src={pickedImage} alt="Picked Image" fill/>
                }
            </div>
            <input required ref={inputRef}  type="file" id={name} accept="image/png, image/jpeg" name={name} className={classes.input} onChange={imageChangeHandler}/>
            <button type="button" className={classes.button} onClick={pickImageHandler}>Pick an Image</button>
        </div>
    </div>
}