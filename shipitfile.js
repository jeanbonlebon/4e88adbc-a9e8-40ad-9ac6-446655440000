module.exports = shipit => {
    
    shipit.initConfig({
	default: {
	    key: '/home/dev/.ssh/id_rsa',
	    keepReleases: 2,
	},
        staging: {
            servers: 'dev@192.168.222.147',
        },
    })

    shipit.task('copyConfig', async () => {
        await shipit.copyToRemote(
            'package.json',
            '/home/dev/package.json',
        )
    })
}
