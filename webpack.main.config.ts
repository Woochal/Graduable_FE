import type { Configuration } from 'webpack';
import path from 'path';

const config: Configuration = {
    entry: './electron/main.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|\.webpack)/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    },
};

export default config;
