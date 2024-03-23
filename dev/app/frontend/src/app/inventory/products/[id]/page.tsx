// 商品在庫画面
'use client';
import { useEffect, useState } from "react";
import inventoryData from "./sample_inventory.json";
import productsData from "../sample_products.json";

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
}

type Inventory = {
    id: number;
    type: string;
    date: string;
    unit: number;
    quantity: number;
    price: number;
    inventory: number;
}

export default function Page() {
    const params = { id: 3 };

    const [product, setProduct] = useState<Product>({ id: 0, name: "", price: 0, description: "" });
    const [inventory, setInventory] = useState<Inventory[]>([]);


    useEffect(() => {
        const selectedProduct: Product = productsData.find(v => v.id == params.id) ?? {
            id: 0,
            name: "",
            price: 0,
            description: ""
        };
        setProduct(selectedProduct);
        setInventory(inventoryData);
    }, []);

    return (
        <>
            <h2>商品在庫</h2>
            <h3>在庫処理</h3>

            <form action="">
                <div>
                    <label htmlFor="">商品名</label>
                    <span>{product.name}</span>
                </div>
                <div>
                    <label htmlFor="">数量</label>
                    <input type="text" />
                </div>
                <button>商品を入れる</button>
                <button>商品を卸す</button>
            </form>

            <h3>在庫履歴</h3>
            <table>
                <thead>
                    <tr>
                        <th>処理種別</th>
                        <th>処理日時</th>
                        <th>単価</th>
                        <th>数量</th>
                        <th>価格</th>
                        <th>在庫数</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((i: Inventory) => (
                        <tr key={i.id}>
                            <td>{i.type}</td>
                            <td>{i.date}</td>
                            <td>{i.unit}</td>
                            <td>{i.quantity}</td>
                            <td>{i.price}</td>
                            <td>{i.inventory}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    )
}