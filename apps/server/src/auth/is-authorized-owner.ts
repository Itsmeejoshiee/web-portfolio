export function isAuthorizedOwner(githubUserId: string): boolean {
  const ownerId = process.env.OWNER_GITHUB_ID;
  return Boolean(ownerId) && String(githubUserId) === ownerId;
}
