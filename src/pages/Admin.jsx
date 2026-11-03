import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import AdminPanel from "../components/AdminPanel";
import ZaposlenikForma from "../components/ZaposlenikForma";

const Admin = () => {
  const [zaposlenici, setZaposlenici] = useState([]);
  const [komentari, setKomentari] = useState([]);
  const [greska, setGreska] = useState("");

  useEffect(() => {
    async function dohvatiPodatke() {
      try {
        const podatciOdZaposlenika = await apiRequest("users?limit=0");
        setZaposlenici(podatciOdZaposlenika.users);

        const podatciOdKomentara = await apiRequest("comments?limit=0");
        setKomentari(podatciOdKomentara.comments);
      } catch {
        setGreska(
          "Dohvaćanje podataka o zaposlenicima i komenatrima nije uspjelo. Osvježite stranicu.",
        );
      }
    }
    dohvatiPodatke();
  }, []);

  async function dohvatiDetalje(vrstaPodatka, id) {
    setGreska("");
    try {
      return await apiRequest(`${vrstaPodatka}/${id}`);
    } catch {
      setGreska("Prikaz detalja nije uspio. Pokušajte ponovno.");
    }
  }

  async function obrisi(vrstaPodatka, id) {
    setGreska("");
    try {
      await apiRequest(`${vrstaPodatka}/${id}`, {
        method: "DELETE",
      });

      if (vrstaPodatka === "users") {
        setZaposlenici((zaposlenici) =>
          zaposlenici.filter((zaposlenik) => zaposlenik.id !== id),
        );
      } else {
        setKomentari((komentari) =>
          komentari.filter((komentar) => komentar.id !== id),
        );
      }
    } catch {
      setGreska("Brisanje podatka nije uspjelo. Pokušajte ponovno.");
    }
  }

  async function promjeniEmail(email, id) {
    setGreska("");
    try {
      const zaposlenik = await apiRequest(`users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
        }),
      });
      setZaposlenici((zaposlenici) =>
        zaposlenici.map((zaposlenik) =>
          zaposlenik.id === id ? { ...zaposlenik, email } : zaposlenik,
        ),
      );
      return zaposlenik;
    } catch {
      setGreska(
        "Došlo je do greške orikom promjene e-mail adrese. Pokušajte ponovo.",
      );
    }
  }

  async function dodajZaposlenika(podatci) {
    setGreska("");
    try {
      const noviZaposlenik = await apiRequest("/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(podatci),
      });

      setZaposlenici((zaposlenici) => [noviZaposlenik, ...zaposlenici]);
    } catch {
      setGreska("Dodavanje korisnika nije uspjelo. Pokušajte ponovno.");
    }
  }

  return (
    <section className="section">
      <p className="oznaka">Pregled podataka</p>
      <h2>Administracija</h2>
      <p>Pregledajte zaposlenike i komentare</p>
      {greska && <p className="greska">{greska}</p>}
      <div className="admin-paneli">
        <AdminPanel
          vrstaPodatka="users"
          naslov="Zaposlenici"
          podatci={zaposlenici}
          onPrikazDetalja={dohvatiDetalje}
          onPromjeniEmail={promjeniEmail}
          onObrisi={obrisi}
        />
        <AdminPanel
          vrstaPodatka="comments"
          naslov="Komentari"
          podatci={komentari}
          onPrikazDetalja={dohvatiDetalje}
          onObrisi={obrisi}
        />
      </div>
      <ZaposlenikForma onDodajZaposlenika={dodajZaposlenika} />
    </section>
  );
};

export default Admin;
