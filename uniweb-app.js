document.getElementById("open-picker").addEventListener("click", async () => {
  const selected = await shopify.resourcePicker({ type: "product" });
  console.log(selected);
});
