import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import axios from 'axios';

const Shop = () => {

    const [products,setProducts] = useState([]);

    const fetchProducts = async() => {
        const result = await axios.get('http://localhost:3000/product');
        console.log(result.data);
        setProducts(result.data);
    }
    useEffect(()=> {
        fetchProducts();
    },[])

    return(<>
    <div className="row">
        {products.map((product) => {
            return <ProductCard key = {product.id} product={product}/>
        })}
    </div>
    </>)
}
export default Shop;