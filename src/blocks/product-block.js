import {connect} from "react-redux";
import {getProducts, getFilteringProducts} from "../store/Products";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function ProductBlock(props) {

    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(10)

    const pageoffset = 'offset='+offset+'&limit='+limit

    useEffect(() => {
        props.getProducts(pageoffset)
    }, [])

    useEffect(() => {
        props.getProducts(pageoffset)
        window.scrollTo(0, 0)
    }, [offset])

    useEffect(()=>{
        setOffset(props.pageNum*10)
        setLimit(props.pageNum*10+10)
    }, [props.pageNum])

    useEffect(() => {
        if (props.filteringData !== '') {
            props.getFilteringProducts(props.filteringData)
        }
    }, [props.filteringData])

    const {products, filteringProducts} = props.product

    return <div className={'row'}>
        {products && props.filteringData === '' ? products.map((item, index) => <div key={index} className="col-lg-4">
            <div className="product-item">
                <div className="product-image">
                    <img src={item.thumbnail} alt={item.title}/>
                </div>
                <div className="product-title">
                    <Link to={'/product/' + item.id}>
                        <h3>{item.title}</h3>
                    </Link>
                    <p>{item.description}</p>
                </div>
            </div>
        </div>) : filteringProducts && props.filteringData !== '' ?
            filteringProducts.map((item, index) => <div key={index} className="col-lg-4">
                <div className="product-item">
                    <div className="product-image">
                        <img src={item.thumbnail} alt={item.title}/>
                    </div>
                    <div className="product-title">
                        <Link to={'/product/' + item.id}>
                            <h3>{item.title}</h3>
                        </Link>
                        <p>{item.description}</p>
                    </div>
                </div>
            </div>) :''}
            </div>
        }
        export default connect((state=>state), {getProducts, getFilteringProducts})(ProductBlock)