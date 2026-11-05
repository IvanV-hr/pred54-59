import { Button } from "./Button";

const FilterVozila = ({ marke, filteri, onPromjeni, onPonisti }) => {
  return (
    <div className="forma filteri">
      <div className="filteri-polja">
        <div className="filter-polje">
          <label htmlFor="pretraga-vozila">Pretražite automobile</label>
          <input
            type="text"
            id="pretraga-vozila"
            name="pojamPretrage"
            value={filteri.pojamPretrage}
            onChange={onPromjeni}
          />
        </div>
        <div className="filter-polje">
          <label htmlFor="cijena-od">Cijena od ($)</label>
          <input
            type="number"
            id="cijena-od"
            name="cijenaOd"
            min="0"
            value={filteri.cijenaOd}
            onChange={onPromjeni}
          />
        </div>
        <div className="filter-polje">
          <label htmlFor="cijena-do">Cijena do ($)</label>
          <input
            type="number"
            id="cijena-do"
            name="cijenaDo"
            min="0"
            value={filteri.cijenaDo}
            onChange={onPromjeni}
          />
        </div>
        <div className="filter-polje">
          <label htmlFor="ocjena-vozila">Najmanja ocjena</label>
          <select
            id="ocjena-vozila"
            name="najmanjaOcjena"
            value={filteri.najmanjaOcjena}
            onChange={onPromjeni}
          >
            <option value="0">Sve ocjene</option>
            <option value="3">Barem 3</option>
            <option value="4">Barem 4</option>
          </select>
        </div>
        <div className="filter-polje">
          <label htmlFor="redoslijed-vozila">Redoslijed vozila</label>
          <select
            id="redoslijed-vozila"
            name="redoslijed"
            value={filteri.redoslijed}
            onChange={onPromjeni}
          >
            <option value="zadano">Zadani redoslijed</option>
            <option value="najjeftiniji">Od najjeftinijeg</option>
            <option value="najskuplji">Od najskupljeg</option>
            <option value="najboljaOcjena">Od najbolje ocjene</option>
          </select>
        </div>
      </div>
      <div className="filteri-gumbi">
        <div className="marke-vozila">
          {marke.map((marka) => (
            <Button
              key={marka}
              name="odabranaMarka"
              value={marka}
              className={
                filteri.odabranaMarka === marka ? "gumb" : "gumb gumb-povratak"
              }
              onClick={onPromjeni}
            >
              {marka}
            </Button>
          ))}
        </div>
        <Button className="gumb gumb-povratak" onClick={onPonisti}>
          Poništite filtre
        </Button>
      </div>
    </div>
  );
};

export default FilterVozila;
