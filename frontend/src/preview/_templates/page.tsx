import { PreviewFrame } from '../_layout';

/** PAGE 模板：整页样板。拷贝时按具体 page 改结构 */
export default function PagePreviewTemplate() {
  return (
    <PreviewFrame>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1>Page scaffold</h1>
        <p>按本 page 的定位，放 hero / feature grid / CTA 等组合。</p>
      </div>
    </PreviewFrame>
  );
}
