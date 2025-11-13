const MAP: Record<string,string> = {
  'onlyfans.com': 'https://onlyfans.com/?ref=linkaroo',
  'patreon.com':  'https://patreon.com/?via=linkaroo',
  'amazon.com':   'https://amazon.com/?tag=linkaroo-20',
  'cash.app':     'https://cash.app/help/linkaroo',
}

export function injectAffiliate(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./,'')
    return MAP[host] || url
  } catch { return url }
}
