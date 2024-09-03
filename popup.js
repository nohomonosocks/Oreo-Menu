document.getElementById('rainbowEffect').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
        let index = 0;
        setInterval(() => {
          document.body.style.backgroundColor = colors[index];
          index = (index + 1) % colors.length;
        }, 500);
      }
    });
  });
});

document.getElementById('selectImage').addEventListener('click', () => {
  document.getElementById('imageInput').click();
});

document.getElementById('imageInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: (imageUrl) => {
            document.body.style.backgroundImage = `url(${imageUrl})`;
            document.body.style.backgroundSize = 'cover';
          },
          args: [imageUrl]
        });
      });
    };
    reader.readAsDataURL(file);
  }
});