import type { ReactNode } from 'react';

export function PreviewFrame({
  children,
  bg = '#fff',
  padded = true,
}: {
  children: ReactNode;
  bg?: string;
  padded?: boolean;
}) {
  return (
    <div style={{ minHeight: '100vh', background: bg, padding: padded ? 24 : 0 }}>
      {children}
    </div>
  );
}
