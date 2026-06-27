import React, { useState } from 'react';

export default function PermissionsScreen({ onComplete }) {
  const [isRequesting, setIsRequesting] = useState(false);

  const requestPermissions = async () => {
    setIsRequesting(true);
    
    try {
      // 1. Request Camera
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          // Stop immediately, we just wanted permission
          stream.getTracks().forEach(track => track.stop());
        } catch (e) {
          console.log("Camera permission denied/failed", e);
        }
      }

      // 2. Request Location
      if (navigator.geolocation) {
        try {
          await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
          });
        } catch (e) {
          console.log("Location permission denied/failed", e);
        }
      }

      // 3. Request DeviceOrientation (iOS 13+)
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          await DeviceOrientationEvent.requestPermission();
        } catch (e) {
          console.log("Orientation permission denied/failed", e);
        }
      }
    } catch (err) {
      console.warn("Global permissions error", err);
    }

    setIsRequesting(false);
    onComplete();
  };

  return (
    <div className="onboarding-container" style={{ textAlign: 'center', padding: 24, zIndex: 9999 }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse at 50% 30%, rgba(131, 110, 249, 0.15) 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 1 }}>
        <div style={{ fontSize: 64, marginBottom: 24, animation: 'bounce 2s infinite' }}>📸📍</div>
        <h1 className="onboarding-logo" style={{ fontSize: 32 }}>Permissions</h1>
        <p className="onboarding-subtitle" style={{ fontSize: 16, lineHeight: 1.5 }}>
          NadGO needs access to your <b>Camera</b> for catching MonAnimals and <b>Location</b> to find them on the map.
        </p>

        <div className="glass-card" style={{ padding: 20, textAlign: 'left', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ fontSize: 24 }}>📷</div>
            <div>
              <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Camera Access</h4>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>Required for AR and QR Scanning</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 24 }}>🌍</div>
            <div>
              <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Location Services</h4>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>Required to load the real-world Map</p>
            </div>
          </div>
        </div>

        <button 
          className="btn btn-primary btn-lg btn-full" 
          onClick={requestPermissions}
          disabled={isRequesting}
        >
          {isRequesting ? 'Requesting...' : 'Grant Permissions'}
        </button>
        <button 
          className="btn btn-secondary btn-full" 
          onClick={onComplete}
          style={{ marginTop: 12 }}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
