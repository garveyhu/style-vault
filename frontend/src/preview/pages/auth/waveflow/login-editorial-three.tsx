import { PreviewFrame } from '../../../_layout';
import { Eye, ArrowRight } from 'lucide-react';
import * as React from 'react';
import * as THREE from 'three';

export default function LoginEditorialThree() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ display: 'flex', minHeight: 720, fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* LEFT */}
        <div style={{ position: 'relative', flex: 1, padding: '0 64px 40px', overflow: 'hidden' }}>
          <LeftDecor />

          <div style={{ position: 'relative', maxWidth: 440, paddingTop: '14vh', zIndex: 10 }}>
            <WaveflowLogo />
            <div style={{ marginTop: 20, fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', color: '#1c1917' }}>Waveflow<span style={{ color: '#a8a29e' }}>.</span></div>
            <div style={{ marginTop: 6, fontSize: 13.5, color: '#78716c' }}>数据同步与任务调度平台</div>

            <form style={{ marginTop: 40 }}>
              <Field label="用户名"><input style={u} placeholder="请输入用户名" /></Field>
              <Field label="密码">
                <div style={{ position: 'relative' }}>
                  <input type="password" style={{ ...u, paddingRight: 32 }} placeholder="请输入密码" />
                  <Eye size={14} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: '#a8a29e' }} />
                </div>
              </Field>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#57534e', marginTop: 24 }}>
                <span style={{ width: 16, height: 16, borderRadius: 4, background: '#fff', border: '1px solid #d6d3d1' }} /> 记住我
              </label>
              <button style={{ marginTop: 24, height: 44, minWidth: 140, padding: '0 24px', borderRadius: 9999, background: '#1c1917', color: '#fff', fontSize: 13.5, letterSpacing: '0.025em', fontWeight: 500, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', border: 'none' }}>
                继续 <ArrowRight size={14} />
              </button>
            </form>
          </div>
          <div style={{ position: 'absolute', bottom: 40, left: 64, fontSize: 12, color: '#a8a29e', zIndex: 10 }}>© 2026 Waveflow</div>
        </div>

        {/* RIGHT */}
        <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1530 50%, #0a1822 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 40%, rgba(99,102,241,0.3), transparent 60%), radial-gradient(circle at 70% 70%, rgba(6,182,212,0.2), transparent 60%)' }} />
          <ThreeBackground />
          <div style={{ position: 'absolute', insetInline: 0, bottom: 0, padding: 40, color: 'rgba(255,255,255,0.85)', pointerEvents: 'none', zIndex: 10 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.4em', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>实时编排 · 数据中枢</div>
            <h2 style={{ fontSize: 30, fontWeight: 300, letterSpacing: '-0.01em', margin: 0 }}>
              让数据，
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}>自如流转。</span>
            </h2>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

const u: React.CSSProperties = { width: '100%', background: 'transparent', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '1px solid #d6d3d1', padding: '10px 0', fontSize: 15, color: '#1c1917', outline: 'none' };

function Field({ label, children }: any) {
  return <div style={{ marginBottom: 24 }}><div style={{ fontSize: 12, fontWeight: 500, color: '#78716c', marginBottom: 4 }}>{label}</div>{children}</div>;
}

function WaveflowLogo() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" style={{ borderRadius: 16, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)', background: '#fff' }}>
      <defs>
        <linearGradient id="wave-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <path d="M 8 32 Q 16 22, 24 32 T 40 32 T 56 32" stroke="url(#wave-grad)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M 4 36 Q 12 26, 20 36 T 36 36 T 52 36" stroke="url(#wave-grad)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

function LeftDecor() {
  const layerRef = React.useRef<HTMLDivElement>(null);
  const glowRef = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const geoRefs = [React.useRef<HTMLDivElement>(null), React.useRef<HTMLDivElement>(null), React.useRef<HTMLDivElement>(null), React.useRef<HTMLDivElement>(null)];

  React.useEffect(() => {
    const layer = layerRef.current;
    const parent = layer?.parentElement;
    if (!layer || !parent) return;
    const mouse = { x: -1000, y: -1000, active: false };

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
      if (glowRef.current) { glowRef.current.style.left = mouse.x + 'px'; glowRef.current.style.top = mouse.y + 'px'; glowRef.current.style.opacity = '1'; }
    };
    const onLeave = () => { mouse.x = -1000; mouse.y = -1000; mouse.active = false; if (glowRef.current) glowRef.current.style.opacity = '0'; };
    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);

    let rafId = 0;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const svg = svgRef.current;
      if (!svg) return;
      const rect = parent.getBoundingClientRect();
      if (!rect.width) return;
      svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
      const points: { cx: number; cy: number }[] = [];
      for (const g of geoRefs) {
        if (!g.current) continue;
        const r = g.current.getBoundingClientRect();
        points.push({ cx: r.left + r.width / 2 - rect.left, cy: r.top + r.height / 2 - rect.top });
      }
      const lines: string[] = [];
      const MAX_DIST = 240;
      if (mouse.active) {
        const sorted = points.map(p => ({ ...p, d: Math.hypot(mouse.x - p.cx, mouse.y - p.cy) })).sort((a, b) => a.d - b.d);
        for (let i = 0; i < Math.min(2, sorted.length); i++) {
          const p = sorted[i];
          if (p.d < MAX_DIST) lines.push(`<line x1="${mouse.x.toFixed(1)}" y1="${mouse.y.toFixed(1)}" x2="${p.cx.toFixed(1)}" y2="${p.cy.toFixed(1)}" stroke="#6366f1" stroke-width="0.8" opacity="${((1 - p.d / MAX_DIST) * 0.55).toFixed(3)}" />`);
        }
      }
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const d = Math.hypot(points[i].cx - points[j].cx, points[i].cy - points[j].cy);
          if (d < MAX_DIST) lines.push(`<line x1="${points[i].cx.toFixed(1)}" y1="${points[i].cy.toFixed(1)}" x2="${points[j].cx.toFixed(1)}" y2="${points[j].cy.toFixed(1)}" stroke="#6366f1" stroke-width="0.5" opacity="${((1 - d / MAX_DIST) * 0.25).toFixed(3)}" />`);
        }
      }
      svg.innerHTML = lines.join('');
    };
    tick();
    return () => { parent.removeEventListener('mousemove', onMove); parent.removeEventListener('mouseleave', onLeave); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <>
      <style>{`
        @keyframes wf-d1 { 0%,100% { translate: 0 0 } 50% { translate: 0 -12px } }
        @keyframes wf-d2 { 0%,100% { translate: 0 0; rotate: 0deg } 50% { translate: 0 -8px; rotate: 8deg } }
        @keyframes wf-d3 { 0%,100% { translate: 0 0; rotate: 45deg } 50% { translate: 0 -14px; rotate: 50deg } }
      `}</style>
      <div ref={layerRef} style={{ pointerEvents: 'none', position: 'absolute', inset: 0 }}>
        {/* dot grid */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'radial-gradient(circle, #d6d3d1 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.35, maskImage: 'radial-gradient(ellipse at 70% 50%, black 30%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, black 30%, transparent 80%)' }} />
        {/* dynamic lines */}
        <svg ref={svgRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }} preserveAspectRatio="none" />
        {/* mouse glow */}
        <div ref={glowRef} style={{ position: 'absolute', zIndex: 2, width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.10), transparent 70%)', transform: 'translate(-50%, -50%)', mixBlendMode: 'multiply', opacity: 0, transition: 'opacity 300ms' }} />
        {/* 4 浮件 */}
        <div ref={geoRefs[0]} style={{ position: 'absolute', zIndex: 3, top: '22%', right: '18%', animation: 'wf-d1 7s ease-in-out infinite' }}>
          <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="none" stroke="#6366f1" strokeWidth="1" opacity="0.5" /><circle cx="24" cy="24" r="14" fill="#6366f1" opacity="0.18" /></svg>
        </div>
        <div ref={geoRefs[1]} style={{ position: 'absolute', zIndex: 3, top: '50%', right: '8%', animation: 'wf-d2 8s ease-in-out infinite' }}>
          <svg width="36" height="36" viewBox="0 0 36 36"><rect x="2" y="2" width="32" height="32" rx="6" fill="none" stroke="#ec4899" strokeWidth="1" opacity="0.6" /><rect x="8" y="8" width="20" height="20" rx="3" fill="#ec4899" opacity="0.15" /></svg>
        </div>
        <div ref={geoRefs[2]} style={{ position: 'absolute', zIndex: 3, top: '70%', right: '28%', animation: 'wf-d3 9s ease-in-out infinite' }}>
          <svg width="40" height="40" viewBox="0 0 40 40"><polygon points="20,4 36,32 4,32" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.55" /><polygon points="20,12 30,28 10,28" fill="#06b6d4" opacity="0.18" /></svg>
        </div>
        <div ref={geoRefs[3]} style={{ position: 'absolute', zIndex: 3, top: '38%', right: '35%', animation: 'wf-d1 6s ease-in-out infinite' }}>
          <svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="3" fill="#f59e0b" /><circle cx="14" cy="14" r="12" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.4" /></svg>
        </div>
      </div>
    </>
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
    for (let i = 0; i < 200; i++) {
      starPos.push((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30);
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.03, transparent: true, opacity: 0.6 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    let targetRotX = 0;
    let targetRotY = 0;
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
