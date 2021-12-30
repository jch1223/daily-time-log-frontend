export interface MilestoneData {
  userId?: string;
  milestoneId?: string;
  done?: boolean;
  summary?: string;
  googleAccessToken: string;
}

export interface Milestone {
  id: string;
  summary: string;
  color: string;
}

export async function getMilestones(userId: string, googleAccessToken?: string) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
    },
  };

  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/users/${userId}/milestones`,
    requestOptions,
  );

  if (!response.ok) {
    throw new Error("Problem fetching data");
  }

  return response.json();
}

export async function createMilestone({ userId, done, summary, googleAccessToken }: MilestoneData) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${googleAccessToken}`,
    },
    body: JSON.stringify({ done, summary }),
  };

  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/users/${userId}/milestones`,
    requestOptions,
  );

  if (!response.ok) {
    throw new Error("Problem fetching data");
  }

  return response.json();
}

export async function updateMilestone({
  milestoneId,
  done,
  summary,
  googleAccessToken,
}: MilestoneData) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${googleAccessToken}`,
    },
    body: JSON.stringify({ done, summary }),
  };

  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/milestones/${milestoneId}`,
    requestOptions,
  );

  if (!response.ok) {
    throw new Error("Problem fetching data");
  }

  return response.json();
}

export async function createMilestonesInLocalStorage(
  milestones: Milestone[],
  googleAccessToken: string,
) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${googleAccessToken}`,
    },
    body: JSON.stringify(milestones),
  };

  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/milestones`, requestOptions);

  if (!response.ok) {
    throw new Error("Problem fetching data");
  }

  return response.json();
}

export async function deleteMilestone({ milestoneId, googleAccessToken }: MilestoneData) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${googleAccessToken}`,
    },
  };

  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/milestones/${milestoneId}`,
    requestOptions,
  );

  if (!response.ok) {
    throw new Error("Problem fetching data");
  }

  return response.json();
}
