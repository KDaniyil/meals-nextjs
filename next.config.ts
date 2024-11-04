import type { NextConfig } from 'next';
import { S3_BUCKET } from './utils/s3Path';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: S3_BUCKET,
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
