import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import HeroSekcija from "./components/HeroSekcija.jsx";
import Naslovnica from "./pages/Naslovnica.jsx";
import Kontakt from "./pages/Kontakt.jsx";
import { Route, Routes } from "react-router";
import Usluge from "./pages/Usluge.jsx";
import DetaljiUsluge from "./pages/DetaljiUsluge.jsx";
import NotFound from "./pages/NotFound.jsx";
import Layout from "./layouts/layout.jsx";
import NotFoundLayout from "./layouts/NotFoundLayout.jsx";
import PotvrdaLayout from "./layouts/PotvrdaLayout.jsx";
import Potvrda from "./pages/Potvrda.jsx";
import ONama from "./pages/ONama.jsx";
import Admin from "./pages/Admin.jsx";
import Vozila from "./pages/Vozila.jsx";
import DetaljiVozila from "./pages/DetaljiVozila.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Naslovnica />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/usluge" element={<Usluge />} />
          <Route path="/usluge/:id" element={<DetaljiUsluge />} />
          <Route path="/o-nama" element={<ONama />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/vozila" element={<Vozila />} />
          <Route path="/vozila/:id" element={<DetaljiVozila />} />
        </Route>
        <Route element={<NotFoundLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<PotvrdaLayout />}>
          <Route path="/potvrda" element={<Potvrda />} />
          <Route path="/novosti/potvrda" element={<Potvrda />} />
        </Route>
      </Routes>
    </>
  );
}
