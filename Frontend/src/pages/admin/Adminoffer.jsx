import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, Calendar, Percent, UserCheck, Plus } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [showAddOfferModal, setShowAddOfferModal] = useState(false);
  const [newOffer, setNewOffer] = useState({
    name: "",
    description: "",
    discount: "",
    minVisits: "",
    validUntil: "",
  });

  // Fetch offers from backend
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get("/api/admin/offers");
        setOffers(response.data.offers);
        setLoading(false);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        toast.error("Failed to load offers");
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Handle booking with offer
  const handleBookWithOffer = (offer) => {
    setSelectedOffer(offer);
    setShowModal(true);
  };

  // Submit booking with offer
  const submitBooking = async () => {
    if (!bookingDate || !bookingTime) {
      toast.error("Please select date and time");
      return;
    }

    try {
      await axios.post("/api/bookings", {
        offerId: selectedOffer._id,
        date: bookingDate,
        time: bookingTime,
      });

      toast.success("Booking successful with offer!");
      setShowModal(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Booking failed. Please try again."
      );
    }
  };

  const handleAddOffer = async () => {
    try {
      await axios.post("/api/admin/offers", newOffer);
      toast.success("Offer added successfully!");
      setShowAddOfferModal(false);
      setNewOffer({
        name: "",
        email:"",
        description: "",
        discount: "",
        minVisits: "",
        validUntil: "",
      });
      // Refresh offers
      const response = await axios.get("/api/admin/offers");
      setOffers(response.data.offers);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add offer");
    }
  };

  // Offer card component
  const OfferCard = ({ offer }) => {
    const isNew =
      Date.now() - new Date(offer.createdAt) < 7 * 24 * 60 * 60 * 1000;

    return (
      <motion.div
        className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg overflow-hidden"
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        onClick={() => handleBookWithOffer(offer)}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D8AB3E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[#D8AB3E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        {isNew && (
          <motion.div 
            className="absolute top-4 right-4 bg-[#D8AB3E] text-black px-3 py-1 rounded-full text-xs font-bold shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            NEW
          </motion.div>
        )}

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-[#D8AB3E]/20 rounded-lg">
              <Percent className="w-6 h-6 text-[#D8AB3E]" />
            </div>
            <h3 className="text-xl font-bold text-white">{offer.name}</h3>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed">{offer.description}</p>

          <div className="flex flex-wrap gap-3 mb-6">
            <motion.div 
              className="flex items-center gap-2 text-sm bg-gray-700/50 px-3 py-2 rounded-lg"
              whileHover={{ y: -2 }}
            >
              <UserCheck className="w-4 h-4 text-[#D8AB3E]" />
              <span>Min. {offer.minVisits} visits</span>
            </motion.div>

            <motion.div 
              className="flex items-center gap-2 text-sm bg-gray-700/50 px-3 py-2 rounded-lg"
              whileHover={{ y: -2 }}
            >
              <Calendar className="w-4 h-4 text-[#D8AB3E]" />
              <span>
                Valid until {new Date(offer.validUntil).toLocaleDateString()}
              </span>
            </motion.div>
          </div>

          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center gap-2 bg-[#D8AB3E]/20 px-4 py-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-5 h-5 text-[#D8AB3E] fill-[#D8AB3E]" />
              <span className="font-bold">{offer.discount}% OFF</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Loading skeleton
  const OfferSkeleton = () => (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 overflow-hidden">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        <div className="flex gap-2 mt-6">
          <div className="h-8 bg-gray-700 rounded-lg w-1/2"></div>
          <div className="h-8 bg-gray-700 rounded-lg w-1/2"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <motion.header 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#D8AB3E] to-[#f3d77e]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Exclusive Offers
          </motion.h1>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Unlock special discounts tailored just for you. The more you visit, the more you save!
          </motion.p>

          <motion.button
            onClick={() => setShowAddOfferModal(true)}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-[#D8AB3E] to-[#f3d77e] text-black rounded-xl font-medium flex items-center gap-2 mx-auto hover:shadow-lg hover:shadow-[#D8AB3E]/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Plus className="w-5 h-5" />
            <span>Create New Offer</span>
          </motion.button>
        </motion.header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <OfferSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {offers.map((offer) => (
              <OfferCard key={offer._id} offer={offer} />
            ))}
          </motion.div>
        )}

        {/* Booking Modal */}
        <AnimatePresence>
          {showModal && selectedOffer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700 shadow-xl relative overflow-hidden"
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D8AB3E]/10 rounded-full filter blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D8AB3E]/10 rounded-full filter blur-3xl -ml-20 -mb-20"></div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#D8AB3E] to-[#f3d77e]">
                    Book with {selectedOffer.name}
                  </h2>
                  <p className="text-gray-300 mb-6">
                    You're getting <span className="font-bold text-[#D8AB3E]">{selectedOffer.discount}% OFF</span> your booking!
                  </p>

                  <div className="space-y-5 mb-6">
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium">Date</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D8AB3E]/50 focus:border-transparent"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </motion.div>

                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-medium">Time</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D8AB3E]/50 focus:border-transparent"
                      >
                        <option value="">Select time</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="21:00">9:00 PM</option>
                      </select>
                    </motion.div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <motion.button
                      onClick={() => setShowModal(false)}
                      className="px-5 py-2.5 border border-gray-600 rounded-xl hover:bg-gray-700 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={submitBooking}
                      className="px-5 py-2.5 bg-gradient-to-r from-[#D8AB3E] to-[#f3d77e] text-black rounded-xl font-medium hover:shadow-lg hover:shadow-[#D8AB3E]/30 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Confirm Booking
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Offer Modal */}
        <AnimatePresence>
          {showAddOfferModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700 shadow-xl relative overflow-hidden"
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D8AB3E]/10 rounded-full filter blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D8AB3E]/10 rounded-full filter blur-3xl -ml-20 -mb-20"></div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#D8AB3E] to-[#f3d77e]">
                    Create New Offer
                  </h2>

                  <div className="space-y-5 mb-6">
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium">
                        Offer Name
                      </label>
                      <input
                        type="text"
                        value={newOffer.name}
                        onChange={(e) =>
                          setNewOffer({ ...newOffer, name: e.target.value })
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D8AB3E]/50 focus:border-transparent"
                        placeholder="e.g., Loyal Customer Discount"
                      />
                    </motion.div>
                       <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium">
                        Email
                      </label>
                      <input
                        type="text"
                        value={newOffer.email}
                        onChange={(e) =>
                          setNewOffer({ ...newOffer, email: e.target.value })
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D8AB3E]/50 focus:border-transparent"
                        placeholder="e.g., Loyal Customer Discount"
                      />
                    </motion.div>
                    

                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <label className="block text-sm font-medium">
                        Description
                      </label>
                      <textarea
                        value={newOffer.description}
                        onChange={(e) =>
                          setNewOffer({ ...newOffer, description: e.target.value })
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D8AB3E]/50 focus:border-transparent"
                        rows="3"
                      />
                    </motion.div>

                    <motion.div 
                      className="grid grid-cols-2 gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">
                          Discount (%)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={newOffer.discount}
                          onChange={(e) =>
                            setNewOffer({ ...newOffer, discount: e.target.value })
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D8AB3E]/50 focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium">
                          Minimum Visits
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={newOffer.minVisits}
                          onChange={(e) =>
                            setNewOffer({ ...newOffer, minVisits: e.target.value })
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D8AB3E]/50 focus:border-transparent"
                        />
                      </div>
                    </motion.div>

                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <label className="block text-sm font-medium">
                        Valid Until
                      </label>
                      <input
                        type="date"
                        value={newOffer.validUntil}
                        onChange={(e) =>
                          setNewOffer({ ...newOffer, validUntil: e.target.value })
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D8AB3E]/50 focus:border-transparent"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </motion.div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <motion.button
                      onClick={() => setShowAddOfferModal(false)}
                      className="px-5 py-2.5 border border-gray-600 rounded-xl hover:bg-gray-700 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={handleAddOffer}
                      className="px-5 py-2.5 bg-gradient-to-r from-[#D8AB3E] to-[#f3d77e] text-black rounded-xl font-medium hover:shadow-lg hover:shadow-[#D8AB3E]/30 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Create Offer
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ToastContainer 
        position="bottom-right"
        toastClassName="bg-gray-800 text-white border border-gray-700"
        progressClassName="bg-[#D8AB3E]"
      />
    </div>
  );
};

export default OffersPage;