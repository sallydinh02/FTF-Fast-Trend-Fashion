import React, { useCallback, useState, useEffect, useRef } from 'react'

import Helmet from '../components/Helmet'
import CheckBox from '../components/CheckBox'
import productData from '../assets/data-loaded/products'
import genre from '../assets/data-loaded/genre'
import booktypes from '../assets/data-loaded/booktype'
// import size from '../assets/data-loaded/product-size'
import Button from '../components/Button'
import InfinityList from '../components/InfinityList'
import SearchBar from '../components/SearchBar'

const SearchProduct = () => {
    // useEffect(() => {
    //     // change background color with a random color
    //     const bgcolor = "#DDFFF9"
    //     document.body.style.background = bgcolor;
    //   });
    const initFilter = {
        genre: [],
        booktype: [],
        size: []
    }

    const productList = productData.getAllProducts()

    const [products, setProducts] = useState(productList)

    const [filter, setFilter] = useState(initFilter)

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch(type) {
                case "genre":
                    setFilter({...filter, genre: [...filter.genre, item.genreSlug]})
                    break
                case "BOOK TYPE":
                    setFilter({...filter, booktype: [...filter.booktype, item.booktype]})
                    break
                default:
            }
        } else {
            switch(type) {
                case "GENRE":
                    const newGenre = filter.genre.filter(e => e !== item.genreSlug)
                    setFilter({...filter, genre: newGenre})
                    break
                case "BOOK TYPE":
                    const newBookType = filter.booktype.filter(e => e !== item.booktype)
                    setFilter({...filter, booktype: newBookType})
                    break
               
                default:
            }
        }
    }

    const clearFilter = () => setFilter(initFilter)

    const updateProducts = useCallback(
        () => {
            let temp = productList

            if (filter.genre.length > 0) {
                temp = temp.filter(e => filter.genre.includes(e.genreSlug))
            }

            if (filter.booktype.length > 0) {
                temp = temp.filter(e => {
                    const check = e.booktypes.find(booktype => filter.booktype.includes(booktype))
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
                            Book format
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                booktypes.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("booktype", input.checked, item)}
                                            checked={filter.booktype.includes(item.booktype)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Genre
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                genre.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("GENRE", input.checked, item)}
                                            checked={filter.genre.includes(item.genreSlug)}
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