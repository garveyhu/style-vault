import { PreviewFrame } from '../../../_layout';
import { OfficeScene, Topbar, Caption } from '../../../_templates/quiver-office';

/**
 * 办公室指挥甲板 —— 单屏 CEO 甲板的忠实复刻：
 * 等距像素办公室世界（同 quiver 源码 buildScene）+ 玻璃顶栏 HUD + 底部状态条 + 暗角后期。
 * 画布固定 1440×900，对齐 StyleCard 虚拟画布，缩略卡里 1:1 还原真实 app。
 */
export default function OfficeCommandDeckPreview() {
  return (
    <PreviewFrame bg="#0a0e1a" padded={false}>
      <div style={{ position: 'relative', width: 1440, height: 900 }}>
        <OfficeScene width={1440} height={900} yBias={30} />
        <Topbar autonomous={false} mode="模拟" />
        <Caption text="你是 CEO。经理在领导区待命 —— 点「CEO 下目标」把一件事交给公司，它自己跑。" />
      </div>
    </PreviewFrame>
  );
}
