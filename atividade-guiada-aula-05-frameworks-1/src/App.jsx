import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Divider,
  Box
} from "@mui/material";
import { Map } from "@mui/icons-material";
import theme from "./theme";
import { getAddressByCep } from "./api/viaCep";
import { getCoordinatesByAddress } from "./api/opencage";
import CepForm from "./components/CepForm";
import AddressDisplay from "./components/AddressDisplay";
import MapView from "./components/MapView";
import FavoritesList from "./components/FavoritesList";

const AppWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  min-height: 100vh;
  padding: 3rem 1rem;
`;

const MainContent = styled(Box)`
  background: ${({ theme }) => theme.palette.background.paper};
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);

  @media (max-width: 600px) {
    padding: 1.25rem;
  }
`;

function App() {
  const [address, setAddress] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFavoriteView, setIsFavoriteView] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (cep) => {
    setIsFavoriteView(false);
    setLoading(true);
    setError("");
    setAddress(null);
    setCoordinates(null);

    try {
      const addressData = await getAddressByCep(cep);
      setAddress(addressData);

      const coords = await getCoordinatesByAddress(addressData);
      setCoordinates(coords);
    } catch (err) {
      setError(err.message || "Ocorreu um erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFavorite = () => {
    if (!address) return;

    const isAlreadyFavorite = favorites.some(
      (fav) => fav.cep === address.cep
    );

    if (isAlreadyFavorite) {
      setError("Este endereço já está na sua lista de favoritos.");
      return;
    }

    const newFavorite = {
      id: Date.now(),
      apelido: "Novo Endereço",
      ...address,
      coordinates
    };

    setFavorites((prevFavorites) => [newFavorite, ...prevFavorites]);
    handleCloseDisplay();
    setError("");
  };

  const handleUpdateFavorite = (id, newApelido) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((fav) =>
        fav.id === id ? { ...fav, apelido: newApelido } : fav
      )
    );
  };

  const handleDeleteFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== id)
    );
  };

  const handleSelectFavorite = (favorite) => {
    setAddress(favorite);
    setIsFavoriteView(true);
    setCoordinates(favorite.coordinates || null);
    setError("");
  };

  const handleCloseDisplay = () => {
    setAddress(null);
    setCoordinates(null);
    setIsFavoriteView(false);
  };

  return (
    <AppWrapper theme={theme}>
      <Container maxWidth="md">
        <MainContent theme={theme}>
          <Box sx={{ textAlign: "center" }}>
            <Map color="primary" sx={{ fontSize: 42 }} />
            <Typography variant="h3" component="h1" gutterBottom>
              GeoBusca CEP
            </Typography>
            <Typography color="text.secondary">
              Busque um endereço pelo CEP, visualize no mapa e salve seus favoritos.
            </Typography>
          </Box>

          <CepForm onSearch={handleSearch} loading={loading} />

          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert
              severity="error"
              sx={{ mt: 3 }}
              onClose={() => setError("")}
            >
              {error}
            </Alert>
          )}

          {address && (
            <AddressDisplay
              address={address}
              isFavoriteView={isFavoriteView}
              onSave={handleAddFavorite}
              onClose={handleCloseDisplay}
            />
          )}

          {coordinates && <MapView coordinates={coordinates} />}

          <Divider sx={{ my: 4 }} />

          <FavoritesList
            favorites={favorites}
            onUpdate={handleUpdateFavorite}
            onDelete={handleDeleteFavorite}
            onSelect={handleSelectFavorite}
          />
        </MainContent>
      </Container>
    </AppWrapper>
  );
}

export default App;