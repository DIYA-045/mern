import React, { useState } from 'react';

export default function App() {
  const [step, setStep] = useState('form'); 
  const [type, setType] = useState('Organic (Food Waste)');
  const [location, setLocation] = useState('');
  const [reports, setReports] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [isLocating, setIsLocating] = useState(false); // Tracks GPS loading state

  // Dynamic counter computations based on state
  const totalFiled = reports.length;
  const totalSolved = reports.filter(r => r.cleanedImage).length;

  const handleNext = (e) => {
    e.preventDefault();
    
    // Fallback requirement check if they didn't input text address
    if (!location.trim()) {
      return alert('Please enter street location / address or context details!');
    }

    setIsLocating(true);

    // Fetch exact live GPS coordinates from browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const gpsCoords = `📍 Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`;
          
          finalizeReport(gpsCoords);
        },
        (error) => {
          console.warn("Geolocation error, falling back to manual entry:", error.message);
          alert("Could not fetch precise GPS automatically (Permission Denied/Timeout). Using typed address instead.");
          finalizeReport(location.trim());
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      alert("Your browser does not support automatic GPS tracking. Using typed address instead.");
      finalizeReport(location.trim());
    }
  };

  // Separated log execution block
  const finalizeReport = (locationString) => {
    const newId = Date.now();
    const nr = { 
      id: newId, 
      type, 
      location: locationString, // Contains structural GPS coords or backup typed string
      manualAddress: location.trim(), // Keep manual reference
      status: 'Sent to local collection queue.', 
      image: null, 
      cleanedImage: null 
    };
    
    setReports([nr, ...reports]);
    
    alert(`♻️ Waste Report Logged!\nType: ${type}\nLocation: ${locationString}\n\nStatus: Sent to local collection queue.`);
    
    setActiveId(newId);
    setIsLocating(false);
    setStep('tracker');
  };

  const handleImg = (e, id, key) => {
    const f = e.target.files[0];
    if (f) {
      const r = new FileReader();
      r.onloadend = () => {
        setReports(prev => prev.map(item => item.id === id ? { ...item, [key]: r.result } : item));
      };
      r.readAsDataURL(f);
    }
  };

  return (
    <div style={{ width: '90%', maxWidth: '1000px', margin: '40px auto', padding: '30px', fontFamily: '"Segoe UI", sans-serif', background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', boxSizing: 'border-box' }}>
      <h1 style={{ textAlign: 'center', color: '#1b5e20', margin: '0 0 30px 0', fontSize: '32px', letterSpacing: '0.5px' }}>EcoReport</h1>

      {step === 'form' && (
        <form onSubmit={handleNext} style={{ background: '#fcfcfc', padding: '30px', borderRadius: '8px', border: '1px solid #eaeaea' }}>
          <div style={{ padding: '10px 15px', background: '#e3f2fd', color: '#0d47a1', fontSize: '14px', fontWeight: 'bold', marginBottom: '25px', borderRadius: '4px', borderLeft: '4px solid #1976d2' }}>
            🏢 Request Destination: GVMC Municipal Workers
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', fontSize: '15px', marginBottom: '8px', color: '#333' }}>Waste Type:</label>
            <select value={type} onChange={e => setType(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '15px', background: '#fff' }}>
              <option value="Organic (Food Waste)">Organic (Food Waste)</option>
              <option value="Plastic / Recyclable">Plastic / Recyclable</option>
              <option value="Hazardous / E-Waste">Hazardous / E-Waste</option>
            </select>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', fontSize: '15px', marginBottom: '8px', color: '#333' }}>Street Location / Nearby Landmarks:</label>
            <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g., Near Street B, Opp Park" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '15px', boxSizing: 'border-box' }} />
          </div>

          <button type="submit" disabled={isLocating} style={{ width: '100%', background: isLocating ? '#94d3b4' : '#198754', color: 'white', padding: '14px', border: 'none', borderRadius: '6px', cursor: isLocating ? 'not-allowed' : 'pointer', fontSize: '16px', fontWeight: 'bold', transition: 'background 0.2s' }}>
            {isLocating ? '🌐 Fetching Live GPS Location...' : 'Submit Clean-up Request'}
          </button>
        </form>
      )}

      {step === 'tracker' && (
        <div style={{ background: '#fcfcfc', padding: '30px', borderRadius: '8px', border: '1px solid #eaeaea' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '2px solid #f0f0f0', paddingBottom: '15px' }}>
            <h3 style={{ margin: '0', color: '#0d47a1', fontSize: '22px', display: 'flex', alignItems: 'center', gap: '8px' }}>📋 GVMC Live Status Monitor</h3>
            <button onClick={() => setStep('form')} style={{ fontSize: '14px', padding: '8px 16px', cursor: 'pointer', background: '#fff', border: '1px solid #ccc', borderRadius: '4px', fontWeight: 'bold' }}>+ New Request</button>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
            <div style={{ flex: 1, background: '#e8f5e9', padding: '15px', borderRadius: '8px', border: '1px solid #c8e6c9', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#2e7d32', marginBottom: '5px' }}>📊 Total Reports Filed</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1b5e20' }}>{totalFiled}</div>
            </div>
            <div style={{ flex: 1, background: '#e3f2fd', padding: '15px', borderRadius: '8px', border: '1px solid #bbdefb', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#0d47a1', marginBottom: '5px' }}>✅ Total Solved / Cleaned</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0d47a1' }}>{totalSolved}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {reports.map((r) => (
              <div key={r.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                
                <div style={{ display: 'flex', gap: '20px', marginBottom: '15px', borderBottom: '1px solid #f9f9f9', paddingBottom: '15px' }}>
                  <div style={{ flex: 1, fontSize: '12px', fontWeight: 'bold', color: '#666' }}>
                    BEFORE
                    {r.image ? <img src={r.image} alt="Before" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px', marginTop: '6px', border: '1px solid #eee' }} /> : <div style={{ height: '140px', background: '#f5f5f5', border: '1px dashed #ccc', borderRadius: '6px', marginTop: '6px' }} />}
                  </div>
                  <div style={{ flex: 1, fontSize: '12px', fontWeight: 'bold', color: '#198754' }}>
                    CLEANED
                    {r.cleanedImage ? <img src={r.cleanedImage} alt="Cleaned" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px', marginTop: '6px', border: '1px solid #198754' }} /> : <div style={{ height: '140px', background: '#fafafa', border: '1px dashed #ccc', borderRadius: '6px', marginTop: '6px' }} />}
                  </div>
                </div>

                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#222' }}>{r.type} | 📍 {r.location}</div>
                {r.manualAddress && r.location !== r.manualAddress && (
                  <div style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>Context: {r.manualAddress}</div>
                )}
                <div style={{ fontSize: '14px', color: '#555', margin: '6px 0 15px 0' }}>Status: {r.cleanedImage ? '✅ Cleaned Up' : r.status}</div>
                
                {!r.image && activeId === r.id && (
                  <div style={{ background: '#e8f5e9', padding: '15px', borderRadius: '6px', border: '1px solid #c8e6c9' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#2e7d32' }}>📸 Step 2: Capture Trash Photo Evidence:</label>
                    <input type="file" accept="image/*" capture="environment" onChange={(e) => handleImg(e, r.id, 'image')} style={{ fontSize: '14px' }} />
                  </div>
                )}
                
                {r.image && !r.cleanedImage && (
                  <div style={{ marginTop: '15px', borderTop: '1px dashed #eee', paddingTop: '15px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>📁 GVMC Worker: Upload Cleared Photo:</label>
                    <input type="file" accept="image/*" capture="environment" onChange={(e) => handleImg(e, r.id, 'cleanedImage')} style={{ fontSize: '14px' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
