_watch(watchPath) {
    // duplicate the same massaging of options that watchpack performs
    // https://github.com/webpack/watchpack/blob/master/lib/DirectoryWatcher.js#L49
    // this isn't an elegant solution, but we'll improve it in the future
    const usePolling = this.watchOptions.poll ? true : undefined;
    const interval =
      typeof this.watchOptions.poll === 'number'
        ? this.watchOptions.poll
        : undefined;

    const options = {
      ignoreInitial: true,
      persistent: true,
      followSymlinks: false,
      atomic: false,
      alwaysStat: true,
      ignorePermissionErrors: true,
      ignored: this.watchOptions.ignored,
      usePolling,
      interval,
    };

    const watcher = chokidar.watch(watchPath, options);

    watcher.on('change', () => {
      this.sockWrite(this.sockets, 'content-changed');
    });

    this.contentBaseWatchers.push(watcher);
  }
