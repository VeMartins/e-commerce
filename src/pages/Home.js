import React from "react";
import { ProductsList } from "../components";
import { PageHeader } from "../components";

const Home = () => {
  return (
    <main>
      <PageHeader title="Home" />
      <section>
        <ProductsList />
      </section>
    </main>
  );
};

export default Home;
