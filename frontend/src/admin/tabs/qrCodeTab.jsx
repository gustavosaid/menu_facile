import { useState } from "react";
import QRCode from "react-qr-code";

export default function QrCodeTab() {
  const [modo, setModo] = useState('individual');
  const [mesaIndividual, setMesaIndividual] = useState("");
  const [inicio, setInicio] = useState(1);
  const [fim, setFim] = useState(10);

  // Pega o IP/URL atual automaticamente
  const baseUrl = window.location.origin; 

  const handlePrint = () => {
    window.print();
  };

  const renderCard = (numeroMesa) => (
    <div className="qr-card" key={numeroMesa}>
      <h2 className="qr-mesa-title">MESA {numeroMesa}</h2>
      <div className="qr-box">
        <QRCode value={`${baseUrl}/?mesa=${numeroMesa}`} size={160} />
      </div>
      <p className="qr-instructions">Aponte a câmera do seu celular<br/>para fazer o pedido.</p>
    </div>
  );

  const listaMesas = [];
  if (modo === 'lote') {
    for (let i = Number(inicio); i <= Number(fim); i++) {
      listaMesas.push(i);
    }
  }

  return (
    <div className="qr-generator-container no-print-shadow">
        <h1 className="admin-title no-print">Gerador de QR Code</h1>
        
        <div className="mode-selector no-print">
            <button 
                className={`mode-btn ${modo === 'individual' ? 'active' : ''}`}
                onClick={() => setModo('individual')}
            >
                Individual
            </button>
            <button 
                className={`mode-btn ${modo === 'lote' ? 'active' : ''}`}
                onClick={() => setModo('lote')}
            >
                Gerar em Lote
            </button>
        </div>
        
        <div className="input-group no-print">
            {modo === 'individual' ? (
                <>
                    <label>Número da Mesa:</label>
                    <input 
                        type="number" 
                        value={mesaIndividual}
                        onChange={(e) => setMesaIndividual(e.target.value)}
                        placeholder="Ex: 5"
                        className="mesa-input"
                    />
                </>
            ) : (
                <div className="lote-inputs">
                    <div>
                        <label>Da Mesa:</label>
                        <input 
                            type="number" 
                            value={inicio}
                            onChange={(e) => setInicio(e.target.value)}
                            className="mesa-input"
                        />
                    </div>
                    <div>
                        <label>Até a Mesa:</label>
                        <input 
                            type="number" 
                            value={fim}
                            onChange={(e) => setFim(e.target.value)}
                            className="mesa-input"
                        />
                    </div>
                </div>
            )}
        </div>

        <div className="qr-preview-area">
            {modo === 'individual' && mesaIndividual && renderCard(mesaIndividual)}
            
            {modo === 'lote' && (
                <div className="qr-grid">
                    {listaMesas.map(num => renderCard(num))}
                </div>
            )}
        </div>

        {(mesaIndividual || modo === 'lote') && (
            <button onClick={handlePrint} className="print-btn no-print">
                🖨️ Imprimir
            </button>
        )}
    </div>
  );
}