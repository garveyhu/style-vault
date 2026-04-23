import { Result, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Paragraph, Text } = Typography;

export default function NotInstalledPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] p-6">
      <Result
        icon={<ExclamationCircleOutlined style={{ color: '#faad14' }} />}
        title="Registry 未同步"
        subTitle={
          <div className="mx-auto max-w-xl text-left">
            <Paragraph>
              本项目是 <Text strong>style-vault 网站仓</Text>，需要从 skill 仓同步数据后才能展示内容。
            </Paragraph>
            <Paragraph>
              若你是 <Text strong>网站开发者</Text>，请执行：
              <br />
              <Text code>cd frontend &amp;&amp; yarn sync</Text>
            </Paragraph>
            <Paragraph>
              若你是 <Text strong>style-vault skill 的外部使用者</Text>，直接访问 skill 即可，
              不需要这个网站。
            </Paragraph>
          </div>
        }
      />
    </div>
  );
}
