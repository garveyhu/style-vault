/**
 * Quiver 等距像素办公室 —— 忠实移植自 quiver 源码（office/iso.ts · primitives.ts ·
 * rooms.ts · furniture.ts · buildScene.ts · workers.ts + global.css 的 .worker/.tile/...）。
 * 这是 style-vault 预览专用的「静态快照」版：保留全部几何 / 配色 / 家具 / 工人，
 * 但去掉所有持续动画（缩略卡里 mount 反复，动画会闪）。供 office-command-deck /
 * glass-topbar-hud 两个预览复用，确保和真实 app 完全一致。
 *
 * `_templates/` 前缀 → 不被 App 路由收集、不被 preview/registry 计为条目。
 */
import type { CSSProperties, ReactNode } from 'react';

/* ============================ iso.ts ============================ */
const TW = 64;
const TH = 32;
const WALLH = 42;
const C = 13;
const R = 9;

interface Point { x: number; y: number }
interface Layout { ox: number; oy: number; worldW: number; worldH: number }

function iso(layout: Pick<Layout, 'ox' | 'oy'>, c: number, r: number, z = 0): Point {
  return { x: ((c - r) * TW) / 2 + layout.ox, y: ((c + r) * TH) / 2 + layout.oy - z };
}
function zidx(c: number, r: number, z = 0): number {
  return Math.round((c + r) * 10 + z * 0.5) + 50;
}
function computeLayout(): Layout {
  const zero = { ox: 0, oy: 0 };
  const corners: Array<[number, number]> = [[0, 0], [C + 1, 0], [0, R + 1], [C + 1, R + 1]];
  const xs = corners.map(([c, r]) => iso(zero, c, r).x);
  const ys = corners.map(([c, r]) => iso(zero, c, r).y);
  const minx = Math.min(...xs);
  const maxx = Math.max(...xs);
  const miny = Math.min(...ys) - WALLH - 50;
  const maxy = Math.max(...ys);
  const mX = 60, mT = 44, mB = 30;
  return { ox: mX - minx, oy: mT - miny, worldW: maxx - minx + 2 * mX, worldH: maxy - miny + mT + mB };
}

/* ========================= primitives.ts ========================= */
interface SceneNode { key: string; className: string; style: CSSProperties; text?: string; mark?: boolean; composite?: 'cat' }
interface Faces { top: string; l: string; r: string }
interface RoomLabel { key: string; text: string; wx: number; wy: number }
const WOOD2: Faces = { top: '#a87f57', l: '#5a4636', r: '#7a5a3c' };

const polygon = (pts: Point[]): string => `polygon(${pts.map((p) => `${p.x.toFixed(1)}px ${p.y.toFixed(1)}px`).join(',')})`;

class SceneBuilder {
  readonly nodes: SceneNode[] = [];
  readonly roomLabels: RoomLabel[] = [];
  private readonly layout: Layout;
  constructor(layout: Layout) { this.layout = layout; }
  private add(node: Omit<SceneNode, 'key'>): SceneNode {
    const full: SceneNode = { ...node, key: `n${this.nodes.length}` };
    this.nodes.push(full);
    return full;
  }
  pt(c: number, r: number, z = 0): Point { return iso(this.layout, c, r, z); }
  poly(pts: Point[], color: string, z: number, extra?: CSSProperties): SceneNode {
    return this.add({ className: 'poly', style: { zIndex: z, background: color, clipPath: polygon(pts), ...extra } });
  }
  tile(c: number, r: number, color: string, z: number): void {
    const p = this.pt(c, r);
    this.add({ className: 'tile', style: { left: p.x, top: p.y, zIndex: z, background: color } });
  }
  wallEdge(c1: number, r1: number, c2: number, r2: number, h: number, color: string, z: number, filter?: string): void {
    const a = this.pt(c1, r1);
    const b = this.pt(c2, r2);
    this.poly([a, b, { x: b.x, y: b.y - h }, { x: a.x, y: a.y - h }], color, z, filter ? { filter } : undefined);
  }
  label(c: number, r: number, text: string, key = ''): void {
    const p = this.pt(c, r);
    this.roomLabels.push({ key, text, wx: p.x, wy: p.y - 6 });
  }
  buildmark(c: number, r: number, mark: boolean): void {
    const p = this.pt(c, r);
    this.add({ className: 'buildmark', style: { left: p.x, top: p.y, zIndex: zidx(c, r) }, mark });
  }
  isoBox(c: number, r: number, wc: number, dc: number, h: number, col: Faces): number {
    const z = zidx(c + wc, r + dc) + 2;
    this.poly([this.pt(c + wc, r), this.pt(c + wc, r + dc), this.pt(c + wc, r + dc, h), this.pt(c + wc, r, h)], col.r, z);
    this.poly([this.pt(c, r + dc), this.pt(c + wc, r + dc), this.pt(c + wc, r + dc, h), this.pt(c, r + dc, h)], col.l, z);
    this.poly([this.pt(c, r, h), this.pt(c + wc, r, h), this.pt(c + wc, r + dc, h), this.pt(c, r + dc, h)], col.top, z + 1);
    return z;
  }
  chip(c: number, r: number, wc: number, dc: number, z0: number, z1: number, col: Faces, zb?: number): number {
    const z = zb != null ? zb : zidx(c + wc, r + dc) + 3;
    this.poly([this.pt(c + wc, r, z0), this.pt(c + wc, r + dc, z0), this.pt(c + wc, r + dc, z1), this.pt(c + wc, r, z1)], col.r, z);
    this.poly([this.pt(c, r + dc, z0), this.pt(c + wc, r + dc, z0), this.pt(c + wc, r + dc, z1), this.pt(c, r + dc, z1)], col.l, z);
    this.poly([this.pt(c, r, z1), this.pt(c + wc, r, z1), this.pt(c + wc, r + dc, z1), this.pt(c, r + dc, z1)], col.top, z + 1);
    return z;
  }
  southPanel(c: number, r: number, wc: number, h0: number, h1: number, color: string, z: number): SceneNode {
    return this.poly([this.pt(c, r, h0), this.pt(c + wc, r, h0), this.pt(c + wc, r, h1), this.pt(c, r, h1)], color, z);
  }
  rug(c0: number, r0: number, wc: number, dc: number, col: string, z: number): void {
    this.poly([this.pt(c0, r0), this.pt(c0 + wc, r0), this.pt(c0 + wc, r0 + dc), this.pt(c0, r0 + dc)], col, z);
  }
  led(c: number, r: number, h: number, color: string, _blink = false, z?: number): void {
    const p = this.pt(c, r, h);
    this.add({ className: 'pled', style: { left: p.x, top: p.y, background: color, zIndex: z != null ? z : zidx(c, r) + 9 } });
  }
  speck(c: number, r: number, h: number, color: string, z?: number): void {
    const p = this.pt(c, r, h);
    this.add({ className: 'pspeck', style: { left: p.x, top: p.y, background: color, zIndex: z != null ? z : zidx(c, r) + 12 } });
  }
  contactShadow(c: number, r: number, wpx: number, hpx: number, z?: number): void {
    const p = this.pt(c, r, 0);
    this.add({ className: 'pcshadow', style: { left: p.x - wpx / 2, top: p.y - hpx / 2 + 1, width: wpx, height: hpx, zIndex: z != null ? z : zidx(c, r) + 1 } });
  }
  pxrect(x: number, y: number, w: number, h: number, color: string, z: number, cls?: string, extra?: CSSProperties): SceneNode {
    return this.add({ className: `rect${cls ? ' ' + cls : ''}`, style: { left: x, top: y, width: w, height: h, background: color, zIndex: z, ...extra } });
  }
  ceilLamp(c: number, r: number, color: string): void {
    const p = this.pt(c, r);
    const z = zidx(c, r) - 3;
    this.add({ className: 'glow', style: { left: p.x - 58, top: p.y - 36, width: 116, height: 70, background: `radial-gradient(closest-side, ${color}, transparent 78%)`, opacity: 0.62, zIndex: z } });
    this.add({ className: 'glow', style: { left: p.x - 22, top: p.y - 16, width: 44, height: 30, background: `radial-gradient(closest-side, ${color}, transparent 70%)`, opacity: 0.5, filter: 'blur(5px)', zIndex: z + 1 } });
  }
  godray(left: number, top: number, width: number, height: number, z: number, secondary: boolean): void {
    this.add({ className: `godray${secondary ? ' b' : ''}`, style: { left, top, width, height, zIndex: z } });
  }
  steam(): void { /* 静态快照：略去升腾热气动画 */ }
  cat(c: number, r: number): void {
    const p = this.pt(c, r);
    this.add({ className: 'cat', style: { left: p.x - 8, top: p.y - 10, zIndex: zidx(c, r) + 3 }, composite: 'cat' });
  }
  dust(c: number, r: number, h: number, opacity: number, sizePx: number, warm: boolean): void {
    const p = this.pt(c, r, h);
    const style: CSSProperties = { left: p.x, top: p.y, zIndex: 8000, opacity, width: sizePx, height: sizePx };
    if (warm) style.background = '#ffe2b0';
    this.add({ className: 'dust', style });
  }
}

