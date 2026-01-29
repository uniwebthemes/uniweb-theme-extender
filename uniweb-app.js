(() => {
  /*document.getElementById("open-picker").addEventListener("click", async () => {
  const selected = await shopify.resourcePicker({ type: "product" });
  console.log(selected);
});*/
document.getElementById("get--config").addEventListener("click", async () => {
  const configDetails = await shopify.config.host;
   document.getElementById("config--content").innerText = configDetails;
});
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
      const metafieldRes = await fetch(
        "shopify:admin/api/2025-10/graphql.json",
        {
          method: "POST",
          body: JSON.stringify({
            query: `
        query MetafieldDefinitions($ownerType: MetafieldOwnerType!, $first: Int) {
        metafieldDefinitions(key: "insaccesstoken", ownerType: $ownerType, first: $first) {
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
        },
      );
      const { data } = await metafieldRes.json();
      document.getElementById("product-title").innerText =
        data.metafieldDefinitions.nodes[0].name;
    });

  document
    .getElementById("metafield--creator")
    .addEventListener("click", async () => {
      // Metafield
      const metafieldRes = await fetch(
        "shopify:admin/api/2025-10/graphql.json",
        {
          method: "POST",
          body: JSON.stringify({
            query: `
              mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
                metafieldDefinitionCreate(definition: $definition) {
                  createdDefinition {
                    id
                    namespace
                    access {
                      admin
                    }
                  }
                  userErrors {
                    field
                    message
                    code
                  }
                }
              }  
              `,
            variables: {
              definition: {
                name: "Instagram Access Token",
                namespace: "$app:uniwebtesting",
                key: "uniweb_insaccesstoken_testing",
                type: "single_line_text_field",
                description: "The instagram Access Token",
                ownerType: "SHOP",
                access: {
                  admin: "MERCHANT_READ",
                },
              },
            },
          }),
        },
      );
      const { data } = await metafieldRes.json();
      document.getElementById("metafield-content").innerText =
        data.metafieldDefinitionCreate.createdDefinition.id;
    });

  document
    .getElementById("metafield--get-button")
    .addEventListener("click", async () => {
      // Metafield
      const metafieldRes = await fetch(
        "shopify:admin/api/2025-10/graphql.json",
        {
          method: "POST",
          body: JSON.stringify({
            query: `
              query MetafieldDefinitions($ownerType: MetafieldOwnerType!, $first: Int) {
                metafieldDefinitions(namespace:"app--315130609665--uniwebtesting", key: "uniweb_insaccesstoken_testing", ownerType: $ownerType, first: $first) {
                  nodes {
                    id
                    name
                    namespace
                    key
                    type {
                      name
                    }
                    access {
                      admin
                    }
                  }
                }
              } 
              `,
            variables: {
              ownerType: "SHOP",
              first: 1,
            },
          }),
        },
      );
      const { data } = await metafieldRes.json();
      document.getElementById("metafield-get").innerText =
        data.metafieldDefinitions.nodes[0].id;
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
