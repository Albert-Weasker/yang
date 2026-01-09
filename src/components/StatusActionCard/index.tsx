import { Card, Button, Upload, message, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ProjectStatus } from '@/types';
import { STATUS_ACTION_TEXT, STATUS_ATTACHMENT_TEXT } from '@/utils/constants';
import { useResponsive } from '@/hooks/useResponsive';
import type { UploadProps } from 'antd';

interface StatusActionCardProps {
  currentStatus: ProjectStatus;
  nextStatus: ProjectStatus;
  onStatusUpdate: (status: ProjectStatus, file: File) => Promise<void>;
  loading?: boolean;
}

export const StatusActionCard: React.FC<StatusActionCardProps> = ({
  currentStatus,
  nextStatus,
  onStatusUpdate,
  loading = false,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { isMobile } = useResponsive();

  const handleUpload: UploadProps['beforeUpload'] = (file) => {
    setFile(file);
    return false;
  };

  const handleSubmit = async () => {
    if (!file) {
      message.warning('请先选择文件');
      return;
    }

    setUploading(true);
    try {
      await onStatusUpdate(nextStatus, file);
      message.success('状态更新成功');
      setFile(null);
    } catch (error) {
      message.error('状态更新失败');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card title={`当前状态：${currentStatus}`} style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}>
          <strong>下一步操作：</strong>
          {STATUS_ACTION_TEXT[nextStatus]}
        </div>
        <div style={{ marginBottom: 16 }}>
          <Upload
            beforeUpload={handleUpload}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            showUploadList={true}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />} block={isMobile}>
              选择{STATUS_ATTACHMENT_TEXT[nextStatus]}
            </Button>
          </Upload>
          {file && (
            <div style={{ marginTop: 8, color: '#666', wordBreak: 'break-all' }}>
              已选择：{file.name}
            </div>
          )}
        </div>
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={uploading || loading}
          disabled={!file}
          block={isMobile}
          size={isMobile ? 'large' : 'middle'}
        >
          提交并更新状态
        </Button>
      </div>
    </Card>
  );
};
