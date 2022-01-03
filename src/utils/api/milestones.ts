import { useServer } from "../../config/api";

export interface Milestone {
  id: string;
  userId?: string;
  summary?: string;
  color?: string;
  isDeleted?: boolean;
  runningTimes?: string[];
}

// export async function getMilestones(userId: string, googleAccessToken?: string) {
//   const requestOptions = {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${googleAccessToken}`,
//     },
//   };

//   const response = await fetch(
//     `${process.env.REACT_APP_API_SERVER}/users/${userId}/milestones`,
//     requestOptions,
//   );

//   if (!response.ok) {
//     throw new Error("Problem fetching data");
//   }

//   return response.json();
// }

export async function createMilestone({
  id,
  userId,
  summary,
  color,
  runningTimes = [],
}: Milestone) {
  if (useServer) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, summary, color, runningTimes }),
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

  const newMilestone = {
    id,
    summary,
    color,
    runningTimes,
    isDeleted: false,
  };
  const milestones = JSON.parse(localStorage.getItem("milestones"));
  milestones.push(newMilestone);
  localStorage.setItem("milestones", JSON.stringify(milestones));

  return newMilestone;
}

export async function updateMilestoneSummary({ id, summary }: Milestone) {
  if (useServer) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ summary }),
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/milestones/${id}`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error("Problem fetching data");
    }

    return response.json();
  }

  const milestones = JSON.parse(localStorage.getItem("milestones"));
  const newMilestones = milestones.map((milestone: Milestone) => {
    if (milestones.id === id) {
      milestone.summary = summary;
    }

    return milestone;
  });
  localStorage.setItem("milestones", JSON.stringify(newMilestones));

  return null;
}

// export async function createMilestonesInLocalStorage(
//   milestones: Milestone[],
//   googleAccessToken: string,
// ) {
//   const requestOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${googleAccessToken}`,
//     },
//     body: JSON.stringify(milestones),
//   };

//   const response = await fetch(`${process.env.REACT_APP_API_SERVER}/milestones`, requestOptions);

//   if (!response.ok) {
//     throw new Error("Problem fetching data");
//   }

//   return response.json();
// }

export async function deleteMilestone(id: Milestone["id"]) {
  if (useServer) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/milestones/${id}`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error("Problem fetching data");
    }

    return response.json();
  }

  const milestones = JSON.parse(localStorage.getItem("milestones"));
  const newMilestones = milestones.map((milestone: Milestone) => {
    if (milestones.id === id) {
      milestone.isDeleted = true;
    }

    return milestone;
  });
  localStorage.setItem("milestones", JSON.stringify(newMilestones));

  return null;
}
