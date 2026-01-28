(() => {
  /*document.getElementById("open-picker").addEventListener("click", async () => {
  const selected = await shopify.resourcePicker({ type: "product" });
  console.log(selected);
});*/
  async function checkInstagramAccessTokenMetafield() {
    const res = await fetch("shopify:admin/api/2026-01/graphql.json", {
      method: "POST",
      body: JSON.stringify({
        query: `
      query metafieldDefinition($id: ID!) {
        product(id: $id) {
          id
        }
      }
    `,
        variables: { id: "gid://shopify/Product/8966805422326" },
      }),
    });
    const dataProduct = "";
    const { data } = await res.json();
    return data.product.title;
  }
  document
    .getElementById("product--picker")
    .addEventListener("click", async () => {
      const res = await fetch("shopify:admin/api/2026-01/graphql.json", {
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
