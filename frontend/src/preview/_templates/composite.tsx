import { PreviewFrame } from '../_layout';

/** COMPOSITE 模板：场景块，单块居中，带 mock 数据 */
export default function CompositePreviewTemplate() {
  return (
    <PreviewFrame>
      <div style={{ maxWidth: 900, margin: '40px auto' }}>
        {/* 替换为具体 composite */}
        <div>Composite content here</div>
      </div>
    </PreviewFrame>
  );
}
