import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Chip
} from "@mui/material";
import { Save, Close } from "@mui/icons-material";

const AddressDisplay = ({ address, isFavoriteView, onSave, onClose }) => {
  return (
    <Card sx={{ mt: 4, mb: 2, border: "1px solid", borderColor: "divider" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mb: 2,
            flexWrap: "wrap"
          }}
        >
          <Typography variant="h5" component="h2">
            {isFavoriteView ? address.apelido : "Endereço Encontrado"}
          </Typography>

          {isFavoriteView ? (
            <Button onClick={onClose} color="secondary" startIcon={<Close />}>
              Fechar
            </Button>
          ) : (
            <Button
              onClick={onSave}
              variant="contained"
              startIcon={<Save />}
              disabled={!address}
            >
              Salvar Favorito
            </Button>
          )}
        </Box>

        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography><strong>Logradouro:</strong> {address.logradouro || "N/A"}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography><strong>Cidade:</strong> {address.localidade || "N/A"}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography><strong>UF:</strong> {address.uf || "N/A"}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography><strong>Bairro:</strong> {address.bairro || "N/A"}</Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            {address.ddd && (
              <Chip
                label={`DDD: ${address.ddd}`}
                variant="outlined"
                color="primary"
                size="small"
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AddressDisplay;