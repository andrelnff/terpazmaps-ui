import React, {useState} from 'react';
import {styled} from '@mui/system';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {useMap} from "../../context/mapContext";
import {useMapCenter} from "../../hooks/useMapCenter";

const StyledSelect = styled(Select)(() => ({
    backgroundColor: 'white',
    borderRadius: '20px',
}));

const StyledMenuItem = styled(MenuItem)(() => ({
    '&:hover': {
        backgroundColor: '#0468BF',
        color: 'white',
    },
}));

function SelectRegion() {
    const [region, setRegion] = useState('');
    const { idNameList } = useMap();
    const { handleMapSelect } = useMapCenter();

    console.log("renderizei select")

    const handleChange = (event) => {
        setRegion(event.target.value);
        const selectedRegion = idNameList.find(r => r.name === event.target.value);
        if (selectedRegion && selectedRegion.coordinates) {
            handleMapSelect(selectedRegion.id, selectedRegion.coordinates);
        }
    };


    return (
        <ClickAwayListener onClickAway={() => setRegion('')}>
            <FormControl sx={{
                position: 'fixed',
                width: '15vw',
                top: '15%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
            }}>
                <StyledSelect
                    value={region}
                    onChange={handleChange}
                    IconComponent={ExpandMoreIcon}
                    displayEmpty
                >
                    <StyledMenuItem value="" disabled>
                        Selecione uma região
                    </StyledMenuItem>
                    {idNameList.map((idNameList) => (
                        <StyledMenuItem key={idNameList.id} value={idNameList.name}>
                            {idNameList.name}
                        </StyledMenuItem>
                    ))}
                </StyledSelect>
            </FormControl>
        </ClickAwayListener>
    );
}

export default SelectRegion;
