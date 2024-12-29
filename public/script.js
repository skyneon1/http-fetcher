const form = document.getElementById("requestForm");
const responseOutput = document.getElementById("responseOutput");
const requestHistory = document.getElementById("requestHistory");
const bodyContainer = document.getElementById("bodyContainer");
const submitButton = form.querySelector("button");

function clearResponse() {
  responseOutput.textContent = "";
}

function addHistory(url, method) {
  const historyItems = Array.from(requestHistory.children);
  if (historyItems.some(item => item.textContent === `${method} - ${url}`)) return;

  const li = document.createElement("li");
  li.textContent = `${method} - ${url}`;
  requestHistory.appendChild(li);
}

function displayResponse(response) {
  responseOutput.textContent = JSON.stringify(response, null, 2);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearResponse();

  const url = document.getElementById("url").value;
  const method = document.getElementById("method").value;
  const headersInput = document.getElementById("headers").value;
  const body = document.getElementById("body").value;

  let headers = {};
  try {
    headers = headersInput ? JSON.parse(headersInput) : {};
  } catch (error) {
    alert("Invalid JSON format in headers.");
    return;
  }

  const options = { method, headers };
  if (method !== "GET" && body) options.body = body;

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    displayResponse(data);
    addHistory(url, method);
  } catch (error) {
    displayResponse({ error: "Request failed. Please check the URL or your input." });
  }
});

document.getElementById("method").addEventListener("change", (e) => {
  const method = e.target.value;

  if (method === "GET") {
    bodyContainer.style.display = "none";
  } else {
    bodyContainer.style.display = "block";
  }

  if (method === "PUT") {
    document.getElementById("headers").value = '{"Content-Type": "application/json"}';
  }
});
