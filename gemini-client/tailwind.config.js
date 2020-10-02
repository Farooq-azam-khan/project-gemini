module.exports = {
    purge: {
        enabled: false,
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