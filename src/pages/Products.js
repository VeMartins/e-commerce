import React from "react";
import { ProductsList } from "../components";
import { PageHeaderImage } from "../components";
import background from "../srcImages/almofada-folhas.jpg";

const Products = () => {
  return (
    <main>
      <PageHeaderImage title="Products" src={background} />
      <section>
        <ProductsList />
      </section>
    </main>
  );
};

export default Products;
