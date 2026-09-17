import feed from './deepTechFeed.json'

export function domainItems(domainKey) {
  return feed.domains?.[domainKey] || []
}

export function feedGeneratedAt() {
  return feed.generatedAt
}
