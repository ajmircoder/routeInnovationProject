import React, { useEffect, useState } from 'react';

export default function Product() {
    const [products, setProducts] = useState(null);
    const [searchString, setSearchString] = useState('');
    const [isProduct, setIsProduct] = useState(false);
    const [cart, setCart] = useState([]);
    const [defultOrder, setDefultOrder] = useState([]);
    const allProduct = () => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setDefultOrder(data.products.map(p => p.id));
            });
    }
    useEffect(() => {
        allProduct();
    }, []);
    const handleCart = (product, add) => {
        if (add) setCart([...cart, product]);
        else {
            setCart((pvr) => pvr.filter((p) => p.id !== product.id));
        }
    }
    return (<>
        <div className=''>
            <div className='md:flex bg-red-400 md:justify-between py-1 xl:px-24 '>
                <div className='block my-auto py-1 md:w-1/2'>
                    <input type="text" className='rounded-lg py-1 px-1 w-full md:w-4/6' placeholder='Search' onChange={(e) => {
                        setSearchString(e.target.value);
                        setIsProduct(true);
                    }} />
                </div>
                <div className='flex mx-3 py-1 justify-end'>
                    <button className='flex justify-center items-center p-2 bg-blue-400 rounded-full active:bg-blue-300'>
                        ${cart.reduce((sum, cur) => sum + cur.price, 0)}
                        <img width="20px" className='mx-2' src="https://d3sxshmncs10te.cloudfront.net/icon/free/svg/3112098.svg?token=eyJhbGciOiJoczI1NiIsImtpZCI6ImRlZmF1bHQifQ__.eyJpc3MiOiJkM3N4c2htbmNzMTB0ZS5jbG91ZGZyb250Lm5ldCIsImV4cCI6MTcwODIzOTUyMywicSI6bnVsbCwiaWF0IjoxNzA3OTgwMzIzfQ__.fde1a610aebf72ca79cc0bc9447609b9a4e8e5daaa31ba60a243d299debc67fb" alt="" />
                    </button>
                    <select onChange={(e) => {
                        if (e.target.value == "Low_to_high") {
                            setProducts((pvr) => {
                                const sortedProducts = pvr.sort((a, b) => a.price - b.price);
                                return [...sortedProducts];
                            })
                        } else if (e.target.value == "Hight_to_Low") {
                            setProducts((pvr) => {
                                const sortedProducts = pvr.sort((a, b) => b.price - a.price);
                                return [...sortedProducts];
                            })
                        } else { 
                            setProducts((pvr) => pvr.toSorted((a, b) => defultOrder.indexOf(a.id) - defultOrder.indexOf(b.id)))
                        }
                    }} className='bg-red-400' name="" id="">
                        <option value="Defult">Defult</option>
                        <option value="Low_to_high">Low To High</option>
                        <option value="Hight_to_Low">High To Low</option>
                    </select>
                </div>
            </div>
            <div className='xl:px-24 md:pt-2 bg-slate-200 w-full'>
                <div className='border border-teal-600 md:grid md:grid-cols-2 xl:grid-cols-3 text-center'>
                    {products ? products
                        .filter(product => isProduct ? searchString.toLowerCase() === product.title.substring(0, searchString.length).toLowerCase() : true)
                        .map((product, i) => (
                            <div key={i} className="  mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                                <img className="h-48 w-full object-cover object-center" src={product.thumbnail} alt="Product Image" />
                                <div className="p-4">
                                    <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">{product.title ? product.title : ""}</h2>
                                    <p className="mb-2 text-base dark:text-gray-300 text-gray-700">{product.description ? product.description : ""}</p>
                                    <div className="">
                                        <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">{product.price ? `Price: $${product.price}` : ""}</p>
                                        <p className="text-base  font-medium text-gray-500 dark:text-gray-300">{product.rating ? `Rating: ${product.rating}` : ""}</p>
                                        <button className="my-1 ml-auto text-base font-medium text-green-500 bg-black px-2 py-1 rounded-full"
                                            onClick={(e) => {
                                                handleCart(product, !product.isAdded)
                                                setProducts((pvr) =>
                                                    pvr.map((p, index) => {
                                                        const newObject = Object.assign({}, p);
                                                        index == i ? newObject.isAdded = !newObject.isAdded : '';
                                                        return newObject;
                                                    })
                                                )
                                            }}>{product.isAdded ? "Added" : "Add to Cart"}</button>
                                    </div>
                                </div>
                            </div>
                        ))
                        : ""}
                </div>
            </div>

        </div>
    </>
    )
}



