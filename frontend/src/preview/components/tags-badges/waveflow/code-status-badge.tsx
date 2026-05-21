import { PreviewFrame } from '../../../_layout';

const STATES = [
  { code: 200, label: '成功', bg: '#ecfdf5', text: '#047857', border: '#6ee7b7' },
  { code: 0, label: '进行中', bg: '#eff6ff', text: '#1d4ed8', border: '#93c5fd' },
  { code: 500, label: '失败', bg: '#fef2f2', text: '#b91c1c', border: '#fca5a5' },
  { code: null, label: '—', bg: '#f5f5f4', text: '#78716c', border: '#d6d3d1' },
];

export default function CodeStatusBadge() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · TAG</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 32px' }}>Code Status Badge</h1>

        <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(244,243,238,0.4)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
              <th style={th}>code</th>
              <th style={th}>label</th>
              <th style={th}>badge</th>
            </tr>
          </thead>
          <tbody>
            {STATES.map(s => (
              <tr key={String(s.code)} style={{ borderTop: '1px solid #f5f4ee' }}>
                <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', color: '#78716c' }}>{s.code ?? 'null'}</td>
                <td style={td}>{s.label}</td>
                <td style={td}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 6px', borderRadius: 4, border: `1px solid ${s.border}`, background: s.bg, color: s.text, fontSize: 11, fontWeight: 500 }}>
                    {s.label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewFrame>
  );
}

const th: React.CSSProperties = { padding: '6px 12px', textAlign: 'left', fontWeight: 500 };
const td: React.CSSProperties = { padding: '10px 12px' };
