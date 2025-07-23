import React, { useState, useRef, useCallback, useEffect } from 'react';
import { mergeStyles } from '@fluentui/react';

interface ResizableSplitProps {
  children: React.ReactNode;
  initialLeftWidth?: number; // Porcentaje inicial (0-100)
  minLeftWidth?: number; // Porcentaje mínimo para el panel izquierdo
  maxLeftWidth?: number; // Porcentaje máximo para el panel izquierdo
  onResize?: (leftWidth: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

interface ResizablePaneProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const ResizableSplit: React.FC<ResizableSplitProps> = ({
  children,
  initialLeftWidth = 60,
  minLeftWidth = 20,
  maxLeftWidth = 80,
  onResize,
  className,
  style
}) => {
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const splitContainerClass = mergeStyles({
    display: 'flex',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',

    position: 'relative',
    userSelect: isDragging ? 'none' : 'auto',
    '@media (max-width: 768px)': {
      flexDirection: 'column'
    }
  }, className);

  const leftPaneClass = mergeStyles({
    width: `${leftWidth}%`,
    height: '100%',

    overflow: 'hidden',
    transition: isDragging ? 'none' : 'width 0.1s ease',
    '@media (max-width: 768px)': {
      width: '100%',
      height: '40%'
    }
  });

  const rightPaneClass = mergeStyles({
    width: `${100 - leftWidth}%`,
    height: '100%',
    overflow: 'hidden',
    transition: isDragging ? 'none' : 'width 0.1s ease',
    '@media (max-width: 768px)': {
      width: '100%',
      height: '60%'
    }
  });

  const resizerClass = mergeStyles({
    width: '4px',
    height: '100%',
    
    backgroundColor: isDragging ? '#0078d4' : '#e1e1e1',
    cursor: 'col-resize',
    position: 'relative',
    transition: isDragging ? 'none' : 'background-color 0.2s ease',
    zIndex: 10,
    '&:hover': {
      backgroundColor: '#0078d4'
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      left: '-2px',
      right: '-2px',
         
      top: 0,
      bottom: 0,
      cursor: 'col-resize'
    },
    '@media (max-width: 768px)': {
      display: 'none'
    }
  });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    // Aplicar límites
    const clampedWidth = Math.max(minLeftWidth, Math.min(maxLeftWidth, newLeftWidth));
    
    setLeftWidth(clampedWidth);
    
    if (onResize) {
      onResize(clampedWidth);
    }
  }, [isDragging, minLeftWidth, maxLeftWidth, onResize]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'auto';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const childrenArray = React.Children.toArray(children);

  return (
    <div 
      ref={containerRef}
      className={splitContainerClass} 
      style={style}
    >
      {/* Panel Izquierdo */}
      <div className={leftPaneClass}>
        {childrenArray[0]}
      </div>
      
      {/* Redimensionador */}
      <div 
        className={resizerClass}
        onMouseDown={handleMouseDown}
      >
        {/* Indicador visual opcional */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '2px',
          height: '20px',
          backgroundColor: isDragging ? '#ffffff' : 'rgba(255,255,255,0.5)',
          borderRadius: '1px'
        }} />
      </div>
      
      {/* Panel Derecho */}
      <div className={rightPaneClass}>
        {childrenArray[1]}
      </div>
    </div>
  );
};

export const ResizablePane: React.FC<ResizablePaneProps> = ({ 
  children, 
  className,
  style 
}) => {
  const paneClass = mergeStyles({
    width: '100%',
    height: '100%',
    overflow: 'auto',
    position: 'relative'
  }, className);

  return (
    <div className={paneClass} style={style}>
      {children}
    </div>
  );
};