/* ============================ rooms.ts ============================ */
type RoomKey = 'lounge' | 'work' | 'verify' | 'dispatch' | 'build' | 'ops' | 'ship';
interface Room { c0: number; c1: number; r0: number; r1: number; label: string; tint: string; wall: string | null }
const ROOMS: Record<RoomKey, Room> = {
  lounge: { c0: 0, c1: 3, r0: 0, r1: 9, label: '休息室', tint: 'rgba(120,90,140,.16)', wall: 'rgba(86,62,104,1)' },
  work: { c0: 5, c1: 9, r0: 0, r1: 9, label: '工位区', tint: 'rgba(90,120,170,.13)', wall: 'rgba(64,86,128,1)' },
  verify: { c0: 11, c1: 13, r0: 0, r1: 1, label: '质检台', tint: 'rgba(80,150,130,.16)', wall: 'rgba(54,110,96,1)' },
  dispatch: { c0: 11, c1: 13, r0: 2, r1: 3, label: '领导区 · 经理', tint: 'rgba(200,160,90,.13)', wall: 'rgba(150,116,56,1)' },
  build: { c0: 11, c1: 13, r0: 4, r1: 5, label: '＋ 可扩展', tint: 'transparent', wall: null },
  ops: { c0: 11, c1: 13, r0: 6, r1: 7, label: '运维 · 预算', tint: 'rgba(160,130,80,.13)', wall: 'rgba(120,96,56,1)' },
  ship: { c0: 11, c1: 13, r0: 8, r1: 9, label: '发货口', tint: 'rgba(110,120,140,.12)', wall: 'rgba(74,84,104,1)' },
};
const HALLS = [4, 10];
const DESKS: Array<[number, number]> = [[5, 1], [7, 1], [9, 1], [5, 3], [7, 3], [9, 3], [5, 5], [7, 5], [9, 5], [5, 7], [7, 7], [9, 7]];
function roomAt(c: number, r: number): RoomKey | null {
  for (const key of Object.keys(ROOMS) as RoomKey[]) {
    const room = ROOMS[key];
    if (c >= room.c0 && c <= room.c1 && r >= room.r0 && r <= room.r1) return key;
  }
  return null;
}

