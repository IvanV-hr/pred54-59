import { Link } from "react-router";

const Kartica = ({ podatci, putanja, varijanta = "osnovna" }) => {
  return (
    <div className={`kartica kartica-${varijanta}`}>
      {podatci.slika && (
        <img
          className="kartica-slika"
          alt={podatci.opisSlike}
          src={podatci.slika}
        />
      )}

      <div className="kartica-sadrzaj">
        {podatci.trajanje && <p className="oznaka">{podatci.trajanje}</p>}
        {podatci.naslov && <h3>{podatci.naslov}</h3>}
        {podatci.opis && <p>{podatci.opis}</p>}
        {podatci.cijena && (
          <p className="cijena-kartice">Okvirna cijena: {podatci.cijena} $</p>
        )}

        {putanja && (
          <Link className="gumb" to={putanja}>
            Detalji
          </Link>
        )}
      </div>
    </div>
  );
};

export default Kartica;
