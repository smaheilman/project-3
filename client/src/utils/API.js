// route to get logged in user info
export const getLoggedUser = (token) => {
  return fetch("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

// sign up/create user profile route
export const createUser = (userData) => {
  return fetch("/api/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

// route to log user in
export const userLogin = (userData) => {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const createJob = (jobData) => {
<<<<<<< HEAD
    return fetch('/api/jobs/' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)    
    })
}
=======
  return fetch("/api/jobs/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
};
>>>>>>> 50a311cc2c6098b6ca47ac3aaba45c1e7de3e090

export const getJobs = (jobData) => {
  return fetch("/api/jobs/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getSingleJob = (jobId, jobData) => {
  return fetch("/api/jobs/" + jobId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
};

export const deleteJob = (jobId, jobData) => {
  return fetch("/api/jobs/" + jobId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
};

export const createComment = (jobId, jobData) => {
  return fetch("api/jobs/" + jobId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
};

export const getUsers = (userData) => {
  return (
    fetch("api/users/"),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );
};

export const addBid = (jobId, jobData) => {
  return (
    fetch("api/jobs/" + jobId),
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    }
  );
};
