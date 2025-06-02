module.exports = {
    apps : [
      {
        name: 'ngrok',
        script: 'ngrok',
        args: 'http -host-header="rewrite" --domain=possum-robust-violently.ngrok-free.app 3500',
      },
    ],
  };
  