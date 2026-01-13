import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as tencentcloud from 'tencentcloud-sdk-nodejs';

// 初始化 STS 客户端构造函数
const StsClient = tencentcloud.sts.v20180813.Client;
// 提取 StsClient 实例的类型（核心修复）
type StsClientInstance = InstanceType<typeof StsClient>;

@Injectable()
export class CosService {
  private readonly stsClient: StsClientInstance; // 使用提取的实例类型
  private readonly secretId: string;
  private readonly secretKey: string;
  private readonly region: string;
  private readonly bucket: string;
  private readonly expiredSeconds: number;

  constructor(private configService: ConfigService) {
    // 1. 读取环境变量并强制校验
    this.secretId = this.configService.get<string>('TENCENT_CLOUD_SECRET_ID')!;
    this.secretKey = this.configService.get<string>('TENCENT_CLOUD_SECRET_KEY')!;
    this.region = this.configService.get<string>('COS_REGION')!;
    this.bucket = this.configService.get<string>('COS_BUCKET')!;
    this.expiredSeconds = Number(this.configService.get<number>('STS_EXPIRED_SECONDS', 3600)!);

    // 2. 校验核心环境变量是否存在
    this.validateEnvConfig();

    // 3. 初始化 STS 客户端（类型匹配）
    this.stsClient = new StsClient({
      credential: {
        secretId: this.secretId,
        secretKey: this.secretKey,
      },
      region: this.region,
      profile: {
        httpProfile: {
          endpoint: 'sts.tencentcloudapi.com',
        },
      },
    });
  }

  /**
   * 校验环境变量是否配置完整，缺失则抛出异常
   */
  private validateEnvConfig(): void {
    const requiredEnvs = [
      { key: 'TENCENT_CLOUD_SECRET_ID', value: this.secretId },
      { key: 'TENCENT_CLOUD_SECRET_KEY', value: this.secretKey },
      { key: 'COS_REGION', value: this.region },
      { key: 'COS_BUCKET', value: this.bucket },
    ];

    const missingEnvs = requiredEnvs.filter(item => !item.value);
    if (missingEnvs.length > 0) {
      const missingKeys = missingEnvs.map(item => item.key).join(', ');
      const errorMsg = `缺失必填环境变量：${missingKeys}，请检查 .env 文件配置`;
      throw new InternalServerErrorException(errorMsg);
    }

    if (!this.bucket.includes('-')) {
      const errorMsg = `COS_BUCKET 格式错误，必须为 桶名-APPID（如 recipe-1251234567）`;
      throw new InternalServerErrorException(errorMsg);
    }
  }

  /**
   * 获取 COS 临时密钥
   * @returns 临时密钥信息
   */
  async getCosStsToken() {
    try {
      const policy = {
        version: '2.0',
        statement: [
          {
            action: [
              'cos:PutObject',
              'cos:PostObject',
              'cos:InitiateMultipartUpload',
              'cos:UploadPart',
              'cos:CompleteMultipartUpload',
            ],
            resource: [
              `qcs::cos:${this.region}:uid/${this.bucket.split('-')[1]}:${this.bucket}/xiao_dang_jia/public/*`,
            ],
            effect: 'allow',
          },
        ],
      };

      const resp = await this.stsClient.GetFederationToken({
        Name: 'cos_upload_token',
        Policy: JSON.stringify(policy),
        DurationSeconds: this.expiredSeconds,
      });

      return {
        tmpSecretId: resp.Credentials?.TmpSecretId,
        tmpSecretKey: resp.Credentials?.TmpSecretKey,
        sessionToken: resp.Credentials?.Token,
        expiredTime: resp.ExpiredTime,
      };
    } catch (error) {
      throw error;
    }
  }
}