import React from 'react';

interface InventiveLogoProps {
  className?: string;
  size?: number | string;
  opacity?: number;
  textColor?: string;
  accentColor?: string;
}

export default function InventiveLogo({
  className = '',
  size = '100%',
  opacity = 1,
  textColor = '#76c143',
  accentColor = '#76c143',
}: InventiveLogoProps) {
  return (
    <svg
      className={`select-none ${className}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <defs>
        {/* Invisible paths for text wrapping */}
        {/* Top text path: Left-to-Right Clockwise Arc */}
        <path
          id="topTextPath"
          d="M 26 100 A 74 74 0 0 1 174 100"
          fill="none"
        />
        
        {/* Bottom text path: Left-to-Right Counter-Clockwise Arc to keep text upright */}
        <path
          id="bottomTextPath"
          d="M 22 100 A 78 78 0 0 0 178 100"
          fill="none"
        />

        {/* Drop shadow for 3D elements */}
        <filter id="partShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Main Green Circular Emblem */}
      <circle
        cx="100"
        cy="100"
        r="54"
        fill={accentColor}
        className="transition-transform duration-700 ease-out"
      />

      {/* 3D CAD Machined / Metrology Part in Center (White) */}
      <g filter="url(#partShadow)" transform="translate(100, 100) rotate(-28)">
        {/* Step 1: Largest cylinder (left) */}
        {/* Cylinder Body */}
        <path
          d="M -34 -18 L -14 -18 A 6 18 0 0 1 -14 18 L -34 18 A 6 18 0 0 1 -34 -18"
          fill="#ffffff"
        />
        {/* Left circular face */}
        <ellipse
          cx="-34"
          cy="0"
          rx="6"
          ry="18"
          fill="#f1f5f9"
        />
        {/* Shading division lines */}
        <path
          d="M -34 0 L -14 0"
          stroke="#e2e8f0"
          strokeWidth="0.5"
          strokeDasharray="1 1"
        />

        {/* Step 2: Medium cylinder (middle) */}
        {/* Cylinder Body */}
        <path
          d="M -14 -12 L 8 -12 A 4 12 0 0 1 8 12 L -14 12 A 4 12 0 0 1 -14 -12"
          fill="#ffffff"
        />
        {/* Left face overlay */}
        <ellipse
          cx="-14"
          cy="0"
          rx="4"
          ry="12"
          fill="#f8fafc"
        />
        {/* Right face overlay (creates 3D division) */}
        <ellipse
          cx="8"
          cy="0"
          rx="4"
          ry="12"
          fill="#ffffff"
          stroke="#76c143"
          strokeWidth="0.5"
          strokeOpacity="0.1"
        />

        {/* Step 3: Smallest cylinder (right) */}
        {/* Cylinder Body */}
        <path
          d="M 8 -7 L 28 -7 A 2.5 7 0 0 1 28 7 L 8 7 A 2.5 7 0 0 1 8 -7"
          fill="#ffffff"
        />
        {/* Left face overlay */}
        <ellipse
          cx="8"
          cy="0"
          rx="2.5"
          ry="7"
          fill="#f8fafc"
        />
        {/* Right face ellipse */}
        <ellipse
          cx="28"
          cy="0"
          rx="2.5"
          ry="7"
          fill="#f1f5f9"
        />

        {/* Lathe Cutting Tool / CMM Probe Stylus tip touching the small cylinder */}
        <path
          d="M 12 6 L 24 6 L 16 26 L 8 26 Z"
          fill="#ffffff"
        />
        {/* Slanted cutting tip highlight */}
        <path
          d="M 12 6 L 16 12 L 8 26 L 12 6"
          fill="#cbd5e1"
          opacity="0.5"
        />
      </g>

      {/* Decorative Dots on left & right sides separating the texts */}
      <circle cx="21" cy="100" r="3" fill={textColor} />
      <circle cx="179" cy="100" r="3" fill={textColor} />

      {/* Curved Text Wrap - Top: "Inventive3 Tech" */}
      <text
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="14.5"
        fontWeight="bold"
        fill={textColor}
        letterSpacing="0.08em"
      >
        <textPath
          href="#topTextPath"
          startOffset="50%"
          textAnchor="middle"
        >
          Inventive3 Tech
        </textPath>
      </text>

      {/* Curved Text Wrap - Bottom: "Innovative-ingenious-inspire" */}
      <text
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="9.5"
        fontWeight="600"
        fill={textColor}
        letterSpacing="0.12em"
        wordSpacing="0.05em"
      >
        {/* By using dominant-baseline="hanging" on a bottom-ward curve (0 0 0 flag), the text sits perfectly upright outside the circle! */}
        <textPath
          href="#bottomTextPath"
          startOffset="50%"
          textAnchor="middle"
          dominantBaseline="hanging"
        >
          Innovative-ingenious-inspire
        </textPath>
      </text>
    </svg>
  );
}
