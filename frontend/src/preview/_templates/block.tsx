import { PreviewFrame } from '../_layout';

/** BLOCK 模板：页面可复用 section，单块居中，带 mock 数据 */
export default function BlockPreviewTemplate() {
  return (
    <PreviewFrame>
      <div style={{ maxWidth: 900, margin: '40px auto' }}>
        {/* 替换为具体 block */}
        <div>Block content here</div>
      </div>
    </PreviewFrame>
  );
}
