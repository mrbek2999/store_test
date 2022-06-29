import {useEffect, useRef, useState} from "react";
import {getProducts} from "./store/Products";
import {connect} from "react-redux";
import './App.css'
import ProductBlock from "./blocks/product-block";
import Navbar from "./blocks/navbar";
import {getCategories} from "./store/category";

function App(props) {

    const searchRef = useRef(null)
    const [filteringData, setFilteringData] = useState('')
    const [pageNum, setPageNum] = useState(0)
    const [checkCategories, setCheckCategories] = useState([])


    useEffect(() => {
        props.getProducts()
        props.getCategories()
    }, [])

    const {count} = props.product
    let page = []

    useEffect(() => {
        if (filteringData === '') {
            props.getProducts()
        }
        setPageNum(0)
    }, [filteringData])


    function CountPage(count) {
        let num = 0
        for (let i = 0; i < count; i += 10) {
            page.push(num)
            num++
        }
    }

    function changePage(page_num) {
        if (page_num < 0 || page_num >= count / 10) {
        } else {
            setPageNum(page_num)
        }
    }

    function selectThis(event) {
        const myCheckbox = document.getElementsByName("category");
        if (event.target.checked === true) {
            Array.prototype.forEach.call(myCheckbox, function (el) {
                el.checked = false;
            });
            event.target.checked = true;
        }
    }

    CountPage(count)

    function Filtering(event) {
        const search_query = searchRef.current.value
        let checkedCategories = checkCategories


        // if (event.target.name === 'category') {
        //     if (event.target.checked) {
        //         setCheckCategories([...checkCategories, event.target.value])
        //         checkedCategories.push(event.target.value)
        //     } else if (event.target.checked === false) {
        //         checkedCategories.splice(checkedCategories.indexOf(event.target.value), 1)
        //         setCheckCategories([...checkedCategories])
        //     }
        // }


        if (event.target.name === 'category') {
            if (event.target.checked) {
                // setCheckCategories([...checkCategories, event.target.value])
                setCheckCategories([event.target.value])
                checkedCategories = [event.target.value]
            } else if (event.target.checked === false) {
                checkedCategories = []
                setCheckCategories([])
            }
        }


        let str = ''
        if (search_query !== '' && str === '') {
            str = "name=" + search_query
        }
        if (checkedCategories.length) {
            for (let i = 0; i < checkedCategories.length; i++) {
                if (str !== '') {
                    str = str + '&category=' + checkedCategories[i]
                } else {
                    str = 'category=' + checkedCategories[i]
                }
            }
        }
        setFilteringData(str)
    }

    const {categories} = props.category

    return <div className={'page'}>
        <Navbar/>
        <div className={'container'}>
            <h1 className={'page-title'}>Products</h1>
            <div className="row">
                <div className="col-lg-3">
                    <div className="filter-product">
                        <h2 className={'mb-3'}>Filter</h2>
                        <form onChange={Filtering}>
                            <div className="input-group mb-3">
                                <input ref={searchRef} type="text" className="form-control" placeholder="Search..."
                                       aria-label="Search"
                                       aria-describedby="basic-addon1" name={'search'}/>
                            </div>
                            {categories ? categories.map((item, index) => <div key={index}
                                                                               className="category-list form-check">
                                <input className="form-check-input" name={'category'} type="checkbox"
                                       value={item} id={'category' + index} onChange={(event) => selectThis(event)}/>
                                <label className="form-check-label" htmlFor={'category' + index}>
                                    {item}
                                </label>
                            </div>) : ''}
                        </form>
                    </div>
                </div>
                <div className="col-lg-9">
                    <ProductBlock filteringData={filteringData} pageNum={pageNum}/>
                </div>
            </div>
            {page.length !== 1 ?
                <div className="pagination">
                    <span
                        className={pageNum === page[0] ? 'prev-pagination pgn-btn disabled' : 'prev-pagination pgn-btn'}
                        onClick={() => changePage(pageNum - 1)}/>
                    {page.length > 0 ? page.map((item, index) =>
                        <span onClick={() => changePage(item)} key={index}>
                    <span className={pageNum === parseInt(item) ? 'active' : ''}>{item + 1}</span>
                </span>) : ''}
                    <span
                        className={pageNum === page.length - 1 ? 'next-pagination pgn-btn disabled' : 'next-pagination pgn-btn'}
                        onClick={() => changePage(pageNum + 1)}/>
                </div> : ''}
        </div>
    </div>
}

export default connect((state => state), {getProducts, getCategories})(App)