import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;

const opencageApi = axios.create({
  baseURL: "https://api.opencagedata.com/geocode/v1/json"
});

export const getCoordinatesByAddress = async (address) => {
  if (!API_KEY) {
    throw new Error("Chave da OpenCage não configurada. Crie um arquivo .env com VITE_OPENCAGE_API_KEY.");
  }

  const query = `${address.logradouro}, ${address.localidade}, ${address.uf}, Brasil`;

  const response = await opencageApi.get("", {
    params: {
      q: query,
      key: API_KEY,
      limit: 1,
      language: "pt-BR"
    }
  });

  if (!response.data.results?.length) {
    throw new Error("Coordenadas não encontradas.");
  }

  const { lat, lng } = response.data.results[0].geometry;
  return { lat, lng };
};