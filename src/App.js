import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, Plus, Trash2, Users } from 'lucide-react';

const RugbyPlayBuilder = () => {
  const [players, setPlayers] = useState([]);
  const [keyframes, setKeyframes] = useState([{ id: 0, name: 'Start', positions: [] }]);
  const [currentKeyframe, setCurrentKeyframe] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [draggingPlayer, setDraggingPlayer] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [speedMultiplier, setSpeedMultiplier] = useState(1); // 0.5x to 3x speed
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 800, height: 500 });
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const speedMultiplierRef = useRef(1);
  const animationStartTimeRef = useRef(null);
  const progressAtSpeedChangeRef = useRef(0);
  const lastSpeedRef = useRef(1);
  const speedChangeTimeRef = useRef(null);

  const aspectRatio = 1.6; // 16:10 aspect ratio (800:500)
  const baseWidth = 800;
  const baseHeight = 500;
  const prevDimensionsRef = useRef({ width: baseWidth, height: baseHeight });
  
  // Calculate responsive canvas size
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Max width of 800px, but scale down for smaller screens
        const width = Math.min(containerWidth - 32, baseWidth); // 32px for padding
        const height = width / aspectRatio;
        
        const newDimensions = { width, height };
        const prevDimensions = prevDimensionsRef.current;
        
        // If dimensions changed and we have players, scale their positions
        if (players.length > 0 && (prevDimensions.width !== width || prevDimensions.height !== height)) {
          const scaleX = width / prevDimensions.width;
          const scaleY = height / prevDimensions.height;
          
          // Scale all player positions in all keyframes
          setKeyframes(prevKeyframes => 
            prevKeyframes.map(kf => ({
              ...kf,
              positions: kf.positions.map(p => ({
                ...p,
                x: p.x * scaleX,
                y: p.y * scaleY
              }))
            }))
          );
        }
        
        prevDimensionsRef.current = newDimensions;
        setCanvasDimensions(newDimensions);
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [players.length]);

  const fieldWidth = canvasDimensions.width;
  const fieldHeight = canvasDimensions.height;
  
  // Scale player radius based on canvas size (larger on smaller screens for touch)
  const playerRadius = Math.max(12, Math.min(15, fieldWidth / 53));

  

  const getPlayerPosition = useCallback((player, keyframeIndex, progress = 0) => {
    // Safety check
    if (!keyframes[keyframeIndex]) {
      return {
        id: player.id,
        team: player.team,
        number: player.number,
        x: fieldWidth / 2,
        y: fieldHeight / 2,
        hasBall: false
      };
    }

    const keyframe = keyframes[keyframeIndex];
    const playerPos = keyframe.positions.find(p => p.id === player.id);
    
    // If player not found in keyframe, return a default position
    if (!playerPos) {
      return {
        id: player.id,
        team: player.team,
        number: player.number,
        x: fieldWidth / 2,
        y: fieldHeight / 2,
        hasBall: false
      };
    }
    
    if (progress === 0 || keyframeIndex === keyframes.length - 1) {
      return { ...player, ...playerPos };
    }

    const nextKeyframe = keyframes[keyframeIndex + 1];
    if (!nextKeyframe) {
      return { ...player, ...playerPos };
    }

    const nextPos = nextKeyframe.positions.find(p => p.id === player.id);
    
    if (!nextPos) return { ...player, ...playerPos };

    return {
      ...player,
      ...playerPos,
      x: playerPos.x + (nextPos.x - playerPos.x) * progress,
      y: playerPos.y + (nextPos.y - playerPos.y) * progress,
      hasBall: progress < 0.5 ? playerPos.hasBall : nextPos.hasBall
    };
  }, [keyframes, fieldWidth, fieldHeight]);

  const drawField = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = fieldWidth * dpr;
    canvas.height = fieldHeight * dpr;
    canvas.style.width = `${fieldWidth}px`;
    canvas.style.height = `${fieldHeight}px`;
    ctx.scale(dpr, dpr);

    // Field background
    ctx.fillStyle = '#2d5016';
    ctx.fillRect(0, 0, fieldWidth, fieldHeight);

    // Field lines
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;

    // Border
    ctx.strokeRect(10, 10, fieldWidth - 20, fieldHeight - 20);

    // Center line
    ctx.beginPath();
    ctx.moveTo(fieldWidth / 2, 10);
    ctx.lineTo(fieldWidth / 2, fieldHeight - 10);
    ctx.stroke();

    // 22m lines
    ctx.beginPath();
    ctx.moveTo(fieldWidth * 0.25, 10);
    ctx.lineTo(fieldWidth * 0.25, fieldHeight - 10);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(fieldWidth * 0.75, 10);
    ctx.lineTo(fieldWidth * 0.75, fieldHeight - 10);
    ctx.stroke();

    // 10m lines (dashed)
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(fieldWidth * 0.375, 10);
    ctx.lineTo(fieldWidth * 0.375, fieldHeight - 10);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(fieldWidth * 0.625, 10);
    ctx.lineTo(fieldWidth * 0.625, fieldHeight - 10);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw players
    players.forEach(player => {
      const pos = getPlayerPosition(player, currentKeyframe, playbackProgress);
      
      // Player circle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, playerRadius, 0, Math.PI * 2);
      ctx.fillStyle = player.team === 'attack' ? '#ef4444' : '#3b82f6';
      ctx.fill();
      
      // Selection ring
      if (selectedPlayer === player.id) {
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Player number
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(player.number, pos.x, pos.y);
    });

    // Draw ball separately so it can animate between players
    if (keyframes[currentKeyframe] && keyframes[currentKeyframe].positions) {
      const currentKf = keyframes[currentKeyframe];
      const playerWithBall = currentKf.positions.find(p => p.hasBall);
      
      if (playerWithBall && playbackProgress === 0) {
        // No animation, just show ball with current player
        const player = players.find(p => p.id === playerWithBall.id);
        if (player) {
          const pos = getPlayerPosition(player, currentKeyframe, 0);
          
          ctx.beginPath();
          ctx.arc(pos.x, pos.y - playerRadius - 8, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#fbbf24';
          ctx.fill();
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      } else if (playbackProgress > 0 && currentKeyframe < keyframes.length - 1) {
        // Animation in progress - interpolate ball position
        const nextKf = keyframes[currentKeyframe + 1];
        if (!nextKf || !nextKf.positions) return;

        const currentBallPlayer = currentKf.positions.find(p => p.hasBall);
        const nextBallPlayer = nextKf.positions.find(p => p.hasBall);
        
        if (currentBallPlayer && nextBallPlayer) {
          const currentPlayer = players.find(p => p.id === currentBallPlayer.id);
          const nextPlayer = players.find(p => p.id === nextBallPlayer.id);
          
          if (currentPlayer && nextPlayer) {
            const currentPos = getPlayerPosition(currentPlayer, currentKeyframe, 0);
            const nextPos = getPlayerPosition(nextPlayer, currentKeyframe + 1, 0);
            
            // Interpolate ball position
            const ballX = currentPos.x + (nextPos.x - currentPos.x) * playbackProgress;
            const ballY = currentPos.y + (nextPos.y - currentPos.y) * playbackProgress - playerRadius - 8;
            
            ctx.beginPath();
            ctx.arc(ballX, ballY, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#fbbf24';
            ctx.fill();
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        } else if (currentBallPlayer) {
          // Ball stays with current player
          const player = players.find(p => p.id === currentBallPlayer.id);
          if (player) {
            const pos = getPlayerPosition(player, currentKeyframe, playbackProgress);
            
            ctx.beginPath();
            ctx.arc(pos.x, pos.y - playerRadius - 8, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#fbbf24';
            ctx.fill();
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }
  }, [players, keyframes, currentKeyframe, playbackProgress, selectedPlayer, playerRadius, fieldWidth, fieldHeight, getPlayerPosition]);

  useEffect(() => {
    drawField();
  }, [drawField]);

  const addPlayer = (team) => {
    const newPlayer = {
      id: Date.now(),
      team,
      number: players.filter(p => p.team === team).length + 1,
      hasBall: false
    };
    
    const newPlayerWithPosition = {
      ...newPlayer,
      x: team === 'attack' ? fieldWidth * 0.3 : fieldWidth * 0.7,
      y: fieldHeight / 2
    };
    
    setPlayers([...players, newPlayer]);
    
    // Update all keyframes with new player position
    setKeyframes(keyframes.map(kf => ({
      ...kf,
      positions: [...kf.positions, { ...newPlayerWithPosition }]
    })));
  };

  const removePlayer = (playerId) => {
    // Stop animation if playing
    if (isPlaying) {
      stopAnimation();
    }
    
    setPlayers(players.filter(p => p.id !== playerId));
    setKeyframes(keyframes.map(kf => ({
      ...kf,
      positions: kf.positions.filter(p => p.id !== playerId)
    })));
    
    if (selectedPlayer === playerId) {
      setSelectedPlayer(null);
    }
  };

  const toggleBall = (playerId) => {
    const currentKf = keyframes[currentKeyframe];
    const updatedPositions = currentKf.positions.map(p => ({
      ...p,
      hasBall: p.id === playerId ? !p.hasBall : false
    }));
    
    const updatedKeyframes = [...keyframes];
    updatedKeyframes[currentKeyframe] = {
      ...currentKf,
      positions: updatedPositions
    };
    
    setKeyframes(updatedKeyframes);
  };

  const addKeyframe = () => {
    const lastKeyframe = keyframes[keyframes.length - 1];
    const newKeyframe = {
      id: Date.now(),
      name: `Frame ${keyframes.length}`,
      positions: lastKeyframe.positions.map(p => ({ ...p }))
    };
    
    setKeyframes([...keyframes, newKeyframe]);
    setCurrentKeyframe(keyframes.length);
  };

  const deleteKeyframe = (index) => {
    if (keyframes.length <= 1) return;
    
    // Stop animation if playing
    if (isPlaying) {
      stopAnimation();
    }
    
    const updatedKeyframes = keyframes.filter((_, i) => i !== index);
    setKeyframes(updatedKeyframes);
    
    // Adjust current keyframe if necessary
    if (currentKeyframe >= updatedKeyframes.length) {
      setCurrentKeyframe(updatedKeyframes.length - 1);
    } else if (currentKeyframe === index && index > 0) {
      setCurrentKeyframe(index - 1);
    }
    
    setPlaybackProgress(0);
  };

  const handleCanvasMouseDown = (e) => {
    if (isPlaying) return; // Don't allow interaction during animation
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedPlayer = players.find(player => {
      const pos = getPlayerPosition(player, currentKeyframe);
      const distance = Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2);
      return distance <= playerRadius;
    });

    if (clickedPlayer) {
      setDraggingPlayer(clickedPlayer.id);
      setSelectedPlayer(clickedPlayer.id);
    } else {
      setSelectedPlayer(null);
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (!draggingPlayer) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(playerRadius, Math.min(fieldWidth - playerRadius, e.clientX - rect.left));
    const y = Math.max(playerRadius, Math.min(fieldHeight - playerRadius, e.clientY - rect.top));

    setKeyframes(prevKeyframes => {
      const currentKf = prevKeyframes[currentKeyframe];
      const updatedPositions = currentKf.positions.map(p =>
        p.id === draggingPlayer ? { ...p, x, y } : p
      );

      const updatedKeyframes = [...prevKeyframes];
      updatedKeyframes[currentKeyframe] = {
        ...currentKf,
        positions: updatedPositions
      };

      return updatedKeyframes;
    });
  };

  const handleCanvasMouseUp = () => {
    setDraggingPlayer(null);
  };

  const handleCanvasTouchStart = (e) => {
    if (isPlaying) return; // Don't allow interaction during animation
    
    e.preventDefault();
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const clickedPlayer = players.find(player => {
      const pos = getPlayerPosition(player, currentKeyframe);
      const distance = Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2);
      return distance <= playerRadius;
    });

    if (clickedPlayer) {
      setDraggingPlayer(clickedPlayer.id);
      setSelectedPlayer(clickedPlayer.id);
    } else {
      setSelectedPlayer(null);
    }
  };

  const handleCanvasTouchMove = (e) => {
    e.preventDefault();
    if (!draggingPlayer) return;

    const touch = e.touches[0];
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(playerRadius, Math.min(fieldWidth - playerRadius, touch.clientX - rect.left));
    const y = Math.max(playerRadius, Math.min(fieldHeight - playerRadius, touch.clientY - rect.top));

    setKeyframes(prevKeyframes => {
      const currentKf = prevKeyframes[currentKeyframe];
      const updatedPositions = currentKf.positions.map(p =>
        p.id === draggingPlayer ? { ...p, x, y } : p
      );

      const updatedKeyframes = [...prevKeyframes];
      updatedKeyframes[currentKeyframe] = {
        ...currentKf,
        positions: updatedPositions
      };

      return updatedKeyframes;
    });
  };

  const playAnimation = () => {
    if (keyframes.length <= 1) {
      return; // Can't animate with only one keyframe
    }

    setIsPlaying(true);
    setCurrentKeyframe(0);
    setPlaybackProgress(0);
    
    // Reset all animation refs
    const startTime = performance.now();
    animationStartTimeRef.current = startTime;
    progressAtSpeedChangeRef.current = 0;
    lastSpeedRef.current = speedMultiplierRef.current;
    speedChangeTimeRef.current = startTime;

    const baseFrameDuration = 2000; // 2 seconds per frame at 1x speed

    const animate = (currentTime) => {
      const currentSpeed = speedMultiplierRef.current;
      
      // If speed changed, recalculate our position
      if (currentSpeed !== lastSpeedRef.current) {
        const timeSinceLastChange = currentTime - speedChangeTimeRef.current;
        const lastFrameDuration = baseFrameDuration / lastSpeedRef.current;
        const lastTotalDuration = (keyframes.length - 1) * lastFrameDuration;
        const progressDelta = timeSinceLastChange / lastTotalDuration;
        
        progressAtSpeedChangeRef.current = progressAtSpeedChangeRef.current + progressDelta;
        speedChangeTimeRef.current = currentTime;
        lastSpeedRef.current = currentSpeed;
      }
      
      // Calculate current progress based on time since last speed change
      const timeSinceSpeedChange = currentTime - speedChangeTimeRef.current;
      const frameDuration = baseFrameDuration / currentSpeed;
      const totalDuration = (keyframes.length - 1) * frameDuration;
      const progressDelta = timeSinceSpeedChange / totalDuration;
      const currentProgress = progressAtSpeedChangeRef.current + progressDelta;
      
      if (currentProgress >= 1) {
        setIsPlaying(false);
        setCurrentKeyframe(keyframes.length - 1);
        setPlaybackProgress(0);
        
        // Clean up animation ref
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        return;
      }

      const currentFrame = Math.floor(currentProgress * (keyframes.length - 1));
      const frameProgress = (currentProgress * (keyframes.length - 1)) - currentFrame;

      setCurrentKeyframe(currentFrame);
      setPlaybackProgress(frameProgress);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const stopAnimation = () => {
    setIsPlaying(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const resetAnimation = () => {
    stopAnimation();
    setCurrentKeyframe(0);
    setPlaybackProgress(0);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Rugby Play Builder</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Canvas */}
          <div className="lg:col-span-3">
            <div ref={containerRef} className="bg-gray-800 rounded-lg p-4 shadow-lg">
              <canvas
                ref={canvasRef}
                className="border-2 border-gray-700 rounded cursor-pointer touch-none mx-auto block"
                style={{ maxWidth: '100%', height: 'auto' }}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
                onTouchStart={handleCanvasTouchStart}
                onTouchMove={handleCanvasTouchMove}
                onTouchEnd={handleCanvasMouseUp}
              />
              
              {/* Playback Controls */}
              <div className="mt-4 flex items-center justify-center gap-3 sm:gap-4">
                <button
                  onClick={resetAnimation}
                  className="p-2 sm:p-2 bg-gray-700 hover:bg-gray-600 rounded transition touch-manipulation"
                  title="Reset"
                >
                  <SkipBack size={20} />
                </button>
                
                {!isPlaying ? (
                  <button
                    onClick={playAnimation}
                    className="p-3 sm:p-3 bg-green-600 hover:bg-green-500 rounded-full transition touch-manipulation"
                    disabled={keyframes.length <= 1}
                    title="Play"
                  >
                    <Play size={24} />
                  </button>
                ) : (
                  <button
                    onClick={stopAnimation}
                    className="p-3 sm:p-3 bg-red-600 hover:bg-red-500 rounded-full transition touch-manipulation"
                    title="Pause"
                  >
                    <Pause size={24} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-4">
            {/* Animation Speed */}
            <div className="bg-gray-800 rounded-lg p-3 sm:p-4 shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold mb-3">Animation Speed</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="50"
                  max="300"
                  step="10"
                  value={speedMultiplier * 100}
                  onChange={(e) => {
                    const newSpeed = Number(e.target.value) / 100;
                    setSpeedMultiplier(newSpeed);
                    speedMultiplierRef.current = newSpeed;
                  }}
                  className="w-full touch-manipulation"
                />
                <div className="flex justify-between text-xs sm:text-sm text-gray-400">
                  <span>0.5x</span>
                  <span className="text-white font-semibold text-sm sm:text-base">{speedMultiplier.toFixed(1)}x</span>
                  <span>3x</span>
                </div>
              </div>
            </div>

            {/* Add Players */}
            <div className="bg-gray-800 rounded-lg p-3 sm:p-4 shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2">
                <Users size={18} className="sm:w-5 sm:h-5" />
                Add Players
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => addPlayer('attack')}
                  disabled={isPlaying}
                  className={`w-full p-2 sm:p-2.5 rounded transition text-sm sm:text-base touch-manipulation ${
                    isPlaying 
                      ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                      : 'bg-red-600 hover:bg-red-500'
                  }`}
                >
                  + Attacker
                </button>
                <button
                  onClick={() => addPlayer('defense')}
                  disabled={isPlaying}
                  className={`w-full p-2 sm:p-2.5 rounded transition text-sm sm:text-base touch-manipulation ${
                    isPlaying 
                      ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                      : 'bg-blue-600 hover:bg-blue-500'
                  }`}
                >
                  + Defender
                </button>
              </div>
            </div>

            {/* Players List */}
            {selectedPlayer && (
              <div className="bg-gray-800 rounded-lg p-3 sm:p-4 shadow-lg">
                <h3 className="text-base sm:text-lg font-semibold mb-3">Selected Player</h3>
                {players.filter(p => p.id === selectedPlayer).map(player => {
                  const pos = getPlayerPosition(player, currentKeyframe);
                  return (
                    <div key={player.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm sm:text-base ${player.team === 'attack' ? 'text-red-400' : 'text-blue-400'}`}>
                          {player.team === 'attack' ? 'Attacker' : 'Defender'} #{player.number}
                        </span>
                        <button
                          onClick={() => removePlayer(player.id)}
                          disabled={isPlaying}
                          className={`p-1.5 sm:p-2 rounded transition touch-manipulation ${
                            isPlaying 
                              ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                              : 'bg-red-600 hover:bg-red-500'
                          }`}
                          title="Remove"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => toggleBall(player.id)}
                        disabled={isPlaying}
                        className={`w-full p-2 sm:p-2.5 rounded transition text-sm sm:text-base touch-manipulation ${
                          isPlaying 
                            ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                            : pos.hasBall 
                              ? 'bg-yellow-600 hover:bg-yellow-500' 
                              : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                      >
                        {pos.hasBall ? 'Has Ball ⚫' : 'Give Ball'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Keyframes */}
            <div className="bg-gray-800 rounded-lg p-3 sm:p-4 shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold mb-3">Keyframes</h3>
              <button
                onClick={addKeyframe}
                disabled={isPlaying}
                className={`w-full mb-2 p-2 rounded transition flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation ${
                  isPlaying 
                    ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                    : 'bg-green-600 hover:bg-green-500'
                }`}
              >
                <Plus size={16} />
                Add Keyframe
              </button>
              <div className="space-y-2 max-h-48 sm:max-h-60 overflow-y-auto">
                {[...keyframes].reverse().map((kf, reverseIndex) => {
                  const index = keyframes.length - 1 - reverseIndex;
                  return (
                    <div
                      key={kf.id}
                      className={`flex items-center justify-between p-2.5 sm:p-2 rounded transition touch-manipulation ${
                        currentKeyframe === index 
                          ? 'bg-green-700' 
                          : isPlaying 
                            ? 'bg-gray-700 cursor-not-allowed opacity-50' 
                            : 'bg-gray-700 hover:bg-gray-600 cursor-pointer'
                      }`}
                      onClick={() => {
                        if (!isPlaying) {
                          setCurrentKeyframe(index);
                          setPlaybackProgress(0);
                        }
                      }}
                    >
                      <span className="text-xs sm:text-sm">{kf.name}</span>
                      {keyframes.length > 1 && !isPlaying && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteKeyframe(index);
                          }}
                          className="p-1.5 hover:bg-red-600 rounded transition touch-manipulation"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 sm:mt-6 bg-gray-800 rounded-lg p-3 sm:p-4 shadow-lg">
          <h3 className="text-base sm:text-lg font-semibold mb-2">How to Use:</h3>
          <ul className="text-xs sm:text-sm text-gray-300 space-y-1">
            <li>• Add attackers (red) and defenders (blue) using the buttons</li>
            <li>• Tap/click a player to select it, then drag to position</li>
            <li>• Use "Give Ball" to assign ball possession to selected player</li>
            <li>• Add keyframes to create animation sequences</li>
            <li>• Position players differently in each keyframe to create movement</li>
            <li>• Adjust speed slider and press Play to watch your play animation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RugbyPlayBuilder;
