'use client';

import { useEffect, useState } from "react";
import productsData from "./sample.json";

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
}

export default function Page() {
    const [products, setProducts] = useState<Product[]>(productsData);
    useEffect(() => {
        setProducts(productsData);
    }, []);

    return (
        <>
            <h2>商品一覧</h2>
            <table>
                <tbody>
                    {products.map((product: any) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>
                                <button>更新/削除</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    )
}