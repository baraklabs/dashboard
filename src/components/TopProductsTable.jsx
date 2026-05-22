export default function TopProductsTable({ products }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Units Sold</th>
          <th>Revenue</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.name}>
            <td>{product.name}</td>
            <td>{product.units.toLocaleString()}</td>
            <td>${product.revenue.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