/* ========================== furniture.ts ========================== */
function deskUnit(b: SceneBuilder, c: number, r: number): void {
  b.isoBox(c + 0.05, r - 0.55, 0.45, 0.45, 9, { top: '#4a3a5a', l: '#2d2138', r: '#3a2c4a' });
  b.chip(c + 0.07, r - 0.53, 0.4, 0.08, 9, 17, { top: '#5a4a6e', l: '#352846', r: '#473760' });
  b.contactShadow(c + 0.04, r + 0.16, 46, 22);
  const z = b.isoBox(c - 0.45, r - 0.15, 0.95, 0.6, 11, WOOD2);
  b.southPanel(c - 0.45, r - 0.15, 0.95, 0, 11, '#4a3628', z);
  b.southPanel(c - 0.44, r - 0.15, 0.93, 8, 11, '#b98a5e', z + 1);
  b.isoBox(c - 0.1, r - 0.05, 0.1, 0.1, 11, { top: '#2a2f3e', l: '#15131a', r: '#20242f' });
  b.chip(c - 0.16, r - 0.05, 0.32, 0.06, 11, 13, { top: '#3a3f50', l: '#1c2030', r: '#2a3040' });
  b.southPanel(c - 0.46, r - 0.06, 0.8, 17, 33, '#15131a', z + 2);
  b.southPanel(c - 0.42, r - 0.05, 0.72, 19, 31, '#2a3a55', z + 3);
  const sp = b.pt(c - 0.42, r - 0.05, 31);
  b.pxrect(sp.x, sp.y, 16, 12, '', z + 4, 'pscan');
  b.chip(c - 0.34, r + 0.12, 0.42, 0.16, 11, 12.5, { top: '#cdd2dc', l: '#7a8090', r: '#9aa0ac' });
  for (let k = 0; k < 4; k++) b.led(c - 0.3 + k * 0.08, r + 0.16, 13, 'rgba(255,255,255,.5)', false, z + 6);
  b.contactShadow(c + 0.28, r + 0.16, 9, 5, z + 5);
  b.chip(c + 0.24, r + 0.1, 0.1, 0.1, 11, 15, { top: '#d9d3c4', l: '#8a8276', r: '#aaa294' });
  b.led(c + 0.29, r + 0.155, 15, '#3a2c20', false, z + 7);
  b.chip(c - 0.4, r + 0.2, 0.16, 0.12, 11, 11.6, { top: '#e7e1cf', l: '#b9b3a2', r: '#cfc9b6' });
  b.chip(c - 0.34, r + 0.24, 0.16, 0.12, 11, 11.4, { top: '#dcd6c4', l: '#aaa493', r: '#c4beac' });
  const ca = b.pt(c - 0.4, r + 0.45, 11);
  const cb = b.pt(c - 0.4, r + 0.45, 0);
  b.poly([{ x: ca.x - 1, y: ca.y }, { x: ca.x + 1, y: ca.y }, { x: cb.x + 1, y: cb.y }, { x: cb.x - 1, y: cb.y }], '#15131a', z + 2);
}
function serverRack(b: SceneBuilder, c: number, r: number): void {
  b.contactShadow(c + 0.35, r + 0.25, 40, 20);
  const z = b.isoBox(c, r, 0.7, 0.5, 42, { top: '#23283a', l: '#0f1118', r: '#181c28' });
  b.southPanel(c + 0.04, r, 0.62, 4, 40, '#0c0f16', z + 1);
  b.southPanel(c + 0.05, r, 0.6, 4, 5, '#33405a', z + 2);
  for (let i = 0; i < 8; i++) {
    const y = 6 + i * 4.4;
    b.southPanel(c + 0.06, r, 0.58, y, y + 3.4, '#1a1f2e', z + 2);
    b.southPanel(c + 0.06, r, 0.58, y + 3.0, y + 3.4, '#070a10', z + 3);
    for (let v = 0; v < 3; v++) b.southPanel(c + 0.4 + v * 0.05, r, 0.03, y + 0.6, y + 2.8, '#05070c', z + 3);
    b.led(c + 0.12, r, 11 + i * 4.4 * 0.95, i % 3 === 0 ? '#6cc47a' : i % 3 === 1 ? '#ffd27a' : '#5ce0ff', true, z + 5);
    if (i % 2 === 0) b.led(c + 0.17, r, 11 + i * 4.4 * 0.95, '#e2604f', true, z + 5);
  }
  b.led(c + 0.6, r, 40, '#6cc47a', true, z + 6);
}
function whiteboard(b: SceneBuilder, c: number, r: number, wc: number): void {
  const z = zidx(c, r) - 2;
  b.southPanel(c - 0.02, r, wc + 0.04, 16, 49, '#8a7a5a', z);
  b.southPanel(c, r, wc, 18, 46, '#eee8d6', z + 1);
  b.southPanel(c, r, wc, 18, 20, 'rgba(255,255,255,.5)', z + 2);
  b.southPanel(c, r, wc, 46, 49, '#9a8a6a', z + 2);
  const strokes: Array<[string, number, number, number]> = [['#5a86c0', 0.1, 0.55, 26], ['#c45446', 0.2, 0.34, 33], ['#6caf70', 0.14, 0.46, 40], ['#3a4660', 0.3, 0.2, 47]];
  strokes.forEach(([col, o, w2, y]) => b.southPanel(c + o, r, wc * w2, y, y + 2, col, z + 3));
  b.southPanel(c + 0.12, r, 0.04, 28, 38, '#3a4660', z + 3);
  b.southPanel(c + 0.12, r, 0.18, 28, 30, '#3a4660', z + 3);
  b.southPanel(c + wc * 0.62, r, 0.16, 30, 38, '#ffd27a', z + 4);
  b.southPanel(c + wc * 0.62, r, 0.16, 30, 31, '#e0b85a', z + 5);
  b.southPanel(c + wc * 0.8, r, 0.16, 24, 32, '#7cc4d0', z + 4);
  b.southPanel(c + wc * 0.8, r, 0.16, 24, 25, '#5aa6b4', z + 5);
}
function deskLamp(b: SceneBuilder, c: number, r: number): void {
  b.contactShadow(c + 0.06, r + 0.06, 8, 4);
  b.isoBox(c, r, 0.08, 0.08, 4, { top: '#3a3f50', l: '#1c2030', r: '#2a3040' });
  const a = b.pt(c + 0.04, r + 0.04, 4);
  const d = b.pt(c + 0.04, r + 0.04, 16);
  b.poly([{ x: a.x - 0.8, y: a.y }, { x: a.x + 0.8, y: a.y }, { x: d.x + 0.8, y: d.y }, { x: d.x - 0.8, y: d.y }], '#2a3040', zidx(c, r) + 5);
  b.chip(c - 0.02, r, 0.12, 0.06, 15, 18, { top: '#e6bd6c', l: '#9a7c34', r: '#c9a043' });
  b.led(c + 0.04, r + 0.03, 15, '#ffe6ad', false, zidx(c, r) + 8);
}
function plant(b: SceneBuilder, c: number, r: number): void {
  b.contactShadow(c + 0.16, r + 0.16, 18, 9);
  b.isoBox(c, r, 0.32, 0.32, 8, { top: '#9a6a48', l: '#4a3422', r: '#7a4e30' });
  b.southPanel(c, r, 0.32, 6, 8, 'rgba(210,150,110,.5)', zidx(c + 0.32, r) + 4);
  b.isoBox(c - 0.02, r - 0.02, 0.36, 0.36, 20, { top: '#4f8a5a', l: '#2f5a3a', r: '#418a4e' });
  b.isoBox(c + 0.02, r + 0.02, 0.28, 0.28, 27, { top: '#5b9a66', l: '#356a44', r: '#4f8a5a' });
  b.isoBox(c + 0.07, r + 0.07, 0.18, 0.18, 32, { top: '#6aab74', l: '#3c7a4e', r: '#58a064' });
  ['#8ec98e', '#7cbf86', '#9ad19a'].forEach((cl, i) => b.speck(c + 0.1 + i * 0.05, r + 0.06 + i * 0.04, 30 + i * 2, cl, zidx(c, r) + 12));
}
function pottedShelf(b: SceneBuilder, c: number, r: number): void {
  b.contactShadow(c + 0.1, r + 0.1, 14, 7);
  b.isoBox(c, r, 0.18, 0.18, 16, { top: '#6a4e34', l: '#3a2820', r: '#523a28' });
  b.southPanel(c, r, 0.18, 14, 16, '#7a5a3c', zidx(c + 0.18, r) + 3);
  b.chip(c + 0.02, r + 0.02, 0.12, 0.12, 16, 20, { top: '#9a6a48', l: '#4a3422', r: '#7a4e30' });
  b.chip(c, r, 0.16, 0.16, 20, 30, { top: '#5b9a66', l: '#356a44', r: '#4f8a5a' });
  ['#8ec98e', '#7cbf86'].forEach((cl, i) => b.speck(c + 0.06 + i * 0.04, r + 0.05, 26 + i * 2, cl, zidx(c, r) + 10));
}
function windowWall(b: SceneBuilder, cA: number, cB: number, r: number): void {
  const glass = [b.pt(cA, r, 16), b.pt(cB, r, 16), b.pt(cB, r, 38), b.pt(cA, r, 38)];
  b.poly(glass, 'rgba(143,208,255,.20)', zidx(cA, r) - 2);
  const m = b.pt((cA + cB) / 2, r, 27);
  b.pxrect(m.x - 4, m.y - 5, 9, 9, '#ffe6ad', zidx(cA, r) - 1, undefined, { borderRadius: '50%', opacity: 0.85, boxShadow: '0 0 10px 3px rgba(255,230,173,.6)' });
  const v1 = b.pt((cA + cB) / 2, r, 16);
  const v2 = b.pt((cA + cB) / 2, r, 38);
  b.poly([{ x: v1.x - 1, y: v1.y }, { x: v1.x + 1, y: v1.y }, { x: v2.x + 1, y: v2.y }, { x: v2.x - 1, y: v2.y }], 'rgba(20,20,30,.6)', zidx(cA, r) - 1);
  const top = b.pt((cA + cB) / 2, r, 38);
  const w = ((cB - cA) * TW) / 2;
  b.godray(top.x - w * 0.6, top.y, Math.max(70, w * 1.2), 140, zidx(cA, r) + 4, false);
  b.godray(top.x - w * 0.6 + 12, top.y, Math.max(70, w * 1.2), 140, zidx(cA, r) + 4, true);
}
function wallPoster(b: SceneBuilder, c: number, r: number, wc: number, scheme: [string, string, string]): void {
  const z = zidx(c, r) - 2;
  b.southPanel(c - 0.02, r, wc + 0.04, 24, 47, '#1a1f30', z);
  b.southPanel(c, r, wc, 26, 45, scheme[0], z + 1);
  b.southPanel(c + wc * 0.12, r, wc * 0.5, 30, 42, scheme[1], z + 2);
  b.southPanel(c + wc * 0.18, r, wc * 0.3, 33, 39, scheme[2], z + 3);
  b.southPanel(c, r, wc, 44, 45, 'rgba(255,255,255,.25)', z + 3);
}
function patternRug(b: SceneBuilder, c0: number, r0: number, wc: number, dc: number, base: string, trim: string): void {
  const z = zidx(c0 + wc, r0 + dc) - 1;
  b.rug(c0, r0, wc, dc, base, z);
  b.rug(c0 + 0.12, r0 + 0.12, wc - 0.24, dc - 0.24, trim, z);
  b.rug(c0 + 0.28, r0 + 0.28, wc - 0.56, dc - 0.56, base, z);
  const m = b.pt(c0 + wc / 2, r0 + dc / 2);
  b.poly([{ x: m.x, y: m.y - 6 }, { x: m.x + 10, y: m.y }, { x: m.x, y: m.y + 6 }, { x: m.x - 10, y: m.y }], trim, z);
}
function sofa(b: SceneBuilder, c: number, r: number, wc: number): void {
  b.contactShadow(c + wc / 2, r + 0.42, wc * 60, 26);
  b.isoBox(c, r, wc, 0.7, 8, { top: '#5a4a6e', l: '#322444', r: '#46395c' });
  b.isoBox(c, r - 0.05, wc, 0.18, 17, { top: '#6a5a80', l: '#3a2c4e', r: '#4e3f66' });
  b.southPanel(c, r - 0.05, wc, 15, 17, 'rgba(170,150,200,.5)', zidx(c + wc, r) + 5);
  b.isoBox(c, r, 0.16, 0.7, 13, { top: '#6a5a80', l: '#352848', r: '#4a3c60' });
  b.isoBox(c + wc - 0.16, r, 0.16, 0.7, 13, { top: '#6a5a80', l: '#352848', r: '#4a3c60' });
  const n = Math.max(2, Math.round(wc / 0.8));
  const cw = (wc - 0.32) / n;
  for (let i = 0; i < n; i++) {
    const cc = c + 0.16 + i * cw;
    b.chip(cc + 0.02, r + 0.06, cw - 0.06, 0.56, 8, 12, { top: '#6f5e88', l: '#3c2e52', r: '#54456c' });
    b.southPanel(cc + 0.02, r + 0.06, cw - 0.06, 10, 12, 'rgba(180,160,210,.4)', zidx(c + wc, r) + 6);
  }
}
function coffeeBar(b: SceneBuilder, c: number, r: number): void {
  b.contactShadow(c + 0.5, r + 0.22, 56, 20);
  const z = b.isoBox(c, r, 1.0, 0.4, 16, { top: '#403a50', l: '#1f1c2c', r: '#2c2840' });
  b.southPanel(c, r, 1.0, 13, 16, '#544c66', z + 1);
  b.isoBox(c + 0.08, r, 0.26, 0.26, 20, { top: '#2a2f3e', l: '#15131a', r: '#20242f' });
  b.southPanel(c + 0.08, r, 0.26, 28, 30, 'rgba(150,170,210,.4)', z + 5);
  b.led(c + 0.3, r + 0.06, 22, '#ffd27a', true, z + 6);
  b.chip(c + 0.14, r + 0.2, 0.08, 0.06, 16, 18, { top: '#3a3f50', l: '#1c2030', r: '#2a3040' });
  b.chip(c + 0.5, r + 0.1, 0.1, 0.1, 16, 20, { top: '#d9d3c4', l: '#8a8276', r: '#aaa294' });
  b.led(c + 0.55, r + 0.15, 20, '#3a2c20', false, z + 7);
  b.chip(c + 0.66, r + 0.16, 0.09, 0.09, 16, 19, { top: '#c9a043', l: '#7a6028', r: '#9a7c34' });
}
function bookcase(b: SceneBuilder, c: number, r: number, wc: number): void {
  const z = b.isoBox(c, r, wc, 0.3, 46, { top: '#6a4e34', l: '#3a2820', r: '#523a28' });
  b.southPanel(c, r, wc, 0, 46, '#2e2018', z + 1);
  b.southPanel(c + 0.02, r, wc - 0.04, 44, 46, '#7a5a3c', z + 2);
  const books = ['#c45446', '#6f97d6', '#6caf70', '#e6bd6c', '#9c6c80', '#4cc0d8', '#b8855e', '#7e6aa8'];
  for (let s = 0; s < 3; s++) {
    b.southPanel(c + 0.03, r, wc - 0.06, 6 + s * 13, 7 + s * 13, '#1c130d', z + 2);
    let i = 0;
    let cc = c + 0.06;
    const end = c + wc - 0.06;
    while (cc < end - 0.01) {
      const bw = ((wc - 0.12) / 5) * (0.7 + ((i * 7 + s * 3) % 5) * 0.07);
      const h = 8 + ((i * 5 + s * 2) % 4) * 3.5;
      const lean = (i + s) % 6 === 5 ? 2 : 0;
      b.southPanel(cc, r, Math.min(bw, end - cc) * 0.82, 9 + s * 13, 9 + s * 13 + 11 + h * 0.6 + lean, books[(i + s) % books.length], z + 3);
      b.southPanel(cc, r, Math.min(bw, end - cc) * 0.18, 9 + s * 13, 9 + s * 13 + 11 + h * 0.6 + lean, 'rgba(0,0,0,.22)', z + 4);
      cc += bw + 0.005;
      i++;
    }
  }
}
function bigPlant(b: SceneBuilder, c: number, r: number): void {
  b.contactShadow(c + 0.2, r + 0.2, 24, 12);
  b.isoBox(c, r, 0.4, 0.4, 10, { top: '#9a6a48', l: '#4a3422', r: '#7a4e30' });
  b.southPanel(c, r, 0.4, 7, 10, 'rgba(210,150,110,.5)', zidx(c + 0.4, r) + 4);
  b.isoBox(c - 0.05, r - 0.05, 0.5, 0.5, 30, { top: '#427a4c', l: '#2a5034', r: '#387844' });
  b.isoBox(c - 0.02, r - 0.02, 0.42, 0.42, 40, { top: '#4f8a5a', l: '#2f5a3a', r: '#418a4e' });
  b.isoBox(c + 0.02, r + 0.02, 0.34, 0.34, 48, { top: '#5b9a66', l: '#356a44', r: '#4f8a5a' });
  b.isoBox(c + 0.07, r + 0.07, 0.2, 0.2, 54, { top: '#6aab74', l: '#3c7a4e', r: '#58a064' });
  ['#8ec98e', '#7cbf86', '#9ad19a', '#86c886'].forEach((cl, i) => b.speck(c + 0.08 + i * 0.06, r + 0.05 + i * 0.05, 42 + i * 4, cl, zidx(c, r) + 14));
}
function wallClock(b: SceneBuilder, c: number, r: number, h: number): void {
  const p = b.pt(c, r, h);
  const z = zidx(c, r) + 6;
  b.pxrect(p.x - 7, p.y - 7, 14, 14, '#e7e1cf', z, undefined, { borderRadius: '50%', boxShadow: '0 0 0 2px #3a3040' });
  b.pxrect(p.x - 1, p.y - 6, 2, 6, '#2a3040', z + 1);
  b.pxrect(p.x - 0.75, p.y - 4, 1.5, 4, '#5a86c0', z + 1);
}
function waterCooler(b: SceneBuilder, c: number, r: number): void {
  b.contactShadow(c + 0.16, r + 0.16, 18, 9);
  b.isoBox(c, r, 0.3, 0.3, 22, { top: '#cdd4de', l: '#7a828e', r: '#9aa2ae' });
  b.isoBox(c + 0.03, r + 0.03, 0.24, 0.24, 40, { top: 'rgba(150,200,230,.55)', l: 'rgba(90,140,180,.55)', r: 'rgba(120,170,210,.55)' });
  b.southPanel(c + 0.06, r, 0.18, 8, 12, '#3a4660', zidx(c + 0.3, r) + 5);
  b.led(c + 0.1, r, 11, '#5ce0ff', true, zidx(c + 0.3, r) + 6);
  b.led(c + 0.2, r, 11, '#e2604f', false, zidx(c + 0.3, r) + 6);
}
function cableRun(b: SceneBuilder, c: number, r: number, h: number): void {
  const z = zidx(c, r) - 1;
  const top = b.pt(c, r, h);
  const mid = b.pt(c + 0.04, r, h * 0.6);
  const btm = b.pt(c + 0.02, r, h * 0.25);
  b.poly([{ x: top.x - 1, y: top.y }, { x: top.x + 1, y: top.y }, { x: mid.x + 1, y: mid.y }, { x: mid.x - 1, y: mid.y }], '#14181f', z);
  b.poly([{ x: mid.x - 1, y: mid.y }, { x: mid.x + 1, y: mid.y }, { x: btm.x + 1, y: btm.y }, { x: btm.x - 1, y: btm.y }], '#181c24', z);
  b.led(c + 0.02, r, h * 0.25, '#6cc47a', true, z + 2);
}
function ceilDuct(b: SceneBuilder, cA: number, cB: number, r: number, h: number, col?: string): void {
  const z = zidx(cA, r) - 2;
  const c0 = col || '#2c3346';
  const a = b.pt(cA, r, h);
  const bb = b.pt(cB, r, h);
  const d = b.pt(cB, r, h - 5);
  const e = b.pt(cA, r, h - 5);
  b.poly([a, bb, d, e], c0, z);
  b.poly([a, bb, { x: bb.x, y: bb.y - 1.5 }, { x: a.x, y: a.y - 1.5 }], 'rgba(150,170,210,.35)', z + 1);
  const n = Math.max(2, Math.round(Math.abs(cB - cA)));
  for (let i = 0; i <= n; i++) {
    const cc = cA + ((cB - cA) * i) / n;
    const t = b.pt(cc, r, h);
    const btm = b.pt(cc, r, h + 8);
    b.poly([{ x: t.x - 0.7, y: t.y }, { x: t.x + 0.7, y: t.y }, { x: btm.x + 0.7, y: btm.y }, { x: btm.x - 0.7, y: btm.y }], '#1a2030', z);
  }
}
function qaBench(b: SceneBuilder, c: number, r: number): void {
  b.contactShadow(c - 0.02, r + 0.2, 48, 22);
  const z = b.isoBox(c - 0.45, r - 0.1, 0.95, 0.6, 12, { top: '#aeb6c4', l: '#5a6272', r: '#828c9c' });
  b.southPanel(c - 0.45, r - 0.1, 0.95, 10, 12, '#cdd4de', z + 1);
  b.southPanel(c - 0.5, r, 0.9, 16, 44, '#0e1118', z + 2);
  b.southPanel(c - 0.46, r, 0.82, 18, 42, '#24405a', z + 3);
  const sp = b.pt(c - 0.46, r, 42);
  b.pxrect(sp.x, sp.y, 42, 14, '', z + 4, 'pscan');
  b.southPanel(c - 0.46, r, 0.82, 40, 42, 'rgba(140,180,220,.35)', z + 4);
  b.isoBox(c + 0.32, r - 0.05, 0.18, 0.18, 24, { top: '#9aa2b0', l: '#4a5260', r: '#727c8c' });
  b.led(c + 0.41, r + 0.04, 24, '#5ce0ff', true, z + 6);
  b.chip(c + 0.14, r + 0.22, 0.22, 0.14, 12, 13.5, { top: '#c4ccd6', l: '#7a828e', r: '#9aa2ae' });
}
function board(b: SceneBuilder, c: number, r: number): void {
  const z = zidx(c, r) + 2;
  b.isoBox(c, r, 0.12, 0.5, 40, { top: '#3a4060', l: '#191d30', r: '#2a3048' });
  b.southPanel(c - 0.12, r, 0.74, 14, 42, '#161f33', z + 3);
  b.southPanel(c - 0.12, r, 0.74, 40, 42, '#2a3454', z + 4);
  const cols: Array<[string, string]> = [['#5a86c0', '#6caf70'], ['#c45446', '#7aa7e6'], ['#ffd27a', '#6caf70']];
  for (let col = 0; col < 3; col++) {
    const x = c - 0.08 + col * 0.22;
    b.southPanel(x, r, 0.02, 18, 40, '#0e1424', z + 4);
    for (let k = 0; k < 3; k++) {
      const y = 20 + k * 7 + ((col + k) % 2) * 1;
      const cardCol = cols[col][k % 2];
      b.southPanel(x + 0.02, r, 0.16, y, y + 5, cardCol, z + 5);
      b.southPanel(x + 0.02, r, 0.16, y, y + 1, 'rgba(255,255,255,.3)', z + 6);
    }
  }
}
function memoryBook(b: SceneBuilder, c: number, r: number): void {
  b.isoBox(c - 0.2, r - 0.1, 0.5, 0.45, 10, WOOD2);
  b.southPanel(c - 0.2, r - 0.1, 0.5, 8, 10, '#b98a5e', zidx(c + 0.3, r) + 3);
  const z = zidx(c, r) + 4;
  b.chip(c - 0.2, r - 0.06, 0.18, 0.34, 10, 12, { top: '#efe6cf', l: '#b8ad92', r: '#d4cbae' });
  b.chip(c - 0.01, r - 0.06, 0.18, 0.34, 10, 12, { top: '#efe6cf', l: '#b8ad92', r: '#d4cbae' });
  b.southPanel(c - 0.16, r, 0.34, 12, 22, '#ffd27a', z);
  b.southPanel(c - 0.16, r, 0.34, 12, 13.5, '#5a4636', z + 1);
  b.led(c - 0.01, r - 0.02, 12, '#c45446', false, z + 3);
}
function safeBox(b: SceneBuilder, c: number, r: number): void {
  b.contactShadow(c + 0.3, r + 0.25, 32, 17);
  const z = b.isoBox(c, r, 0.6, 0.5, 34, { top: '#2f3550', l: '#191d30', r: '#252a42' });
  b.southPanel(c + 0.06, r, 0.48, 5, 32, '#2a3048', z + 1);
  b.southPanel(c + 0.1, r, 0.4, 8, 28, '#3a4060', z + 2);
  b.southPanel(c + 0.1, r, 0.4, 26, 28, 'rgba(120,140,190,.35)', z + 3);
  const studs: Array<[number, number]> = [[0.13, 10], [0.45, 10], [0.13, 26], [0.45, 26]];
  studs.forEach(([cc, h]) => b.led(c + cc, r, h, '#5a6488', false, z + 4));
  b.southPanel(c + 0.5, r, 0.04, 11, 15, '#5a6488', z + 4);
  b.southPanel(c + 0.5, r, 0.04, 22, 26, '#5a6488', z + 4);
  const dial = b.pt(c + 0.3, r, 18);
  b.pxrect(dial.x - 4, dial.y - 4, 9, 9, '#ffd27a', z + 5, undefined, { borderRadius: '50%', boxShadow: '0 0 0 1px #b8860f inset' });
  b.southPanel(c + 0.38, r, 0.06, 16, 20, '#c9a043', z + 5);
}
function shipBay(b: SceneBuilder, c: number, r: number): void {
  b.isoBox(c, r - 0.1, 0.2, 1.2, 46, { top: '#3a4060', l: '#1a1f30', r: '#2a3048' });
  b.isoBox(c + 1.0, r - 0.1, 0.2, 1.2, 46, { top: '#3a4060', l: '#1a1f30', r: '#2a3048' });
  const door = [b.pt(c + 0.2, r, 0), b.pt(c + 1.0, r, 0), b.pt(c + 1.0, r, 40), b.pt(c + 0.2, r, 40)];
  b.poly(door, 'repeating-linear-gradient(180deg,#323a54 0 3px,#222a40 3px 6px)', zidx(c + 1, r + 1) + 4);
  const warn = [b.pt(c + 0.2, r, 6), b.pt(c + 1.0, r, 6), b.pt(c + 1.0, r, 9), b.pt(c + 0.2, r, 9)];
  b.poly(warn, 'repeating-linear-gradient(45deg,#ffd27a 0 5px,#3a3020 5px 10px)', zidx(c + 1, r + 1) + 5);
  b.rug(c + 0.25, r + 0.05, 0.7, 0.06, 'rgba(255,210,122,.35)', zidx(c + 1, r) + 1);
  b.led(c + 0.6, r, 42, '#6cc47a', true, zidx(c + 1, r + 1) + 6);
}
function crateStack(b: SceneBuilder, c: number, r: number): void {
  const slat = (cc: number, rr: number, h0: number) => {
    b.southPanel(cc, rr, 0.4, h0 + 2, h0 + 3, '#3a2818', zidx(cc + 0.4, rr) + 5);
    b.southPanel(cc, rr, 0.4, h0 + 9, h0 + 10, '#3a2818', zidx(cc + 0.4, rr) + 5);
  };
  b.contactShadow(c + 0.45, r + 0.25, 40, 20);
  b.isoBox(c, r, 0.4, 0.4, 14, { top: '#9a7350', l: '#4a3628', r: '#7a5a3c' });
  slat(c, r, 1);
  b.southPanel(c + 0.08, r, 0.22, 5, 11, '#d9d3c4', zidx(c + 0.4, r) + 6);
  b.isoBox(c + 0.5, r + 0.1, 0.4, 0.4, 14, { top: '#8e6a48', l: '#42301f', r: '#6e5232' });
  slat(c + 0.5, r + 0.1, 1);
  b.isoBox(c + 0.2, r - 0.1, 0.4, 0.4, 30, { top: '#a87f57', l: '#4a3628', r: '#7a5a3c' });
  b.southPanel(c + 0.28, r - 0.1, 0.06, 18, 30, '#c9bfa6', zidx(c + 0.6, r) + 7);
}

