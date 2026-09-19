import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Search } from "@mui/icons-material";

const CepForm = ({ onSearch, loading }) => {
  const [cep, setCep] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedCep = cep.replace(/\D/g, "");

    if (cleanedCep.length === 8) {
      onSearch(cleanedCep);
    }
  };

  const handleChange = (e) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "").slice(0, 8);
    setCep(onlyNumbers);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}
    >
      <TextField
        label="CEP"
        value={cep}
        onChange={handleChange}
        placeholder="Ex.: 37200-000"
        inputProps={{ inputMode: "numeric", maxLength: 8 }}
        fullWidth
        sx={{ flex: 1, minWidth: 220 }}
      />
      <Button
        type="submit"
        variant="contained"
        startIcon={<Search />}
        disabled={loading || cep.replace(/\D/g, "").length !== 8}
      >
        {loading ? "Buscando..." : "Buscar"}
      </Button>
    </Box>
  );
};

export default CepForm;