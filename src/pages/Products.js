import React from "react";
import { Link } from "react-router-dom";
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
      <PageHeaderImage
        title="Products"
        src={background}
        link={<Link to="/">Home / </Link>}
      />
      <section>
        {error && (
          <ErrorModal
            error={error}
            onClear={clearError}
            footer
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