/* ========================= buildScene.ts ========================= */
const HALL_TINT = 'rgba(255,255,255,.045)';
const FLOOR_TINT = 'rgba(255,255,255,.02)';
function buildScene(): { layout: Layout; nodes: SceneNode[]; roomLabels: RoomLabel[] } {
  const layout = computeLayout();
  const b = new SceneBuilder(layout);
  for (let r = 0; r <= R; r++) {
    for (let c = 0; c <= C; c++) {
      const key = roomAt(c, r);
      if (key === 'build') { b.buildmark(c, r, c === 12 && r === 4); continue; }
      const base = key ? ROOMS[key].tint : HALLS.includes(c) ? HALL_TINT : FLOOR_TINT;
      b.tile(c, r, base, zidx(c, r));
    }
  }
  for (const key of Object.keys(ROOMS) as RoomKey[]) {
    const room = ROOMS[key];
    if (!room.wall) continue;
    const z = zidx(room.c0, room.r0) - 3;
    b.wallEdge(room.c0, room.r0, room.c1 + 1, room.r0, WALLH, room.wall, z, 'brightness(.82)');
    b.wallEdge(room.c0, room.r0, room.c0, room.r1 + 1, WALLH, room.wall, z, 'brightness(.6)');
  }
  for (const key of Object.keys(ROOMS) as RoomKey[]) {
    if (key === 'build') continue;
    const room = ROOMS[key];
    b.label((room.c0 + room.c1) / 2, (room.r0 + room.r1) / 2, room.label, key);
  }
  // 休息室
  patternRug(b, 0.4, 2.2, 2.8, 3.2, 'rgba(176,122,142,.4)', 'rgba(120,84,100,.5)');
  sofa(b, 0.5, 2.4, 1.7);
  sofa(b, 0.5, 4.8, 1.7);
  coffeeBar(b, 2.3, 6.4);
  bookcase(b, 0.15, 0.4, 2.0);
  bigPlant(b, 2.9, 1.0);
  plant(b, 0.5, 6.6);
  plant(b, 2.9, 8.4);
  b.cat(1.7, 3.6);
  windowWall(b, 0.6, 2.6, 0);
  wallPoster(b, 0.05, 2.0, 1.1, ['#2a3550', '#5a86c0', '#ffd27a']);
  wallClock(b, 0.05, 5.6, 34);
  waterCooler(b, 0.2, 8.3);
  pottedShelf(b, 2.95, 5.3);
  ceilDuct(b, 0.5, 2.6, 0.2, 48);
  cableRun(b, 2.4, 0.6, 46);
  // 工位区
  DESKS.forEach(([c, r]) => deskUnit(b, c, r));
  serverRack(b, 5.3, 8.6);
  serverRack(b, 6.6, 8.6);
  whiteboard(b, 7.6, 0, 1.6);
  plant(b, 8.9, 8.6);
  windowWall(b, 5.6, 7.2, 0);
  wallPoster(b, 8.5, 0.0, 1.1, ['#243042', '#46a0a0', '#5ce0ff']);
  ceilDuct(b, 5.4, 7.2, 0.0, 50, '#283044');
  ceilDuct(b, 5.4, 7.2, 4.0, 50, '#283044');
  deskLamp(b, 5.4, 0.65);
  deskLamp(b, 7.4, 0.65);
  deskLamp(b, 9.4, 0.65);
  pottedShelf(b, 8.95, 0.2);
  // 右列四间
  qaBench(b, 11.7, 0.6);
  plant(b, 12.8, 0.3);
  wallClock(b, 11.1, 0.2, 30);
  deskLamp(b, 11.0, 0.95);
  board(b, 11.2, 2.4);
  memoryBook(b, 12.6, 2.6);
  plant(b, 12.9, 3.5);
  wallPoster(b, 11.05, 2.0, 1.0, ['#3a2e1a', '#e6bd6c', '#ffd27a']);
  deskLamp(b, 12.2, 2.2);
  serverRack(b, 11.3, 6.3);
  safeBox(b, 12.6, 7.0);
  cableRun(b, 11.4, 6.0, 44);
  ceilDuct(b, 11.2, 13, 6.0, 50, '#2a2218');
  shipBay(b, 11.6, 8.3);
  crateStack(b, 12.7, 9.0);
  crateStack(b, 11.2, 9.1);
  pottedShelf(b, 11.1, 8.2);
  // 顶光
  b.ceilLamp(1.8, 4, 'rgba(255,200,150,.5)');
  b.ceilLamp(7, 3, 'rgba(150,190,255,.46)');
  b.ceilLamp(7, 7, 'rgba(150,190,255,.42)');
  b.ceilLamp(12, 1, 'rgba(150,230,200,.46)');
  b.ceilLamp(12, 3, 'rgba(255,210,140,.4)');
  b.ceilLamp(12, 7, 'rgba(255,210,140,.4)');
  // 浮尘（静态）
  const dusts: Array<[number, number, number, number, number, boolean]> = [
    [2.1, 3.4, 38, 0.32, 3, true], [6.3, 2.1, 44, 0.28, 2.4, false], [8.2, 5.6, 30, 0.4, 3.2, false],
    [4.5, 7.2, 50, 0.22, 2.6, false], [11.6, 2.8, 40, 0.3, 3, true], [1.2, 6.8, 36, 0.26, 2.8, false],
    [9.4, 1.4, 48, 0.34, 2.2, false], [12.4, 6.4, 34, 0.24, 3, true], [3.6, 4.9, 42, 0.3, 2.5, false],
    [7.1, 8.3, 28, 0.38, 3.4, false], [5.8, 3.7, 46, 0.2, 2.7, false], [10.2, 7.6, 38, 0.28, 3, false],
  ];
  dusts.forEach(([c, r, h, o, s, w]) => b.dust(c, r, h, o, s, w));
  return { layout, nodes: b.nodes, roomLabels: b.roomLabels };
}

