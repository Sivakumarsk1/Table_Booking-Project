import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UserOffers() {
  const { email } = useParams();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios
      .get(`api/admin/offers/user/${email}`)
      .then((res) => setOffers(res.data.offers))
      .catch((err) => console.error("Error fetching offers", err));
  }, [email]);

  return (
    <div className="p-4 mt-24 container mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Offers</h2>
      {offers.length === 0 ? (
        <p>No offers available.</p>
      ) : (
        <ul className="space-y-4">
          {offers.map((offer) => (
            <li key={offer.id} className="border p-4 rounded bg-white shadow-md">
              <h3 className="text-lg font-semibold">{offer.name}</h3>
              <p>{offer.description}</p>
              <p className="text-primary font-bold">Discount: {offer.discount}%</p>
              <p>Valid Until: {new Date(offer.valid_until).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserOffers;
