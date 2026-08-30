# RAMTSR - Reliability-Aware Multi-Temporal Super Resolution (Dashboard)

This repository contains the high-performance WebGL & React frontend for the **RAMTSR** project, built for the Smart India Hackathon (SIH 2026).

## Overview

RAMTSR enhances 10m Sentinel-2 satellite imagery to 2.5m using Deep Learning. This website serves as the interactive dashboard and interactive presentation layer to showcase the AI's capabilities, including:
- Interactive 3D WebGL Earth (Three.js)
- Before/After interactive comparison sliders
- Radiometric Metric Dashboards (NDVI, SAM, PSNR)
- Interactive "Reliability Heatmap" visualization

## Tech Stack
- **React + Vite**
- **Three.js** (@react-three/fiber, @react-three/drei)
- **GSAP & Framer Motion** (Scroll animations)
- **Tailwind CSS**

## Quick Start
\\\ash
npm install
npm run dev
\\\

## Backend Logic
The Python/PyTorch codebase and the Deep Learning context exist in the primary backend repository. This repository strictly isolates the UI and presentation layer for clean, instant Vercel deployments.
