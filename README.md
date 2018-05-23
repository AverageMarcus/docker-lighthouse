# docker-lighthouse

Run Google's lighthouse tests against a given website using the magic of Docker

## Example Usage

**Simple score**

```
❯ docker run -e URL=https://bbc.co.uk averagemarcus/lighthouse
Running Lighthouse against https://bbc.co.uk

Lighthouse results for https://bbc.co.uk

Performance=57.88%
Progressive Web App=45.45%
Accessibility=93.26%
Best Practices=75.00%
SEO=80.00%
```

**JSON Results**

```
❯ docker run -e URL=https://bbc.co.uk -v $(pwd)/results:/lighthouse-results averagemarcus/lighthouse
Running Lighthouse against https://bbc.co.uk

Lighthouse results for https://bbc.co.uk

Performance=57.88%
Progressive Web App=45.45%
Accessibility=93.26%
Best Practices=75.00%
SEO=80.00%

❯ ls results
2018-05-14T16:43:07.959Z.json latest.json
```

## Extending this image

```dockerfile
FROM averagemarcus/lighthouse

ENTRYPOINT /docker-entrypoint.sh && ls /lighthouse-results
```
