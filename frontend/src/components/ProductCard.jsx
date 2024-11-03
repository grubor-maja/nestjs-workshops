import { useState } from "react";

const ProductCard = (props) => {

    const maxChars = 50;
    const shortDescription = props.product.description.length > maxChars
    ? props.product.description.substring(0, maxChars) + "..."
    : props.product.description;
    return(
    <>
        <div className="card" style={{width: "15rem"}}>
        <img src={props.product.imageSrc} className="card-img-top product-card-image" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{props.product.name}</h5>
            <p className="card-text">{shortDescription}</p>
            <a href="#" className="btn btn-primary">Buy</a>
        </div>
        </div>
    </>
    )
}
export default ProductCard;