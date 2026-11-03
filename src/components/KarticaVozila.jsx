import { Link } from "react-router";

const KarticaVozila = ({ vozilo }) => {
  return (
    <div className="kartica kartica-vozila">
      <img
        className="kartica-slika"
        src={vozilo.thumbnail}
        alt={vozilo.title}
      />
      <div className="kartica-sadrzaj">
        <p className="oznaka">{vozilo.brand}</p>
        <h3>{vozilo.title}</h3>
        <p>Ocjena kupaca: {vozilo.rating} / 5</p>
        <p className="cijena-kartice">{vozilo.price.toFixed(2)} $</p>
        <Link className="gumb" to={`/vozila/${vozilo.id}`}>
          Detalji
        </Link>
      </div>
    </div>
  );
};

export default KarticaVozila;
