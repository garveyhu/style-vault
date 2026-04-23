import { PreviewFrame } from '../_layout';

/** ATOM 模板：单体居中 + 3~5 种状态并列 */
export default function AtomPreviewTemplate() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <span>Default</span>
        <span>Hover</span>
        <span>Active</span>
        <span>Disabled</span>
      </div>
    </PreviewFrame>
  );
}
