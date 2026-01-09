import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

interface FileUploaderProps {
  onChange?: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // MB
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onChange,
  accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png',
  maxSize = 10,
}) => {
  const props: UploadProps = {
    beforeUpload: (file) => {
      // 检查文件大小
      if (file.size / 1024 / 1024 > maxSize) {
        return false;
      }
      onChange?.(file);
      return false; // 阻止自动上传
    },
    accept,
    showUploadList: false,
    maxCount: 1,
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>选择文件</Button>
    </Upload>
  );
};
