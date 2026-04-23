import { Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { buildPrompt } from '../utils/prompt';
import type { RegistryItem } from '../../scripts/sync-from-skill/types';

type Props = {
  item: RegistryItem;
  extras?: RegistryItem[];
};

export function PromptCopyButton({ item, extras = [] }: Props) {
  const [messageApi, contextHolder] = message.useMessage();

  const handle = async () => {
    try {
      await navigator.clipboard.writeText(buildPrompt(item, extras));
      messageApi.success('Prompt 已复制');
    } catch {
      messageApi.error('复制失败，请手动复制');
    }
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" icon={<CopyOutlined />} onClick={handle}>
        复制 Prompt
      </Button>
    </>
  );
}

export default PromptCopyButton;
