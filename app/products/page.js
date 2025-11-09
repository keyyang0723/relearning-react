export default function ProductsPage() {
    const products = [
        { id: 1, name: "Tシャツ", price: 2000},
        { id: 2, name: "パーカー", price: 5000},
        { id: 3, name: "キャップ", price: 1500}
    ]

    return (
        <div style={{ padding : "20px" }}>
            <h1>商品一覧</h1>
            <ul>
                {
                    products.map((item) => (
                        <li key={item.id}>
                            {item.name} - ¥{item.price}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
