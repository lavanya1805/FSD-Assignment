import React, { useRef, useState, useEffect } from 'react';

const CollaborativeBoard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000'); // Default color is black
  const [lineWidth, setLineWidth] = useState(5); // Default line width
  const [tool, setTool] = useState('pen'); // Default tool is pen
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    setWs(socket);

    socket.onmessage = (message) => {
      try {
        const parsedMessage = JSON.parse(message.data);
        const context = canvasRef.current.getContext('2d');
        context.strokeStyle = parsedMessage.color;
        context.lineWidth = parsedMessage.lineWidth;

        if (parsedMessage.tool === 'eraser') {
          context.globalCompositeOperation = 'destination-out';
        } else {
          context.globalCompositeOperation = 'source-over';
        }

        if (parsedMessage.x !== undefined && parsedMessage.y !== undefined) {
          context.lineTo(parsedMessage.x, parsedMessage.y);
          context.stroke();
          context.beginPath();
          context.moveTo(parsedMessage.x, parsedMessage.y);
        }
      } catch (e) {
        console.error("Error parsing WebSocket message:", e);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineWidth = lineWidth;

    const startDrawing = (e) => {
      setIsDrawing(true);
      draw(e);
    };

    const finishDrawing = () => {
      setIsDrawing(false);
      context.beginPath();
    };

    const draw = (e) => {
      if (!isDrawing) return;
      const x = e.clientX - canvas.offsetLeft;
      const y = e.clientY - canvas.offsetTop;
      context.strokeStyle = color;
      context.lineWidth = lineWidth;

      if (tool === 'eraser') {
        context.globalCompositeOperation = 'destination-out';
      } else {
        context.globalCompositeOperation = 'source-over';
      }

      context.lineTo(x, y);
      context.stroke();
      context.beginPath();
      context.moveTo(x, y);

      if (ws) {
        ws.send(JSON.stringify({ x, y, color, lineWidth, tool }));
      }
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', finishDrawing);
    canvas.addEventListener('mousemove', draw);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mouseup', finishDrawing);
      canvas.removeEventListener('mousemove', draw);
    };
  }, [isDrawing, color, lineWidth, tool, ws]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid black' }}
      ></canvas>
      <div>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="number"
          min="1"
          max="20"
          value={lineWidth}
          onChange={(e) => setLineWidth(parseInt(e.target.value, 10))}
        />
        <button onClick={() => setTool('pen')}>
          <img src="/images/pen.png" alt="Pen" width="30" height="30" />
        </button>
        <button onClick={() => setTool('pencil')}>
          <img src="/images/pencil.png" alt="Pencil" width="30" height="30" />
        </button>
        <button onClick={() => setTool('eraser')}>
          <img src="/images/eraser.png" alt="Eraser" width="30" height="30" />
        </button>
      </div>
    </div>
  );
};

export default CollaborativeBoard;
