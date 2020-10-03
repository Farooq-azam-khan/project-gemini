module.exports = {
    purge: {
        enabled: true,
        content: ['./src/**/*.jsx',
            './src/**/*.js',
            './public/index.html'
        ]
    }
    ,
    theme: {},
    variants: {
        borderStyle: ['responsive', 'hover', 'focus'],
    },
    plugins: [],
}