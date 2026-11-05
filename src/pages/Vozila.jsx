import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import { Button } from "../components/Button";
import KarticaVozila from "../components/KarticaVozila";
import FilterVozila from "../components/FilterVozila";

const pocetniFilteri = {
  pojamPretrage: "",
  cijenaOd: "",
  cijenaDo: "",
  najmanjaOcjena: "",
  redoslijed: "zadano",
};

const Vozila = () => {
  const [vozila, setVozila] = useState([]);
  const [ucitavanje, setUcitavanje] = useState(true);
  const [greska, setGreska] = useState("");
  const [brojPokusaja, setBrojPokusaja] = useState(0);
  const [filteri, setFilteri] = useState(pocetniFilteri);

  function promijeniFilter(event) {
    setFilteri({ ...filteri, [event.target.name]: event.target.value });
  }

  const pojamPretrage = filteri.pojamPretrage.trim().toLowerCase();

  const filtriranaVozila = vozila.filter(
    (vozilo) =>
      `${vozilo.title} ${vozilo.brand}`.toLowerCase().includes(pojamPretrage) &&
      vozilo.price >= 0 &&
      (filteri.cijenaDo === "" || vozilo.price <= Number(filteri.cijenaDo)) &&
      vozilo.rating >= Number(filteri.najmanjaOcjena),
  );

  if (filteri.redoslijed === "najjeftiniji") {
    filtriranaVozila.sort((a , b)=> a.price - b.price)
  }

  if (filteri.redoslijed === "najskuplji") {
    filtriranaVozila.sort((a , b)=> b.price - a.price)
  }

  if (filteri.redoslijed === "najboljaOcjena") {
    filtriranaVozila.sort((a , b)=> b.rating - a.rating)
  }

  useEffect(() => {
    async function dohvatiVozila() {
      try {
        const response = await apiRequest("/products/category/vehicle");
        setVozila(response.products);
      } catch {
        setGreska("Prikaz vozila nije uspio. Pokušajte ponovo.");
      } finally {
        setUcitavanje(false);
      }
    }
    dohvatiVozila();
  }, [brojPokusaja]);

  function pokusajPonovo() {
    setUcitavanje(true);
    setGreska("");
    setBrojPokusaja(brojPokusaja + 1);
  }

  return (
    <section className="section">
      <h2>Auti na prodaju</h2>
      <p>Pogledajte naše automobile.</p>
      {ucitavanje && <p>Učitavanje vozila...</p>}
      {greska && (
        <>
          <p>{greska}</p>
          <Button onClick={pokusajPonovo}>Pokušajte ponovo</Button>
        </>
      )}
      <FilterVozila
        filteri={filteri}
        onPromjeni={promijeniFilter}
        onPonisti={() => setFilteri(pocetniFilteri)}
      />
      <div className="kartice kartice-vozila">
        {filtriranaVozila.map((vozilo) => (
          <KarticaVozila key={vozilo.id} vozilo={vozilo} />
        ))}
      </div>
    </section>
  );
};

export default Vozila;
