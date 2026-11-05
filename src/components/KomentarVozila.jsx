const KomentarVozila = ({ recenzija }) => {
  return (
    <li className="recenzija">
      <span className="recenzija-avatar">{recenzija.reviewerName[0]}</span>
      <div>
        <p className="recenzija-autor">
          <strong>{recenzija.reviewerName}</strong>
          <span className="recenzija-datum">
            {new Date(recenzija.date).toLocaleDateString("hr-HR")}
          </span>
        </p>
        <p className="recenzija-ocjena">Ocjena: {recenzija.rating} / 5</p>
        <p className="recenzija-tekst">{recenzija.comment}</p>
      </div>
    </li>
  );
};

export default KomentarVozila;
