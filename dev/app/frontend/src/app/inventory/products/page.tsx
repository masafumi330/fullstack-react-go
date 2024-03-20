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

    const [showNewProductForm, setShowNewProductForm] = useState(false);

    const handleShowNewProductForm = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setShowNewProductForm(true);
    };
    const handleCancelNewProductForm = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setShowNewProductForm(false);
    }
    const handleCreateNewProduct = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        // Request Post to Backent
        setShowNewProductForm(false);
    }

    const [editingProduct, setEditingProduct] = useState(0);
    const handleEditProduct: any = (id: number) => {
        setShowNewProductForm(false);
        setEditingProduct(id);
    };
    const handleCancelEditProduct: any = (id: number) => {
        setEditingProduct(0);
    }
    const handleUpdateProduct: any = (id: number) => {
        // Request Put to Backend
        setEditingProduct(0);
    };
    const handleDeleteProduct: any = (id: number) => {
        // Request Delete to Backend
        setEditingProduct(0);
    };

    return (
        <>
            <h2>商品一覧</h2>
            <button onClick={handleShowNewProductForm}>商品を追加する</button>
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
                    {showNewProductForm ? (
                        <tr>
                            <td></td>
                            <td>
                                <input type="text" />
                            </td>
                            <td>
                                <input type="number" />
                            </td>
                            <td>
                                <input type="text" />
                            </td>
                            <td></td>
                            <td>
                                <button onClick={handleCancelNewProductForm}>キャンセル</button>
                                <button onClick={handleCreateNewProduct}>登録</button>
                            </td>
                        </tr>
                    ) : ""}
                    {products.map((product: any) => (
                        editingProduct === product.id ? (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td><input type="text" defaultValue={product.name} /></td>
                                <td><input type="number" defaultValue={product.price} /></td>
                                <td><input type="text" defaultValue={product.description} /></td>
                                <td></td>
                                <td>
                                    <button onClick={() => handleCancelEditProduct(product.id)}>キャンセル</button>
                                    <button onClick={() => handleUpdateProduct(product.id)}>更新</button>
                                    <button onClick={() => handleDeleteProduct(product.id)}>削除</button>
                                </td>
                            </tr>
                        ) : (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                                <td>
                                    <Link href={`/inventory/products/${product.id}`}>在庫処理</Link>
                                </td>
                                <td>
                                    <button onClick={() => handleEditProduct(product.id)}>更新/削除</button>
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        </>

    )
}