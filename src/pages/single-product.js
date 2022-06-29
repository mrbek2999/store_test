import {connect} from "react-redux";
import {getProduct} from "../store/Products";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Rating, Stack} from "@mui/material";
import Navbar from "../blocks/navbar";

const customStyle = {
    "& .MuiRating-iconEmpty": {
        color: "#FFC212"
    },
    "& .MuiRating-decimal:hover": {
        transform: "scale(1)"
    }
};

function TotalDiscount(price, discount) {
    return (price - (price * discount / 100).toFixed(2))
}

function SingleProduct(props) {
    const {id} = useParams()
    useEffect(() => {
        props.getProduct(id)
    }, [])

    useEffect(() => {
        if (single_product.thumbnail) {
            setActiveImage(single_product.thumbnail)
        } else if (single_product.images && single_product.images.length > 0) {
            setActiveImage(single_product.images[0])
        }
    }, [props.single_product])

    const [activeImage, setActiveImage] = useState(undefined)

    const {single_product} = props

    return <div className={'single-product'}>
        <Navbar/>
        <div className="container">
            {single_product ?
                <div className="product-page">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="single-product-header">
                                <div className="single-product-title">
                                    {single_product.title ?
                                        <h1>{single_product.title}</h1>
                                        : ''}
                                </div>
                                <div className="single-product-rating">
                                    {single_product.rating ?
                                        <Stack spacing={1}>
                                            <Rating name="half-rating" value={parseFloat(single_product.rating)}
                                                    precision={0.5}
                                                    sx={customStyle} readOnly/>
                                        </Stack>
                                        : ''}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-3 single-product-images">
                                    {single_product.images ? single_product.images.map((item, index) => <div
                                        className={activeImage && activeImage === item ? 'active image' : 'image'} onClick={() => setActiveImage(item)} key={index}>
                                        <img src={item} alt={single_product.title + ' ' + index}/>
                                    </div>) : ''}
                                </div>
                                <div className="col-lg-9">
                                    <div className="single-product-image">
                                        {activeImage ?
                                            <img src={activeImage}
                                                 alt={single_product.title ? single_product.title : ''}/>
                                            : ''}
                                        {single_product.discountPercentage ? <span className={'discount'}>{single_product.discountPercentage} %</span> : ''}
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="col-lg-6">
                            <div className="single-product-price">
                                {single_product.price ?
                                    <h2>$ {TotalDiscount(single_product.price,
                                        single_product.discountPercentage)}</h2>
                                    : ''}
                            </div>
                            <div className="single-product-desc">
                                {single_product.description ?
                                    <p>{single_product.description}</p>
                                    : ''}
                            </div>
                            <div className="single-product-detail">
                                {single_product.category ?
                                <p><span>Category:</span> {single_product.category}</p>
                                    : ''}
                                {single_product.brand ?
                                <p><span>Brand:</span> {single_product.brand}</p>
                                    : ''}
                            </div>
                        </div>
                    </div>
                </div>
                : ''}
        </div>
    </div>

}

export default connect(({product: {single_product}}) => ({single_product}), {getProduct})(SingleProduct)