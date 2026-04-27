import { PreviewFrame } from '../_layout';
import { AgentChatStreamScene } from '../pages/dashboard/sage/agent-chat-stream';

// products/sage 封面 = 直接展示 agent 问答页（用户要求：不要登录页）
export default function SageProductPreview() {
  return (
    <PreviewFrame bg="rgb(249,249,249)" padded={false}>
      <AgentChatStreamScene themeHex="#10b981" themeLight="#34d399" themeSelection="#a7f3d0" />
    </PreviewFrame>
  );
}
