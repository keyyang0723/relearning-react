export function buildOrderXML(order) {
    return `
  <order>
    <customer>
      <name>${order.name}</name>
      <email>${order.email}</email>
      <address>${order.address}</address>
    </customer>
    <items>
      ${order.items
        .map(
          (item) => `
        <item>
          <id>${item.id}</id>
          <name>${item.name}</name>
          <price>${item.price}</price>
          <quantity>${item.quantity}</quantity>
        </item>`
        )
        .join("")}
    </items>
    <total>${order.total}</total>
  </order>
    `.trim();
  }
  