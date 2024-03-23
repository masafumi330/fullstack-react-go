// 商品在庫画面
import inventoryData from "./sample.json";

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
    return (
        <>
            <h2>商品在庫</h2>
            <h3>在庫処理</h3>

            <form action="">
                <div>
                    <label htmlFor="">商品名</label>
                    <span>コットン100%</span>
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
                    {inventoryData.map((inventory: Inventory) => (
                        <tr key={inventory.id}>
                            <td>{inventory.type}</td>
                            <td>{inventory.date}</td>
                            <td>{inventory.unit}</td>
                            <td>{inventory.quantity}</td>
                            <td>{inventory.price}</td>
                            <td>{inventory.inventory}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    )
}