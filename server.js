import configApp from './src/index.js'

const startApp = () => {
    try {
        configApp()
    } catch (error) {
        console.error('Failed to start the server:', error)
        process.exit(1)
    }
}

startApp()
