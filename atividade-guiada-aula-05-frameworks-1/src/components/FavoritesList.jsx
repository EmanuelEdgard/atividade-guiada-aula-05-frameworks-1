import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Box,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Collapse
} from "@mui/material";
import { Edit, Delete, Save, Cancel, LocationOn } from "@mui/icons-material";
import { TransitionGroup } from "react-transition-group";

const FavoritesList = ({ favorites, onUpdate, onDelete, onSelect }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEditStart = (favorite) => {
    setEditingId(favorite.id);
    setEditText(favorite.apelido);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleEditSave = () => {
    if (editText.trim()) {
      onUpdate(editingId, editText.trim());
    }
    handleEditCancel();
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Meus Endereços Salvos
      </Typography>

      {favorites.length === 0 ? (
        <Typography sx={{ textAlign: "center", py: 3 }}>
          Sua lista está vazia.
        </Typography>
      ) : (
        <List>
          <TransitionGroup>
            {favorites.map((fav) => (
              <Collapse key={fav.id}>
                <ListItem
                  disablePadding
                  secondaryAction={
                    editingId === fav.id ? (
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <IconButton
                          aria-label="Salvar apelido"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditSave();
                          }}
                        >
                          <Save />
                        </IconButton>
                        <IconButton
                          aria-label="Cancelar edição"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditCancel();
                          }}
                        >
                          <Cancel />
                        </IconButton>
                      </Box>
                    ) : (
                      <Box sx={{ display: "flex" }}>
                        <IconButton
                          aria-label="Editar"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditStart(fav);
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          aria-label="Excluir"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(fav.id);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    )
                  }
                >
                  <ListItemButton onClick={() => onSelect(fav)} sx={{ py: 2, pr: 16 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "secondary.main" }}>
                        <LocationOn />
                      </Avatar>
                    </ListItemAvatar>

                    {editingId === fav.id ? (
                      <TextField
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        fullWidth
                        autoFocus
                        size="small"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleEditSave();
                          if (e.key === "Escape") handleEditCancel();
                        }}
                      />
                    ) : (
                      <ListItemText
                        primary={fav.apelido}
                        secondary={`${fav.logradouro || "N/A"} — ${fav.localidade || ""}/${fav.uf || ""}`}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      )}
    </Box>
  );
};

export default FavoritesList;