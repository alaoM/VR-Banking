
import React, { useEffect, useRef } from 'react';

const AudioVisuals = () => {
  const canvasRef = useRef(null);
  let audioContext;
  let analyser;
  let animationFrameId;

  useEffect(() => {
    // Create an audio context and analyzer node
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    // Get microphone audio stream
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        visualizeAudio();
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });

    return () => {
      // Clean up resources
      cancelAnimationFrame(animationFrameId);
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  const visualizeAudio = () => {
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const draw = () => {
      animationFrameId = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgb(255, 255, 255)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(31, 38, 146)';

      canvasCtx.beginPath();

      const sliceWidth = (WIDTH * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * HEIGHT) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(WIDTH, HEIGHT / 2);
      canvasCtx.stroke();
    };

    draw();
  };

  return <canvas className='graph' ref={canvasRef} />;
};

export default AudioVisuals;

