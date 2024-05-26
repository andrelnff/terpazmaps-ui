import React from 'react';

function OverlayControls({ onDelete, onSave }) {
  return (
    <div>
      <button className="button deleteButton" onClick={onDelete}>Apagar Tudo</button>
      <button className="button printButton" onClick={onSave}>Salvar Mapa</button>
    </div>
  );
}

export default OverlayControls;