/* ========================= workers (静态) ========================= */
type WorkerRole = 'emp' | 'mgr' | 'aud';
interface PlacedWorker { id: string; role: WorkerRole; x: number; y: number; z: number; hood: readonly [string, string]; working?: boolean; lean?: boolean; awaiting?: boolean; label?: string }
const HOODS: ReadonlyArray<readonly [string, string]> = [
  ['#5a86c0', '#3f5f8f'], ['#a566a8', '#7a3f7a'], ['#46a0a0', '#2f7070'], ['#6a6ad0', '#43439a'], ['#c07888', '#945565'], ['#5a8ab0', '#3f6a8a'],
];
function shade(hex: string, d: number): string {
  const n = parseInt(hex.slice(1), 16);
  const cl = (v: number) => Math.max(0, Math.min(255, v));
  const rr = cl((n >> 16) + d);
  const g = cl(((n >> 8) & 255) + d);
  const bb = cl((n & 255) + d);
  return '#' + ((rr << 16) | (g << 8) | bb).toString(16).padStart(6, '0');
}
function placeWorkers(layout: Layout): PlacedWorker[] {
  const ws: PlacedWorker[] = [];
  // 3 个在工位敲键（带任务气泡），2 个在休息室
  const busyLabels = ['做转写的导出功能', '修登录态丢失', '给看板加暗色模式'];
  for (let i = 0; i < 3; i++) {
    const [dc, dr] = DESKS[i];
    const p = iso(layout, dc, dr);
    ws.push({ id: `emp${i}`, role: 'emp', x: p.x, y: p.y, z: zidx(dc, dr) + 5, hood: HOODS[i % HOODS.length], working: true, lean: true, label: busyLabels[i] });
  }
  const loungeCells: Array<[number, number]> = [[1, 2], [2, 4]];
  for (let i = 0; i < 2; i++) {
    const [c, r] = loungeCells[i];
    const p = iso(layout, c, r);
    ws.push({ id: `emp${3 + i}`, role: 'emp', x: p.x, y: p.y, z: zidx(c, r) + 5, hood: HOODS[(3 + i) % HOODS.length], awaiting: i === 1 });
  }
  const mp = iso(layout, 11.5, 3.3);
  ws.push({ id: 'mgr', role: 'mgr', x: mp.x, y: mp.y, z: zidx(11.5, 3.3) + 5, hood: ['#e0a050', '#b07a30'], label: '经理' });
  const ap = iso(layout, 11.2, 0.95);
  ws.push({ id: 'aud', role: 'aud', x: ap.x, y: ap.y, z: zidx(11.2, 0.95) + 10, hood: ['#46a0a0', '#2f7070'], lean: true, label: '审计' });
  return ws;
}

