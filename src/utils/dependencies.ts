import { execSync } from 'child_process';

export function getPackageVersion(packageName: string): string {
  let version = 'latest';
  const command = `npm show ${packageName} version`;
  const result = execSync(command);
  if (result != null && result.toString != null) {
    version = result.toString().trim();
  }
  return version;
}
