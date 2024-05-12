import React, { useCallback, useState, useEffect, useRef } from 'react'

import Helmet from '../components/Helmet'
import CheckBox from '../components/CheckBox'
import productData from '../assets/data-loaded/products'
import category from '../assets/data-loaded/category'
import productType from '../assets/data-loaded/productType'
import Button from '../components/Button'
import InfinityList from '../components/InfinityList'
import SearchBar from '../components/SearchBar'

const SearchProduct = () => {
    const initFilter = {
        category: [],
        productType: [],
    }

    const productList = productData.getAllProducts()

    const [products, setProducts] = useState(productList)

    const [filter, setFilter] = useState(initFilter)

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch(type) {
                case "CATEGORY":
                    setFilter({...filter, category: [...filter.category, item.categorySlug]})
                    break
                case "PRODUCT TYPE":
                    setFilter({...filter, productType: [...filter.productType, item.productType]})
                    break
                default:
            }
        } else {
            switch(type) {
                case "GENRE":
                    const newCategory = filter.category.filter(e => e !== item.categorySlug)
                    setFilter({...filter, category: newCategory})
                    break
                case "PRODUCT TYPE":
                    const newProductType = filter.productType.filter(e => e !== item.productType)
                    setFilter({...filter, productType: newProductType})
                    break
               
                default:
            }
        }
    }

    const clearFilter = () => setFilter(initFilter)

    const updateProducts = useCallback(
        () => {
            let temp = productList

            if (filter.category.length > 0) {
                temp = temp.filter(e => filter.category.includes(e.categorySlug))
            }

            if (filter.productType.length > 0) {
                temp = temp.filter(e => {
                    const check = e.productType.find(productType => filter.productType.includes(productType))
                    return check !== undefined
                })
            }
            setProducts(temp)
        },
        [filter, productList],
    )

    useEffect(() => {
        updateProducts()
    }, [updateProducts])

    const filterRef = useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active')

    return (
        <Helmet title="Search Product">
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Product Type
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                productType.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("productType", input.checked, item)}
                                            checked={filter.productType.includes(item.productType)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Product Category
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                category.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("GENRE", input.checked, item)}
                                            checked={filter.category.includes(item.categorySlug)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size="sm" onClick={clearFilter}>CLEAR FILTER</Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={() => showHideFilter()}>Filter</Button>
                </div>
                
                <div className="catalog__content">
                    <SearchBar placeholder="Search for product" data={products} />
                    <div className="bookresults">
                        <InfinityList
                            data={products}
                        />
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default SearchProduct