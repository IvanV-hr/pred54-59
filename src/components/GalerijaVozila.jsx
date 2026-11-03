import { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router";

const GalerijaVozila = ({ vozilo }) => {
  const [odabranaSlika, setOdabranaSlika] = useState(vozilo.images[0]);

  return (
    <section className="section detalji-vozila">
      <div className="galerija-vozila">
        <img
          className="galerija-slika"
          src={odabranaSlika}
          alt={vozilo.title}
        />
        <div className="galerija-slike">
          {vozilo.images.map((slika, index) => (
            <Button
              onClick={() => setOdabranaSlika(slika)}
              key={slika}
              className={
                slika === odabranaSlika
                  ? "galerija-gumb odabrana"
                  : "galerija-gumb"
              }
            >
              <img src={slika} alt={`prikazi sliku ${index + 1}`} />
            </Button>
          ))}
        </div>
      </div>
      <div className="detalji-sadrzaj">
        <p className="oznaka">{vozilo.brand}</p>
        <h2>{vozilo.title}</h2>
        <p>{vozilo.description}</p>
        <p>Ocjena kupaca: {vozilo.rating} / 5</p>
        <p className="cijena-kartice">{vozilo.price.toFixed(2)} $</p>
        <div className="actions">
          <Link className="gumb" to="/kontakt">
            Pošaljite upit
          </Link>
          <Link className="gumb gumb-povratak" to="/vozila">
            Natrag na aute
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalerijaVozila;
