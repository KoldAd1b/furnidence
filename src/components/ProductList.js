import React from "react";
import { useSelector } from "react-redux";
import { Loading } from ".";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { modifiedProducts, view, allProducts } = useSelector(
    (state) => state.filters
  );

  if (!modifiedProducts.length > 0 && !allProducts.length > 0)
    return <Loading />;

  if (modifiedProducts.length < 1)
    return (
      <h5 style={{ textTransform: "uppercase" }}>
        {" "}
        Sorry, no products matched your preferences
      </h5>
    );

  if (view === "list") return <ListView products={modifiedProducts} />;
  return <GridView products={modifiedProducts}>product list</GridView>;
};

export default ProductList;
