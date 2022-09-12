const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        math: 'always',
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};