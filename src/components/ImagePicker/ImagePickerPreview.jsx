import noImage from '../../assets/images/vecteezy_illustration-of-no-image-available-icon-template-for-no_8015799.jpg'

export default function ImagePickerPreview({src, title, className}) {
    return (
        <>
            <img className={`image-picker-preview ${className}`} src={src ?? noImage} alt={title} title={title}/>
        </>
    )
}