import React, { useEffect, useState } from 'react';

export default function Product() {
    const [products, setProducts] = useState(null);
    const [nameProduct, setNameProduct] = useState();
    const [isProduct, setIsProduct] = useState(false);
    const allProduct = () => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            });
    }
    useEffect(() => {
        allProduct()
    }, [])
    return (<>
        <div className='md:flex bg-red-400 md:justify-between py-1'>
            <div className='block mx-2 my-auto py-1 md:w-1/2'>
                <input type="text" className='rounded-lg py-1 px-[1px] w-4/5 md:w-4/6' placeholder='Search' onChange={(e) => setNameProduct(e.target.value)} />
                <button className='rounded-lg text-md mx-1 active:bg-blue-300 bg-blue-400 px-2 py-1' onClick={() => nameProduct ? setIsProduct(true) : ""}>Search</button>
            </div>
            <div className='flex mx-3 py-1 justify-end'>
                <select className='bg-red-400' name="" id="">
                    <option value="Low_to_high">Low To High</option>
                    <option value="Hight_to_Low">High To Low</option>
                </select>
            </div>
        </div>
        <div className='xl:px-20 md:pt-2 bg-slate-200'>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 text-center '>
                {products ? products.products.map((product, i) => (
                    <div className='grid py-3' key={product.title}>
                        <img className=' mx-auto' width="300px" height="300px" src={product.thumbnail ? product.thumbnail : ""} />
                        {isProduct ? nameProduct.toLowerCase() == product.title.substring(0, nameProduct.length).toLowerCase() ? <div className='mt-2 block md:mt-auto'>
                            <p>{product.title ? product.title : ""}</p>
                            <p>{product.description ? product.description : ""}</p>
                            <p>{product.price ? `$${product.price}` : ""}</p>
                            <p>{product.rating ? product.rating : ""}</p>
                            <button id={i} className='block ml-auto px-2 py-1 bg-red-400 active:bg-red-300 rounded-lg'>Add Cart</button>
                        </div> : "" : <div className='mt-2 block md:mt-auto'>
                            <p>{product.title ? product.title : ""}</p>
                            <p>{product.description ? product.description : ""}</p>
                            <p>{product.price ? `$${product.price}` : ""}</p>
                            <p>{product.rating ? product.rating : ""}</p>
                            <button id={i} className='block ml-auto px-2 py-1 bg-red-400 active:bg-red-300 rounded-lg'>Add Cart</button>
                        </div>}
                    </div>
                )) : ""}
            </div>
        </div>

    </>
    )
}

