function getToken() {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith("task_cookie="))
    ?.split("=")[1];
}

function getCsrfToken() {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith("csrftoken="))
    ?.split("=")[1];
}

export { getToken, getCsrfToken }