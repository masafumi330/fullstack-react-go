'use client';

import Link from "next/link";
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
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>商品名</th>
                        <th>価格</th>
                        <th>説明</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: any) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>
                                <Link href={`/inventory/products/${product.id}`}>在庫処理</Link>
                            </td>
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