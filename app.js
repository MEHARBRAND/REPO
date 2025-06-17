const API_URL = 'https://script.google.com/macros/s/AKfycbybk_yUJEXrW91Y8YRfHUTg8Xuy43TGIQjZ8DBYhaGC4bhfAOLjsW_cNqRTaJhZxbQwOA/exec';

fetch(API_URL)
  .then(res => res.json())
  .then(apps => {
    const container = document.getElementById('app-list');
    apps.forEach(app => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${app.name}</h3>
        <p>${app.description}</p>
        <img src="${app.iconUrl}" width="100"><br>
        <a href="https://drive.google.com/uc?export=download&id=${app.apkDriveId}">Download APK</a>
      `;
      container.appendChild(div);
    });
  });

document.getElementById('submit-form').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.name.value,
    description: form.description.value,
    iconUrl: form.iconUrl.value,
    apkDriveId: form.apkDriveId.value
  };
  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => alert('Submitted! Your app ID: ' + res.id))
  .catch(err => alert('Error: ' + err));
});
