import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, AlertCircle, Image as ImageIcon, Check } from 'lucide-react';

/**
 * Componente de Câmera Real do Dispositivo
 * Suporta câmera traseira (environment), câmera frontal, captura de frames e upload de galeria.
 */
export const CameraView = ({ 
  onCapture, 
  children, 
  scanningOverlay = true,
  fallbackVisual = null 
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [hasCamera, setHasCamera] = useState(true);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // environment | user
  const [isReady, setIsReady] = useState(false);

  // Inicializar stream da câmera
  const startCamera = async () => {
    try {
      setCameraError(null);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCamera(false);
        setCameraError('Câmera não suportada neste navegador');
        return;
      }

      const constraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      setHasCamera(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsReady(true);
        };
      }
    } catch (err) {
      console.warn('Não foi possível acessar a câmera:', err);
      setHasCamera(false);
      setCameraError(
        err.name === 'NotAllowedError' 
          ? 'Permissão de câmera negada. Habilite o acesso à câmera nas configurações do seu navegador.' 
          : 'Câmera indisponível ou em uso por outro aplicativo.'
      );
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  // Capturar foto do frame do vídeo
  const capturePhoto = () => {
    if (videoRef.current && isReady) {
      const video = videoRef.current;
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      if (onCapture) onCapture(dataUrl);
      return dataUrl;
    }
    // Fallback se câmera não estiver pronta
    if (onCapture) onCapture(null);
    return null;
  };

  // Alternar entre câmera frontal e traseira
  const toggleFacingMode = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  // Upload pela galeria
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result;
        if (onCapture) onCapture(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
      {/* Hidden elements for capture & upload */}
      <canvas ref={canvasRef} className="hidden" />
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        capture="environment" 
        onChange={handleFileChange} 
        className="hidden" 
      />

      {/* Video Element */}
      {hasCamera && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Fallback quando câmera não está disponível ou negada */}
      {(!hasCamera || cameraError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-gradient-to-b from-gray-950 to-[#0a0e14]">
          {fallbackVisual ? (
            <div className="mb-4">{fallbackVisual}</div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-white/10 text-gray-400 flex items-center justify-center mb-3">
              <Camera className="w-8 h-8" />
            </div>
          )}
          <h4 className="text-sm font-bold text-white mb-1">Modo de Câmera e Scanner</h4>
          <p className="text-xs text-gray-400 max-w-[260px] mb-4">
            {cameraError || 'Você pode usar a câmera do celular ou escolher uma foto da galeria.'}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-xl bg-[#00e676] text-black font-bold text-xs flex items-center gap-1.5 hover:brightness-110 shadow-lg shadow-[#00e676]/20"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Enviar foto da galeria</span>
            </button>
            <button
              onClick={startCamera}
              className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
              title="Tentar abrir câmera novamente"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Laser Scanning Animation Overlay */}
      {scanningOverlay && (
        <div className="absolute left-4 right-4 h-0.5 bg-[#00e676] shadow-[0_0_18px_#00e676] animate-laser z-20 pointer-events-none" />
      )}

      {/* Camera Controls & Reticle pass-through */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 z-20">
        {typeof children === 'function' ? children({ capturePhoto, toggleFacingMode, openGallery: () => fileInputRef.current?.click() }) : children}
      </div>
    </div>
  );
};
