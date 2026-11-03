import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import { Button } from "../components/Button";
import KarticaVozila from "../components/KarticaVozila";

const Vozila = () => {
  const [vozila, setVozila] = useState([]);
  const [ucitavanje, setUcitavanje] = useState(true);
  const [greska, setGreska] = useState("");
  const [brojPokusaja, setBrojPokusaja] = useState(0);

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
      <div className="kartice kartice-vozila">
        {vozila.map((vozilo) => (
          <KarticaVozila key={vozilo.id} vozilo={vozilo} />
        ))}
      </div>
    </section>
  );
};

export default Vozila;
