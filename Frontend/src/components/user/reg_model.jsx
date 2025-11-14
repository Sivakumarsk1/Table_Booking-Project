import React, { useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ShowRedirectModel = ({ open, onClose }) => {

  const navigate = useNavigate();
  const goToPage = () => {
    navigate('/signup'); // Navigate to the "/about" page
  };

  return (
    <div>
      {/* Button to Open Modal */}
      {/* Modal Component */}
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        sx={{ background: "#00000080" }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            background: "#1a1a1a",
          }}
        >
          <Typography id="modal-title" variant="h6" sx={{ color: "#d8ab3e" }}>
            Exclusive Offers Await! Register Now and Enjoy More Benefits
          </Typography>
          <Typography sx={{ mt: 2, color: "#fff00" }}>
            You have already booked. You registered and received many offers.
          </Typography>
          <div className="" style={{display:'flex', justifyContent:'space-between'}}>
            <Button
              onClick={onClose}
              sx={{ mt: 2, background: "#d8ab3e" }}
              variant="contained"
            >
              Close
            </Button>
            <Button
              onClick={goToPage}
              sx={{ mt: 2, background: "#d8ab3e" }}
              variant="contained"
            >
              Sign up
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ShowRedirectModel;
