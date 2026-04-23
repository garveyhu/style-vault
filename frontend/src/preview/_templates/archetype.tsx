import { PreviewFrame } from '../_layout';

/** ARCHETYPE 模板：页面样板。拷贝时按具体 archetype 改结构 */
export default function ArchetypePreviewTemplate() {
  return (
    <PreviewFrame>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1>Archetype scaffold</h1>
        <p>按本 archetype 的定位，放 hero / feature grid / CTA 等组合。</p>
      </div>
    </PreviewFrame>
  );
}
