import React from "react";

const About = () => {
  return (
    <section className="section-about">
      <h1>Botânica ArteLab</h1>
      <div className="about-container">
        <div className="eng-container">
          <img
            src="./images/Botanica.jpg"
            alt="card and leaf manual pressing "
            className="aboutPhoto"
          />
          <div className="about-info">
            <h2>About Us </h2>
            <p>
              This project was born in 2017 from a strong desire and impulse to
              eternalize the ephemeral beauty of nature and register the beauty
              of life and its cycles in different ways. We want to preserve the
              nature that surrounds us, alive and beautiful as it is. Therefore,
              the need to create products that offer ecological and sustainable
              solutions for our daily lives and for the planet emerged.
            </p>
            <h3>How we do it</h3>
            <p>
              We work with nature through manual pressing and natural dyes using
              traditional techniques. In an attempt to increase the useful life
              of a material, we also resort to the recycling of textiles and
              other materials/waste, transforming them into a new product.
            </p>
          </div>
        </div>
        <div className="eng-container">
          <img
            src="./images/Botanica.jpg"
            alt="card and leaf manual pressing "
            className="aboutPhoto"
          />
          <div className="about-info">
            <h2>Sobre Nós</h2>

            <p>
              Este projeto nasceu em 2017, com uma forte vontade de eternizar o
              efémero da natureza. Manifestou-se como um impulso para registrar
              a beleza da vida e seus ciclos, de diferentes maneiras. Queremos
              preservar a natureza que nos rodeia, viva e bela como ela é. Por
              isso, surgiu rapidamente a necessidade de criar produtos que
              ofereçam soluções ecológicas e sustentáveis para o nosso dia a dia
              e para o planeta.
            </p>
            <h3>Como o fazemos</h3>
            <p>
              Trabalhamos com a natureza na estampagem manual e tinturaria
              vegetal com métodos artesanais, numa tentativa de aumentar a vida
              útil de um material. Recorremos também à reciclagem de têxteis e
              outros materiais/desperdicios transformando-os num novo produto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
