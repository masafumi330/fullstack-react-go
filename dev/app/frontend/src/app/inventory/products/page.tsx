'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import productsData from "./sample_products.json";

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
}

type InputProduct = {
    id: string;
    name: string;
    price: string;
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
        const selectedProduct: Product = products.find((v) => v.id === id) as Product;
        setInputProduct({
            id: id.toString(),
            name: selectedProduct.name,
            price: String(selectedProduct.price),
            description: selectedProduct.description

        });
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

    // 登録データを保持
    const [inputProduct, setInputProduct] = useState<InputProduct>({
        id: "",
        name: "",
        price: "",
        description: ""
    });
    // 登録データの値を入力値で更新
    const handleInputProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newInputProduct = { ...inputProduct, [event.target.name]: event.target.value };
        setInputProduct(newInputProduct);
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
                                <input type="text" onChange={handleInputProduct} />
                            </td>
                            <td>
                                <input type="number" onChange={handleInputProduct} />
                            </td>
                            <td>
                                <input type="text" onChange={handleInputProduct} />
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
                                <td><input type="text" value={inputProduct.name} name="name" onChange={handleInputProduct} /></td>
                                <td><input type="number" value={inputProduct.price} name="price" onChange={handleInputProduct} /></td>
                                <td><input type="text" value={inputProduct.description} name="description" onChange={handleInputProduct} /></td>
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