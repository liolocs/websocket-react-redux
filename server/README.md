# Getting started

Run `yarn install` followed by `yarn start` (`npm` and `pnpm` work too, if you prefer those).

## Logging/debugging

The server uses the [`debug`](https://www.npmjs.com/package/debug) packages, so if you want more output,
you can adjust the `DEBUG` environment variable. The interview server is registered as `interview-server`.

## Notes

- Team IDs are consistent between restarts.
- Team strengths are computed at random on server startup[^1]
- The stream interval can be controlled with the `SERVER_STREAM_INTERVAL` environment variable (default `10_000`)
- The bind host and port can be controlled using `SERVER_HOST` and `SERVER_PORT`
- Setting `DEBUG='*'` gives you debugging logs for everything
  - If that is too noisy, you can use `DEBUG='interview-server*'` to only get the interview server's lines
  - To further reduce noise, you can set `DEBUG='interview-server* -interview-server:game'` to suppress the game debug info


[^1]: This means you can keep restarting the server until your favourite team is the strongest.
