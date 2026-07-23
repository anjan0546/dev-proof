export async function getRepositories(accessToken: string) {
  const response = await fetch(
    "https://api.github.com/user/repos?sort=updated&per_page=100",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.log("Status:", response.status);
    console.log("GitHub Response:", data);

    throw new Error(
      `GitHub Error ${response.status}: ${JSON.stringify(data)}`
    );
  }

  return data;
}

export type GitHubCommit = {
  sha: string;

  commit: {
    message: string;

    author: {
      name: string;
      email?: string;
      date: string;
    } | null;
  };

  // GitHub account linked to this commit
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  } | null;

  html_url: string;
};

export async function getRepositoryCommits(
  owner: string,
  repo: string,
  accessToken?: string
): Promise<GitHubCommit[]> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=3`,
      {
        headers,
        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch commits for ${owner}/${repo}:`,
        response.status
      );

      return [];
    }

    const commits: GitHubCommit[] =
      await response.json();

    return commits;
  } catch (error) {
    console.error(
      `Error fetching commits for ${owner}/${repo}:`,
      error
    );

    return [];
  }
}