import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import {addRating, getRatings} from "../../service/mapService";

export default function StarRating({ mapId }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    getRatings(mapId).then(ratings => {
      const averageRating = ratings.reduce((total, rating) => total + rating.stars, 0) / ratings.length;
      setValue(averageRating);
    });
  }, [mapId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    addRating(mapId, newValue);
  };

  return (
    <Box sx={{
      position: 'absolute',
      top: '80%',
      left: '50%',
      transform: 'translate(-50%, -20%)',
      boxShadow: 3,
      borderRadius: 1,
      p: 2,
      bgcolor: 'background.paper',
      maxWidth: 'fit-content'
    }}>
      <Rating name="simple-controlled" value={value} onChange={handleChange} readOnly />
    </Box>
  );
}