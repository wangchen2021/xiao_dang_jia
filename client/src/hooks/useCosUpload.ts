import { useState, useCallback } from 'react';
import COS from 'cos-js-sdk-v5';
import { getCosSTS } from '@/api/common';

// 初始化 COS 实例（核心：动态获取临时密钥）
const createCosInstance = () => {
    return new COS({
        // 每次请求 COS 接口时，自动获取临时密钥
        getAuthorization: async (_options, callback) => {
            try {
                // 1. 请求后端接口获取临时密钥
                const res = await getCosSTS(); // 后端接口地址
                const { tmpSecretId, tmpSecretKey, sessionToken, expiredTime } = res.data;
                // 2. 将临时密钥传给 COS SDK（格式必须严格匹配）
                callback({
                    TmpSecretId: tmpSecretId,
                    TmpSecretKey: tmpSecretKey,
                    SecurityToken: sessionToken,
                    StartTime: Math.floor(Date.now()/1000), // 生效时间（当前时间）
                    ExpiredTime: expiredTime, // 过期时间（后端返回）
                });
            } catch (error) {
                console.error('获取 COS 临时密钥失败：', error);
            }
        },
    });
};

interface UploadFileConfig {
    maxSize: number
}

// 封装上传 Hook
export const useCosUpload = (folder = 'xiao_dang_jia/public/') => {
    const [progress, setProgress] = useState<number>(0); // 上传进度
    const [isUploading, setIsUploading] = useState<boolean>(false); // 上传状态
    const [error, setError] = useState<string | null>(null); // 错误信息
    const [fileUrl, setFileUrl] = useState<string | null>(null); // 上传后的文件URL

    // 初始化 COS 实例（只创建一次）
    const cos = createCosInstance();

    /**
     * 上传文件到 COS
     * @param file 要上传的文件对象
     * @returns 上传后的文件URL
     */
    const uploadFile = useCallback(
        async (file: File, config: UploadFileConfig = {
            maxSize: 10 * 1024 * 1024
        }): Promise<string> => {
            if (!file) {
                throw new Error('请选择要上传的文件');
            }

            // 重置状态
            setProgress(0);
            setError(null);
            setIsUploading(true);

            try {
                const { maxSize } = config
                // 1. 文件校验（可选，根据业务调整）
                const FILE_SIZE_LIMIT = maxSize //10MB
                const ALLOW_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

                if (file.size > FILE_SIZE_LIMIT) {
                    throw new Error(`文件大小不能超过 ${FILE_SIZE_LIMIT / 1024 / 1024}MB`);
                }
                if (!ALLOW_TYPES.includes(file.type)) {
                    throw new Error(`仅支持 ${ALLOW_TYPES.join('、')} 格式`);
                }

                // 2. 生成唯一文件名（避免重复）
                const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${file.name.split('.').pop()}`;
                const key = `${folder}${fileName}`; // 存储路径：文件夹 + 文件名

                // 3. 从临时密钥中解析存储桶和地域（也可写死，建议配置到环境变量）
                // 示例：bucket = "recipe-1251234567", region = "ap-guangzhou"
                const BUCKET = import.meta.env.VITE_COS_BUCKET; // 前端环境变量
                const REGION = import.meta.env.VITE_COS_REGION;

                // 4. 上传文件到 COS
                const result = await new Promise<{ Location: string }>((resolve, reject) => {
                    cos.putObject(
                        {
                            Bucket: BUCKET,
                            Region: REGION,
                            Key: key,
                            Body: file,
                            onProgress: (progressData) => {
                                // 更新上传进度
                                const percent = Math.round((progressData.loaded / progressData.total) * 100);
                                setProgress(percent);
                            },
                        },
                        (err, data) => {
                            if (err) reject(err);
                            else resolve(data);
                        }
                    );
                });

                // 5. 拼接文件访问 URL（公有读存储桶可直接访问）
                const url = `https://${result.Location}`;
                setFileUrl(url);
                return url;
            } catch (err) {
                const errorMsg = err instanceof Error ? err.message : '上传失败，请重试';
                setError(errorMsg);
                throw err; // 抛出错误，供调用方处理
            } finally {
                setIsUploading(false);
            }
        },
        [folder, cos]
    );

    // 重置上传状态
    const resetUpload = useCallback(() => {
        setProgress(0);
        setError(null);
        setFileUrl(null);
    }, []);

    return {
        uploadFile,
        progress,
        isUploading,
        error,
        fileUrl,
        resetUpload,
    };
};