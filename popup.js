chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const url = new URL(tabs[0].url);
    const domain = url.hostname;
  
    try {
      const response = await fetch("https://www.usom.gov.tr/url-list.txt");
      const data = await response.text();
      const blockedSites = data.split("\n").filter(url => url.trim().length > 0);
      const statusDiv = document.getElementById('status');
  
      if (blockedSites.includes(domain)) {
        statusDiv.textContent = "Malicious address detected!";
        statusDiv.classList.add("danger");
      } else {
        statusDiv.textContent = "Everythings okay!";
        statusDiv.classList.add("safe");
      }
    } catch (error) {
      console.error("USOM malicious address list fetch error. ", error);
    }
  });
  