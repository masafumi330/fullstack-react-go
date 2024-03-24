'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import productsData from "./sample_products.json";

type Product = {
    id: number | null;
    name: string;
    price: number;
    description: string;
};

export default function Page() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // 読み込みデータを保持
    const [products, setProducts] = useState<Product[]>(productsData);
    useEffect(() => {
        setProducts(productsData);
    }, []);

    // 新規作成
    const handleShowNewProductForm = () => {
        setId(null);
        reset({
            name: "",
            price: "0",
            description: ""
        });
    };
    const handleCancelNewProductForm = () => {
        setId(0);
    }
    const handleCreateNewProduct = (product: Product) => {
        setId(0);
    }

    // 更新
    const handleEditProduct = (id: number | null) => {
        const selectedProduct: Product = products.find((v) => v.id === id) as Product;
        setId(selectedProduct.id);
        reset({
            name: selectedProduct.name,
            price: selectedProduct.price,
            description: selectedProduct.description
        });
    };
    const handleCancelEditProduct = () => {
        setId(0);
    }
    const handleUpdateProduct = (product: Product) => {
        // Request Put to Backend
        setId(0);
    };

    // 削除
    const handleDeleteProduct = (id: number) => {
        // Request Delete to Backend
        setId(0);
    };

    const [id, setId] = useState<number | null>(0);
    // submit時のactionを分岐させる
    const [action, setAction] = useState<string>("");
    const onSubmit = (event: any): void => {
        const product: Product = {
            id: id,
            name: event.name,
            price: Number(event.price),
            description: event.description,
        };
        // actionによってHTTPメソッドと使用するパラメータを切り替える
        switch (action) {
            case "add":
                // Request Post to Backend
                handleCreateNewProduct(product);
            case "update":
                // Request Put to Backend
                if (product.id === null) {
                    return;
                }
                handleUpdateProduct(product);
            case "delete":
                // Request Delete to Backend
                if (product.id === null) {
                    return;
                }
                handleDeleteProduct(product.id);
            default:
                break;
        }
    };

    return (
        <>
            <h2>商品一覧</h2>
            <button type="button" onClick={handleShowNewProductForm}>商品を追加する</button>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        {id === null ? (
                            <tr>
                                <td></td>
                                <td>
                                    <input type="text" id="name" {...register("name", { required: true, maxLength: 100 })} />
                                    {errors.name && (<div>100文字以内の商品名を入力してください</div>)}
                                </td>
                                <td>
                                    <input type="number" id="price" {...register("price", { required: true, min: 1, max: 99999 })} />
                                    {errors.price && (<div>1から99999までの価格を入力してください</div>)}
                                </td>
                                <td>
                                    <input type="text" id="description" {...register("description")} />
                                </td>
                                <td></td>
                                <td>
                                    <button type="button" onClick={() => handleCancelNewProductForm()}>キャンセル</button>
                                    <button type="submit" onClick={() => setAction("add")}>登録</button>
                                </td>
                            </tr>
                        ) : ""}
                        {products.map((product: any) =>
                            id === product.id ? (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>
                                        <input type="text" id="name" {...register("name", { required: true, maxLength: 100 })} />
                                        {errors.name && (<div>100文字以内の商品名を入力してください</div>)}
                                    </td>
                                    <td>
                                        <input type="number" id="price" {...register("price", { required: true, min: 1, max: 99999 })} />
                                        {errors.price && (<div>1から99999までの価格を入力してください</div>)}
                                    </td>
                                    <td>
                                        <input type="text" id="description" {...register("description")} />
                                    </td>
                                    <td></td>
                                    <td>
                                        <button type="button" onClick={() => handleCancelEditProduct()}>キャンセル</button>
                                        <button type="submit" onClick={() => setAction("update")}>更新</button>
                                        <button type="submit" onClick={() => setAction("delete")}>削除</button>
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
                        )}
                    </tbody>
                </table>
            </form>
        </>
    );
}
