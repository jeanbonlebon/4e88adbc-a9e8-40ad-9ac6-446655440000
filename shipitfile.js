module.exports = shipit => {
    
    shipit.initConfig({
        staging: {
            servers: 'dev@192.168.222.146',
        },
    })

    shipit.task('copyConfig', async () => {
        await shipit.copyToRemote(
            'package.json',
            '/home/dev/package.json',
        )
    })
}