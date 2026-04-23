import { PreviewFrame } from '../_layout';
import { useState } from 'react';

/** 动效模板：可触发的 transition 演示 */
export default function MotionPreviewTemplate() {
  const [on, setOn] = useState(false);
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: 40 }}>
        <button onClick={() => setOn(!on)}>Toggle</button>
        <div
          style={{
            width: 120, height: 120, background: '#22d3ee',
            borderRadius: 4, transition: 'transform 150ms ease-out',
            transform: on ? 'translateX(200px)' : 'translateX(0)',
          }}
        />
      </div>
    </PreviewFrame>
  );
}
