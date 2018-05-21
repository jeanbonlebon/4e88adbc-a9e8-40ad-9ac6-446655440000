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
            '/home/dev/4e88adbc-a9e8-40ad-9ac6-446655440000/build',
            '/var/www/supfile',
        )
    })

    shipit.task('deploy_front', function() {
        shipit.local('git pull origin master')
        .then(function(res) {
            console.log('Angular App is Updated with Repository')
            shipit.local('npm run build')      
            .then(function(res) {
                console.log('Production App is Builded')
                shipit.remote('rm -fr /var/www/supfile')
                .then(function(res) {
                    shipit.task('copyConfig', async () => {
                        await shipit.copyToRemote(
                            '/home/dev/4e88adbc-a9e8-40ad-9ac6-446655440000/build',
                            '/var/www/supfile',
                        )
                    })
                })
            })
        })
    })
}
