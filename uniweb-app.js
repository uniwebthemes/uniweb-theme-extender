document.getElementById("open-picker").addEventListener("click", async () => {
  const selected = await shopify.resourcePicker({ type: "product" });
  console.log(selected);
});

document
  .getElementById("product--picker")
  .addEventListener("click", async () => {
    const res = await fetch("shopify:admin/api/2025-04/graphql.json", {
      method: "POST",
      body: JSON.stringify({
        query: `
      query GetProduct($id: ID!) {
        product(id: $id) {
          title
        }
      }
    `,
        variables: { id: "gid://shopify/Product/8966805422326" },
      }),
    });

    const { data } = await res.json();
    document.getElementById("product-title").innerText = data.product.title;
  });
