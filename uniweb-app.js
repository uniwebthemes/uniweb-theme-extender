(() => {
  /*document.getElementById("open-picker").addEventListener("click", async () => {
  const selected = await shopify.resourcePicker({ type: "product" });
  console.log(selected);
});*/
  const currentURL = window.location.href;
  //document.getElementById("config--URL").innerText = currentURL;

  const params = new URLSearchParams(window.location.search);
  const shopifyKey = params.get("shopify_key");
  document
    .querySelector('meta[name="shopify-api-key"]')
    .setAttribute("content", shopifyKey);

  // Update urls on page load
  function updateURLs() {
    const _allurls = document.querySelectorAll(".nav-button");
    _allurls.forEach((doc) => {
      doc.addEventListener("click", async (element) => {
        const _url = doc.getAttribute("data-url");
        const _urlhref = doc.getAttribute("href");
        let _newurl = _url + "?v=" + Date.now();
        let _newurlhref = _url + "?v=" + Date.now();
        doc.setAttribute("data-url", _newurl);
        doc.setAttribute("href", _newurlhref);
      });
    });
  }
  // Hide App loader and show app content
  function apploaderAnimation() {
    const appLoader = document.getElementById("app-loader");
    const appContent = document.getElementById("app-content");
    const appContents = document.querySelectorAll(".app-content");
    console.log(appContents);
    if (appLoader && appContents.length > 0) {
      appLoader.classList.add("hidden");
      //appContent.classList.remove("hidden");
      appContents.forEach((content) => {
        content.classList.remove("hidden");
      });
    }
  }

  // Enable buttons in dashboard
  function updateDashboardButtons() {
    const dashboardButtons = document.querySelectorAll(".nav-button");
    dashboardButtons.forEach((button) => {
      button.classList.remove("pointer-events-none");
    });
  }

  // Dashboard buttons click event to open urls in tab
  function dashboardButtonsClick() {
    /*const documentations = document.querySelectorAll(".nav-button");
    documentations.forEach((doc) => {
      doc.addEventListener("click", async (element) => {
        const _url = doc.getAttribute("data-url");
        window.open(_url, "_self");
      });
    });*/
  }

  /**** Update urls ****/
  document.addEventListener("DOMContentLoaded", (event) => {
    // Update urls on page load
    updateURLs();
    // Hide App loader and show app content
    apploaderAnimation();
    // Enable buttons in dashboard
    updateDashboardButtons();

    //dashboardButtonsClick();
  });

  /* document.getElementById("get--config-host").addEventListener("click", async () => {
    const configDetailsShop = await shopify.config.host;
    document.getElementById("config--host").innerText = configDetailsShop;
  });*/
  /*document.getElementById("get--config-shop").addEventListener("click", async () => {
    const configDetailsShop = await shopify.config.shop;
    document.getElementById("config--shop").innerText = configDetailsShop;
  });*/

  const _meta = document.querySelector('meta[name="shopify-api-key"]');
  if (_meta) {
    _meta.setAttribute("content", shopifyKey);
  }
  /*
  document
    .getElementById("product--picker")
    .addEventListener("click", async () => {
      const res = await fetch("shopify:admin/api/2025-10/graphql.json", {
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
*/
  /*  document
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
    });*/

  /*document
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
    });*/

  /**** Chart.js ****/
  /*const ctx = document.getElementById("myChart");

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
  });*/
})();
