import { PreviewFrame } from '../../../_layout';
import { OfficeScene, Topbar, Caption } from '../../../_templates/quiver-office';

/**
 * 玻璃顶栏 HUD —— 悬浮在等距像素办公室之上的磨砂玻璃指挥栏：
 * 左 HUD 胶囊（自治徽标 + 经理/运行/通过/$今夜）+ 右控件两组 + 绿「CEO 下目标」。
 * 以真实办公室世界为背景，1:1 还原 quiver app 的顶栏在位语境（此处展示「自治中」绿态）。
 */
export default function GlassTopbarHudPreview() {
  return (
    <PreviewFrame bg="#0a0e1a" padded={false}>
      <div style={{ position: 'relative', width: 1440, height: 900 }}>
        <OfficeScene width={1440} height={900} yBias={40} />
        <Topbar autonomous mode="真实" />
        <Caption text="自治推进中 —— 经理按并发上限并行调度，整夜把队列消化完，main 始终是绿的。" />
      </div>
    </PreviewFrame>
  );
}
