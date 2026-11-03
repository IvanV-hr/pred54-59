import { useState } from "react";
import { Button } from "./Button";

const ZaposlenikForma = ({ onDodajZaposlenika }) => {
  const [podatci, setPodatci] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  function promijeniPodatak(event) {
    setPodatci({ ...podatci, [event.target.name]: event.target.value });
  }

  async function posalji(event) {
    event.preventDefault();
    await onDodajZaposlenika(podatci);
    setPodatci({
      firstName: "",
      lastName: "",
      email: "",
    });
  }

  return (
    <section className="section">
      <h2>Novi zaposlenik</h2>
      <p>Unesite podatke za kreiranje novog korisnika.</p>
      <form className="forma zaposlenik-forma" onSubmit={posalji}>
        <label htmlFor="zaposlenik-ime">Ime</label>
        <input
          type="text"
          id="zaposlenik-ime"
          minLength={2}
          required
          name="firstName"
          onChange={promijeniPodatak}
          value={podatci.firstName}
        />
        <label htmlFor="zaposlenik-prezime">Prezime</label>
        <input
          type="text"
          id="zaposlenik-prezime"
          minLength={2}
          required
          name="lastName"
          onChange={promijeniPodatak}
          value={podatci.lastName}
        />
        <label htmlFor="zaposlenik-email">Adresa e-pošte</label>
        <input
          type="email"
          id="zaposlenik-email"
          required
          name="email"
          onChange={promijeniPodatak}
          value={podatci.email}
        />
        <Button type="submit">Kreiraj zaposlenika</Button>
      </form>
    </section>
  );
};

export default ZaposlenikForma;