/* ============================ 渲染 ============================ */
function nodeChildren(node: SceneNode): ReactNode {
  if (node.composite === 'cat') {
    return (<><div className="t" /><div className="b"><div className="e1" /><div className="e2" /></div></>);
  }
  if (node.mark) return <b>＋</b>;
  return node.text;
}

function WorkerSprite({ w }: { w: PlacedWorker }) {
  const [hood, torso] = w.hood;
  const cls = ['worker', w.role, w.working && 'working', w.lean && 'lean', w.awaiting && 'awaiting', w.role === 'emp' && 'emp'].filter(Boolean).join(' ');
  const style = { left: w.x, top: w.y, zIndex: w.z, '--hood': hood, '--hoodL': shade(hood, 26), '--hoodD': shade(hood, -34), '--torso': torso, '--torsoL': shade(torso, 24), '--torsoD': shade(torso, -30) } as CSSProperties;
  return (
    <div className={cls} style={style}>
      <div className="shadow" />
      <div className="body"><div className="stack">
        <div className="hair" /><div className="hood" /><div className="phones"><i /></div>
        <div className="visor" /><div className="face" /><div className="eye" />
        <div className="torso" /><div className="arms" /><div className="clip" /><div className="legs" />
        {w.role === 'mgr' && (<><div className="crown" /><div className="mantle" /><div className="robe" /></>)}
      </div></div>
    </div>
  );
}

