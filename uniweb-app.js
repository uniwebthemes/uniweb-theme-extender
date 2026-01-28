(() => {
  /*document.getElementById("open-picker").addEventListener("click", async () => {
  const selected = await shopify.resourcePicker({ type: "product" });
  console.log(selected);
});*/
    
  document
    .getElementById("product--picker")
    .addEventListener("click", async () => {
      /*const res = await fetch("shopify:admin/api/2025-10/graphql.json", {
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
      document.getElementById("product-title").innerText = data.product.title;*/

      // Metafield
      const metafieldRes = await fetch("shopify:admin/api/2025-10/graphql.json", {
      method: "POST",
      body: JSON.stringify({
        query: `MetafieldDefinitions($ownerType: MetafieldOwnerType!, $first: Int) {
        metafieldDefinitions(key: \"insaccesstoken\", ownerType: $ownerType, first: $first) {
          nodes {
            id
            name
            namespace
            key
            type {
              name
            }
          }
        }
      }
    `,
        variables: { ownerType: "SHOP", first: 1 },
      }),
    });
    const { data } = await metafieldRes.json();
    document.getElementById("product-title").innerText = data;
    });

  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
})();
