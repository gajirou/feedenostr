import { parseFeed, Nostr, Relay } from './deps.ts';

const relayList = {
  "Damus"   : "wss://relay.damus.io",
  "Nokotaro": "wss://nostr-relay.nokotaro.com",
  "Relay-jp": "wss://relay-jp.nostr.wirednet.jp",
  "Relay.jp": "wss://relay.nostr.wirednet.jp"
};

const url           = Deno.env.get("FEED_URL");
const privateKey    = Deno.env.get("PRIVATE_KEY");
const targetMinutes = Deno.env.get("TARGET_MINUTES");
const pastDate      = Date.now() - (60 * targetMinutes * 1000);

const response = await fetch(url);
const xml      = await response.text();
const feed     = await parseFeed(xml);

const nostr = new Nostr();
nostr.privateKey = privateKey;

for(const key in relayList) {
  const value = relayList[key];
  nostr.relayList.push({
    name: key,
    url : value
  });
}

nostr.on('relayConnected', (relay: Relay) => console.log('Relay connected.', relay.name));
nostr.on('relayError', (err: Error) => console.log('Relay error;', err));
nostr.on('relayNotice', (notice: string[]) => console.log('Notice', notice));

nostr.debugMode = true;
await nostr.connect();

for (const entrie of feed.entries) {
  const publishedDate = new Date(entrie.published).getTime();
  if(publishedDate <= pastDate) {
    continue;
  }
  await nostr.sendTextPost(entrie.title.value + "\n" + entrie.links[0].href);
}

await nostr.disconnect();

Deno.exit(0);
