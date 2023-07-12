ARG DENO_VERSION=1.35.0

FROM denoland/deno:bin-$DENO_VERSION AS deno
FROM debian:11-slim

COPY --from=deno /deno /usr/local/bin/deno
COPY src /srv
RUN deno cache --reload --lock=lock.json /srv/deps.ts

CMD ["deno", "run", "-A", "/srv/feedenostr.ts"]