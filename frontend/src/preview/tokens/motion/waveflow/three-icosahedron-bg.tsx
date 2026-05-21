import { PreviewFrame } from '../../../_layout';
import * as React from 'react';
import * as THREE from 'three';

export default function ThreeIcosahedronBg() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ position: 'relative', width: '100%', height: 560, overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1530 50%, #0a1822 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 40%, rgba(99,102,241,0.3), transparent 60%), radial-gradient(circle at 70% 70%, rgba(6,182,212,0.2), transparent 60%)' }} />
        <ThreeBackground />
        <div style={{ position: 'absolute', top: 20, left: 24, color: 'rgba(255,255,255,0.7)', zIndex: 10, pointerEvents: 'none' }}>
          <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.4)' }}>TOKEN · MOTION</div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 6, color: '#fff' }}>Three.js 三层 Icosahedron</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4, maxWidth: 360, lineHeight: 1.6 }}>
            indigo 主 1.6 detail=1 / pink 内 0.8 / cyan 外 2.4 + 200 stars + 鼠标 lerp · 移动鼠标可看到旋转跟随
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function ThreeBackground() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 6;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mainGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const mainMat = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.85 });
    const main = new THREE.Mesh(mainGeo, mainMat);
    scene.add(main);

    const innerGeo = new THREE.IcosahedronGeometry(0.8, 0);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0xec4899, wireframe: true, transparent: true, opacity: 0.5 });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    scene.add(inner);

    const outerGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const outerMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.25 });
    const outer = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outer);

    const starGeo = new THREE.BufferGeometry();
    const starPos: number[] = [];
    for (let i = 0; i < 200; i++) starPos.push((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30);
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.03, transparent: true, opacity: 0.6 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    let targetRotX = 0; let targetRotY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetRotY = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6;
      targetRotX = ((e.clientY - rect.top) / rect.height - 0.5) * 0.6;
    };
    container.addEventListener('mousemove', handleMouseMove);

    let rafId = 0;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      main.rotation.x += 0.003; main.rotation.y += 0.005;
      inner.rotation.x -= 0.006; inner.rotation.y -= 0.008;
      outer.rotation.x += 0.001; outer.rotation.y += 0.002;
      stars.rotation.y += 0.0003;
      main.rotation.y += (targetRotY - main.rotation.y * 0.001) * 0.001;
      main.rotation.x += (targetRotX - main.rotation.x * 0.001) * 0.001;
      renderer.render(scene, camera);
    };
    tick();

    const handleResize = () => {
      if (!container || container.clientWidth === 0) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      mainGeo.dispose(); mainMat.dispose();
      innerGeo.dispose(); innerMat.dispose();
      outerGeo.dispose(); outerMat.dispose();
      starGeo.dispose(); starMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />;
}
