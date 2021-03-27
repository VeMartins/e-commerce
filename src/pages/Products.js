import React from "react";
import { ProductsList } from "../components";
import { PageHeaderImage } from "../components";
import { Loading, ErrorModal } from "../components";
import { useGlobalContext } from "../context/products-context";
import background from "../srcImages/almofada-folhas.jpg";

const Products = () => {
  const { loading, error, clearError } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  return (
    <main>
      <PageHeaderImage title="Products" src={background} />
      <section>
        {error && (
          <ErrorModal
            error={error}
            onClear={clearError}
            header="Failed to load products, please try again later."
            linkText={"Okay"}
          />
        )}
        <ProductsList />
      </section>
    </main>
  );
};

export default Products;
