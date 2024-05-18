import React from 'react';
import { FormControlLabel, List, ListItem, Switch } from "@mui/material";

const FiltroLista = ({ filtros, handleToggle }) => (
    <List>
        {filtros.map((filtro) => (
            <ListItem
                key={filtro.label}
                sx={{
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                    '& .MuiTouchRipple-root': {
                        display: 'none',
                    },
                }}
            >
                <FormControlLabel
                    control={
                        <Switch
                            checked={filtro.ativo}
                            onChange={() => handleToggle(filtro.label)}
                            sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: filtro.color,
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: filtro.color,
                                },
                            }}
                        />
                    }
                    label={filtro.label}
                />
            </ListItem>
        ))}
    </List>
);

export default FiltroLista;