const OFFICE_CSS = `
.qv-office { position: absolute; inset: 0; overflow: hidden; image-rendering: pixelated;
  -webkit-font-smoothing: antialiased; background: radial-gradient(130% 100% at 50% 32%, #1b2440 0%, #10162b 62%, #0a0e1a 100%); }
.qv-office .world { position: absolute; transform-origin: 0 0; }
.qv-office .tile { position: absolute; width: 64px; height: 32px; margin-left: -32px; margin-top: -16px; clip-path: polygon(50% 0,100% 50%,50% 100%,0 50%); }
.qv-office .buildmark { position: absolute; width: 64px; height: 32px; margin-left: -32px; margin-top: -16px; clip-path: polygon(50% 0,100% 50%,50% 100%,0 50%); background: repeating-linear-gradient(45deg, transparent 0 5px, rgba(255,210,122,.10) 5px 7px); display: grid; place-items: center; }
.qv-office .buildmark b { color: #7c89ad; font-size: 13px; font-weight: 400; }
.qv-office .poly { position: absolute; inset: 0; pointer-events: none; }
.qv-office .rect { position: absolute; pointer-events: none; }
.qv-office .glow { position: absolute; border-radius: 50%; pointer-events: none; -webkit-mask-image: radial-gradient(circle, #000 28%, transparent 72%); mask-image: radial-gradient(circle, #000 28%, transparent 72%); }
.qv-office .godray { position: absolute; pointer-events: none; opacity: .32; background: linear-gradient(180deg, rgba(173,214,255,.4) 0%, rgba(160,200,255,.14) 42%, rgba(160,200,255,0) 92%); clip-path: polygon(34% 0, 66% 0, 92% 100%, 8% 100%); transform-origin: 50% 0; }
.qv-office .godray.b { clip-path: polygon(44% 0, 58% 0, 78% 100%, 20% 100%); }
.qv-office .pled { position: absolute; width: 2px; height: 2px; margin-left: -1px; margin-top: -1px; border-radius: 1px; pointer-events: none; }
.qv-office .pspeck { position: absolute; width: 2px; height: 2px; border-radius: 1px; pointer-events: none; }
.qv-office .pcshadow { position: absolute; border-radius: 50%; background: rgba(0,0,0,.3); pointer-events: none; }
.qv-office .pscan { position: absolute; pointer-events: none; opacity: .5; background: repeating-linear-gradient(0deg, rgba(255,255,255,.10) 0 1px, transparent 1px 3px); }
.qv-office .dust { position: absolute; border-radius: 50%; background: #fff; pointer-events: none; }
.qv-office .cat { position: absolute; image-rendering: pixelated; pointer-events: none; }
.qv-office .cat .b { position: absolute; width: 16px; height: 8px; background: #cbb89a; border-radius: 4px 4px 2px 2px; bottom: 0; }
.qv-office .cat .e1, .qv-office .cat .e2 { position: absolute; width: 0; height: 0; border-left: 3px solid transparent; border-right: 3px solid transparent; border-bottom: 4px solid #cbb89a; top: -3px; }
.qv-office .cat .e1 { left: 1px; } .qv-office .cat .e2 { left: 9px; }
.qv-office .cat .t { position: absolute; width: 8px; height: 3px; background: #cbb89a; border-radius: 2px; right: -6px; bottom: 4px; }
.qv-office .worker { position: absolute; width: 24px; height: 40px; margin-left: -12px; margin-top: -34px; image-rendering: pixelated; }
.qv-office .worker .shadow { position: absolute; left: 50%; bottom: -2px; width: 18px; height: 6px; margin-left: -9px; background: rgba(0,0,0,.36); border-radius: 50%; }
.qv-office .worker .body { position: absolute; left: 0; bottom: 6px; width: 24px; height: 34px; filter: drop-shadow(0 1px 0 rgba(0,0,0,.55)); }
.qv-office .worker .stack { position: absolute; inset: 0; }
.qv-office .worker .legs { position: absolute; left: 5px; bottom: 0; width: 14px; height: 7px; background: linear-gradient(90deg,#343c4c 0 50%,#262c38 50% 100%); border-radius: 0 0 1px 1px; }
.qv-office .worker .torso { position: absolute; left: 2px; top: 14px; width: 20px; height: 15px; border-radius: 1px; background: linear-gradient(90deg, var(--torsoL,#4a6a9a) 0 5px, var(--torso,#3f5f8f) 5px 15px, var(--torsoD,#2f4a72) 15px 20px); }
.qv-office .worker.lean .torso { left: 3px; }
.qv-office .worker .arms { position: absolute; left: 2px; top: 21px; width: 20px; height: 5px; opacity: 0; }
.qv-office .worker.lean .arms { opacity: 1; left: 3px; }
.qv-office .worker .arms::before, .qv-office .worker .arms::after { content: ""; position: absolute; top: 0; width: 5px; height: 5px; background: var(--torsoD,#2f4a72); border-radius: 1px; }
.qv-office .worker .arms::before { left: 0; } .qv-office .worker .arms::after { right: 0; }
.qv-office .worker .hair { position: absolute; left: 5px; top: 2px; width: 14px; height: 7px; background: linear-gradient(90deg,#473630 0 50%,#33251f 50% 100%); border-radius: 2px 2px 0 0; }
.qv-office .worker .hood { position: absolute; left: 3px; top: 3px; width: 18px; height: 12px; border-radius: 3px 3px 1px 1px; background: linear-gradient(90deg, var(--hoodL,#6a96d0) 0 4px, var(--hood,#5a86c0) 4px 14px, var(--hoodD,#456ba0) 14px 18px); }
.qv-office .worker .face { position: absolute; left: 7px; top: 9px; width: 10px; height: 7px; border-radius: 1px; background: linear-gradient(90deg,#ffceb0 0 6px,#e9b193 6px 10px); }
.qv-office .worker .eye { position: absolute; left: 12px; top: 11px; width: 2px; height: 2px; background: #2a2330; border-radius: 1px; }
.qv-office .worker .phones { position: absolute; left: 2px; top: 4px; width: 20px; height: 10px; opacity: 0; }
.qv-office .worker.emp .phones { opacity: 1; }
.qv-office .worker .phones::before, .qv-office .worker .phones::after { content: ""; position: absolute; top: 4px; width: 3px; height: 6px; background: #20242e; border-radius: 1px; }
.qv-office .worker .phones::before { left: 0; } .qv-office .worker .phones::after { right: 0; }
.qv-office .worker .phones i { position: absolute; left: 3px; top: 0; width: 14px; height: 4px; border: 2px solid #20242e; border-bottom: 0; border-radius: 7px 7px 0 0; }
.qv-office .worker.mgr { margin-top: -40px; }
.qv-office .worker.mgr .hood { top: 1px; background: linear-gradient(90deg,#f2c468 0 4px,#e0a050 4px 14px,#b07a30 14px 18px); }
.qv-office .worker.mgr .hair { top: 0; }
.qv-office .worker.mgr .torso { background: linear-gradient(90deg,#e8b45a 0 5px,#d49a40 5px 15px,#a8742c 15px 20px); }
.qv-office .worker.mgr .crown { position: absolute; left: 8px; top: -1px; width: 8px; height: 4px; background: linear-gradient(90deg,#ffe6ad,#e0a050); border-radius: 3px 3px 0 0; }
.qv-office .worker.mgr .mantle { position: absolute; left: 1px; top: 13px; width: 22px; height: 4px; background: #8a5e26; border-radius: 2px; box-shadow: inset 0 1px 0 rgba(255,224,150,.45); }
.qv-office .worker.mgr .robe { position: absolute; left: 2px; top: 25px; width: 20px; height: 15px; border-radius: 2px 2px 3px 3px; background: linear-gradient(90deg,#d49a40 0 5px,#b07a30 5px 15px,#8a5e26 15px 20px); }
.qv-office .worker.mgr .robe::after { content: ""; position: absolute; left: 9px; top: 1px; width: 2px; height: 13px; background: #7a5020; }
.qv-office .worker.mgr .legs { display: none; }
.qv-office .worker .visor { position: absolute; left: 5px; top: 9px; width: 14px; height: 3px; background: #1e3a3a; opacity: 0; border-radius: 1px; }
.qv-office .worker.aud .visor { opacity: 1; }
.qv-office .worker .clip { position: absolute; right: -3px; top: 19px; width: 8px; height: 10px; opacity: 0; background: linear-gradient(180deg,#d9dde4 0 70%,#b7bcc6 70% 100%); border: 1px solid #6a7078; border-radius: 1px; }
.qv-office .worker .clip::before { content: ""; position: absolute; left: 2px; top: -2px; width: 4px; height: 2px; background: #8a9098; border-radius: 1px; }
.qv-office .worker.aud .clip { opacity: 1; }
.qv-office .worker.aud .arms { opacity: 1; left: 2px; top: 20px; }
.qv-office .roomlabel { position: absolute; transform: translate(-50%,-50%); font-size: 11.5px; letter-spacing: 1.2px; color: #eef2fb; background: rgba(10,14,26,.82); padding: 3px 10px; border-radius: 8px; white-space: nowrap; border: 1px solid rgba(255,255,255,.06); font-family: -apple-system,"SF Pro Text","Inter","PingFang SC",sans-serif; }
.qv-office .wlabel { position: absolute; transform: translate(-50%,-100%); font-size: 10.5px; line-height: 1.3; font-weight: 500; background: #f4f6fb; color: #232838; padding: 2px 8px; border-radius: 7px; white-space: nowrap; max-width: 150px; overflow: hidden; text-overflow: ellipsis; box-shadow: 0 2px 6px rgba(0,0,0,.4); font-family: -apple-system,"SF Pro Text","Inter","PingFang SC",sans-serif; }
.qv-office .wlabel::after { content: ""; position: absolute; left: 50%; bottom: -3px; margin-left: -3px; width: 0; height: 0; border: 3px solid transparent; border-top-color: #f4f6fb; }
.qv-office .wlabel.mgr { background: #fff2d6; color: #5a3e10; font-weight: 600; } .qv-office .wlabel.mgr::after { border-top-color: #fff2d6; }
.qv-office .wlabel.aud { background: #d8f0e8; color: #1c4a3c; font-weight: 600; } .qv-office .wlabel.aud::after { border-top-color: #d8f0e8; }
.qv-office .vignette { position: absolute; inset: 0; pointer-events: none; z-index: 8500; background: radial-gradient(130% 110% at 50% 42%,rgba(0,0,0,0) 52%,rgba(0,0,0,.28) 84%,rgba(0,0,0,.6) 100%); }
`;

