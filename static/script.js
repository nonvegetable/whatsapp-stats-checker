document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chatForm');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const fileInput = document.getElementById('chatFile');
    const deviceType = document.getElementById('deviceType');

    const file = fileInput.files[0];
    if (!file) {
      alert("Please upload a valid file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('device', deviceType.value);

    try {
      const response = await fetch('/process-chat', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      const outputDiv = document.getElementById('output');
      outputDiv.innerHTML = `<h2>Messages Count</h2>`;
      for (const [user, count] of Object.entries(result)) {
        outputDiv.innerHTML += `<p><strong>${user}</strong>: ${count} messages</p>`;
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  });
});
