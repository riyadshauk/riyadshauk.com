module.exports = {
  apps: [
    {
      name: 'riyadshauk.com-nextjs',
      script: 'npm',
      args: 'start',
      cwd: '/home/riyad/repos/riyadshauk.com-2025',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      error_file: '/home/riyad/.pm2/logs/riyadshauk.com-nextjs-error.log',
      out_file: '/home/riyad/.pm2/logs/riyadshauk.com-nextjs-out.log',
      log_file: '/home/riyad/.pm2/logs/riyadshauk.com-nextjs-combined.log',
      time: true
    }
  ]
}; 