/**
 * 渲染整间等距像素办公室，填满给定画布并居中。
 * @param width/height 画布尺寸（默认 1440×900，对齐 StyleCard 虚拟画布）
 * @param yBias 垂直偏移（正=下移，给顶栏让位）
 */
export function OfficeScene({ width = 1440, height = 900, yBias = 6 }: { width?: number; height?: number; yBias?: number }) {
  const scene = buildScene();
  const { layout } = scene;
  const workers = placeWorkers(layout);
  // 满 fit 缩放（worldW/H 已含 mX/mT 边距），水平居中、垂直近中（同真实相机 fit）。
  const s = Math.min(width / layout.worldW, height / layout.worldH);
  const ox = (width - layout.worldW * s) / 2;
  const oy = (height - layout.worldH * s) / 2 + yBias;
  const proj = (wx: number, wy: number) => ({ x: ox + wx * s, y: oy + wy * s });

  return (
    <div className="qv-office" style={{ width, height }}>
      <style>{OFFICE_CSS}</style>
      <div className="world" style={{ width: layout.worldW, height: layout.worldH, transform: `translate(${ox}px,${oy}px) scale(${s})` }}>
        {scene.nodes.map((n) => (
          <div key={n.key} className={n.className} style={n.style}>{nodeChildren(n)}</div>
        ))}
        {workers.map((w) => <WorkerSprite key={w.id} w={w} />)}
      </div>
      {scene.roomLabels.map((l, i) => {
        const p = proj(l.wx, l.wy);
        return <div key={i} className="roomlabel" style={{ left: p.x, top: p.y }}>{l.text}</div>;
      })}
      {workers.map((w) => {
        if (!w.label) return null;
        const p = proj(w.x, w.y - 42);
        const cls = `wlabel${w.role === 'mgr' ? ' mgr' : ''}${w.role === 'aud' ? ' aud' : ''}`;
        return <div key={w.id} className={cls} style={{ left: p.x, top: p.y }}>{w.label}</div>;
      })}
      <div className="vignette" />
    </div>
  );
}

/* ====================== 顶栏 HUD + 控件（真实复刻） ====================== */
const UI = '-apple-system,"SF Pro Text","Inter","PingFang SC",sans-serif';
const MONO = '"SF Mono","JetBrains Mono",ui-monospace,SFMono-Regular,monospace';

function Stat({ label, value, unit, lead }: { label?: string; value: string; unit?: string; lead?: string }) {
  return (
    <span style={{ color: '#aab4cd', fontSize: 11.5, letterSpacing: '0.15px', display: 'inline-flex', alignItems: 'baseline', gap: 5 }}>
      {lead}{label}
      <b style={{ color: '#eef2fb', fontFamily: MONO, fontVariantNumeric: 'tabular-nums', fontWeight: 600, letterSpacing: 0 }}>{value}</b>
      {unit && <span style={{ color: '#aab4cd' }}>{unit}</span>}
    </span>
  );
}

function Ghost({ children, icon }: { children: ReactNode; icon?: boolean }) {
  return (
    <button style={{ fontFamily: UI, fontSize: 12, fontWeight: 500, letterSpacing: '0.1px', color: '#aab4cd', background: 'rgba(18,24,42,.82)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 11, padding: icon ? '7px 9px' : '7px 11px', display: 'inline-flex', alignItems: 'center', gap: 7, boxShadow: 'inset 0 1px 0 rgba(255,255,255,.10)', cursor: 'default' }}>
      {children}
    </button>
  );
}

/** 真实顶栏：左 HUD 胶囊（手动/自治 + 4 统计 + 可选预算条）+ 右控件两组 + 绿「CEO 下目标」。 */
export function Topbar({ autonomous = false, mode = '模拟' }: { autonomous?: boolean; mode?: string }) {
  return (
    <div style={{ position: 'absolute', top: 14, left: 16, right: 16, zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '0 18px', height: 42, background: 'rgba(11,15,26,.72)', backdropFilter: 'blur(13px) saturate(1.25)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 14, boxShadow: '0 1px 2px rgba(0,0,0,.3), 0 4px 16px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.10)', fontFamily: UI }}>
        <span style={autonomous
          ? { fontSize: 11, fontWeight: 600, letterSpacing: '0.2px', padding: '3px 9px', borderRadius: 999, color: '#0e1a10', background: 'linear-gradient(180deg,#a6eaa6,#6cc47a)', boxShadow: '0 0 12px rgba(108,196,122,.3)' }
          : { fontSize: 11, fontWeight: 600, letterSpacing: '0.2px', padding: '3px 9px', borderRadius: 999, color: '#76819c', background: 'rgba(8,11,20,.55)', border: '1px solid rgba(255,255,255,.06)' }}>
          {autonomous ? '自治中' : '手动调度'}
        </span>
        <Stat label="经理 " value="1" />
        <Stat label="运行 " value="0" />
        <Stat label="通过 " value="0" />
        <Stat lead="$ " value="0.00" unit=" 今夜" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <Ghost icon><span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 600, color: '#eef2fb', border: '1px solid rgba(255,255,255,.14)', borderRadius: 5, padding: '1px 5px', lineHeight: 1.3 }}>⌘K</span></Ghost>
        <span style={{ display: 'inline-flex', gap: 3 }}><Ghost>经理</Ghost><Ghost>队列</Ghost><Ghost>追溯</Ghost><Ghost>晨报</Ghost></span>
        <span style={{ display: 'inline-flex', gap: 3 }}><Ghost>人事部</Ghost><Ghost>记忆</Ghost><Ghost>设置</Ghost></span>
        <button style={{ fontFamily: UI, fontSize: 12, fontWeight: 600, color: '#0e1a10', border: 0, borderRadius: 11, padding: '7px 11px', display: 'inline-flex', alignItems: 'center', gap: 7, cursor: 'default', background: 'linear-gradient(180deg,#a6eaa6,#6cc47a)', boxShadow: '0 1px 2px rgba(0,0,0,.3), 0 6px 18px rgba(108,196,122,.28), inset 0 1px 0 rgba(255,255,255,.4)' }}>
          <span style={{ width: 0, height: 0, borderLeft: '5px solid currentColor', borderTop: '4px solid transparent', borderBottom: '4px solid transparent', opacity: 0.9 }} />
          CEO 下目标 <span style={{ marginLeft: 6, opacity: 0.8, fontSize: 11 }}>{mode}</span>
        </button>
      </div>
    </div>
  );
}

/** 底部状态条：呼吸绿点 + 旁白。 */
export function Caption({ text }: { text: string }) {
  return (
    <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', maxWidth: '80%', zIndex: 9000, display: 'flex', alignItems: 'center', gap: 11, padding: '9px 17px', background: 'rgba(11,15,26,.72)', backdropFilter: 'blur(13px) saturate(1.25)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 14, boxShadow: '0 1px 2px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.10)', fontFamily: UI, fontSize: 12.5, letterSpacing: '0.15px', color: '#aab4cd' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7bc47e', boxShadow: '0 0 9px #7bc47e', flex: 'none' }} />
      {text}
    </div>
  );
}
