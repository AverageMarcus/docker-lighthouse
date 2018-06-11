# docker-lighthouse

Run Google's lighthouse tests against a given website using the magic of Docker

## Example Usage

**Simple score**

```
❯ docker run -e URL=https://bbc.co.uk averagemarcus/lighthouse
Running Lighthouse against https://bbc.co.uk

Lighthouse results for https://bbc.co.uk

performance=57.88%
pwa=45.45%
accessibility=93.26%
best-practices=75.00%
seo=80.00%
```

**JSON Results**

```
❯ docker run -e URL=https://bbc.co.uk -v $(pwd)/results:/lighthouse-results averagemarcus/lighthouse
Running Lighthouse against https://bbc.co.uk

Lighthouse results for https://bbc.co.uk

performance=57.88%
pwa=45.45%
accessibility=93.26%
best-practices=75.00%
seo=80.00%

❯ ls results
2018-05-14T16:43:07.959Z.json latest.json
```

## Extending this image

```dockerfile
FROM averagemarcus/lighthouse

ENTRYPOINT /docker-entrypoint.sh && ls /lighthouse-results
```

## Generating lighthouse badges

To have [lighthouse badges](https://github.com/ebidel/lighthouse-badge) automatically created, pass in `-e withBadges=true` and a mount volume when running. E.g.

```
❯ docker run -e URL=https://bbc.co.uk -e withBadges=true -v $(pwd)/results:/lighthouse-results averagemarcus/lighthouse
```
