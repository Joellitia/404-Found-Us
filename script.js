// Bij laden altijd overview tonen
window.addEventListener('DOMContentLoaded', () => {
  showSection('overview');
});

  renderDevices(devices);

  addDeviceBtn.addEventListener("click", () => {
    const newDevice = prompt("Voer de naam in van het nieuwe apparaat:");
    if (newDevice) {
      devices.push({ name: newDevice, usage: 0, status: "online" });
      renderDevices(devices);
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");

  if (toggle) {
    // Donkere modus instellen als opgeslagen in localStorage
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark");
      toggle.checked = true;
    }

    toggle.addEventListener("change", () => {
      const enabled = toggle.checked;
      document.body.classList.toggle("dark", enabled);
      localStorage.setItem("darkMode", enabled); // Slaat instelling op
    });
  }
});

// Donkermodus toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", toggle.checked);
  });
});


function toggleAnalyticsItem(header) {
  const item = header.parentElement;
  item.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-device-btn");
  const deviceNameInput = document.getElementById("device-name");
  const deviceList = document.getElementById("device-list");

  if (addButton) {
    addButton.addEventListener("click", () => {
      const name = deviceNameInput.value.trim();
      if (!name) return alert("Voer een apparaatnaam in.");

      const deviceItem = document.createElement("div");
      deviceItem.className = "device-item";
      deviceItem.innerHTML = `
        <span>${name}</span>
        <label class="switch">
          <input type="checkbox" />
          <span class="slider"></span>
        </label>
      `;

      deviceList.prepend(deviceItem);
      deviceNameInput.value = "";
    });
  }
});




// 🔁 Pagina's tonen/verbergen
function showSection(sectionId) {
  const sections = ['overview', 'devices', 'analytics', 'settings'];
  sections.forEach(id => {
    const div = document.getElementById(id + 'Section');
    div.style.display = (id === sectionId) ? 'block' : 'none';
  });
}

// ➕ Apparaat toevoegen
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("deviceInput");
  const addBtn = document.getElementById("addDeviceBtn");
  const list = document.getElementById("deviceList");

  addBtn.addEventListener("click", () => {
    const name = input.value.trim();
    if (!name) return alert("Geef een naam in.");
    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li);
    input.value = "";
  });

  // Donkere modus toggle
  document.getElementById("darkModeToggle").addEventListener("change", (e) => {
    document.body.classList.toggle("dark", e.target.checked);
  });
});
 
const ws = new WebSocket(`ws://${location.host}/ws`);

ws.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);
    document.getElementById('current').textContent = `Current: ${data.current} A`;
    document.getElementById('transient').textContent = `Transient: ${data.transient} A`;
    document.getElementById('peak').textContent = `Peak: ${data.peakCurrent} A`;
  } catch (e) {
    console.error("Invalid JSON:", event.data);
  }
};

// 🌐 Realtime widget (HTML-element voor data, voeg deze toe aan je HTML)
const dataDisplay = document.getElementById("liveDataWidget"); // bijv. <div id="liveDataWidget"></div>

socket.addEventListener("open", () => {
  console.log("✅ Verbonden met WebSocket-server");
});

socket.addEventListener("message", (event) => {
  console.log("📨 Ontvangen:", event.data);

  // 🔄 Update het widget-tekst
  if (dataDisplay) {
    dataDisplay.innerText = event.data;
  }

  // 📊 (Optioneel) Live Chart bijwerken hier (indien je dat ook wilt)
});

// 🛑 Foutafhandeling
socket.addEventListener("error", (err) => {
  console.error("❌ WebSocket-fout:", err);
});

socket.addEventListener("close", () => {
  console.log("🔌 WebSocket-verbinding gesloten");
});


  // Chart.js Live Energy Chart
  const ctx = document.getElementById("liveChart").getContext("2d");
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['1s', '2s', '3s', '4s', '5s', '6s', '7s'],
      datasets: [{
        label: 'kW Usage',
        data: [1.2, 1.5, 1.3, 1.7, 1.4, 1.6, 1.3],
        borderColor: '#0077ff',
        backgroundColor: 'rgba(0, 119, 255, 0.3)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#0055aa', font: { weight: '600' } }
        },
        x: {
          ticks: { color: '#0055aa', font: { weight: '600' } }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#0055aa', font: { weight: '700' } }
        },
        tooltip: {
          enabled: true,
          backgroundColor: '#0044cc',
          titleFont: { weight: '700' },
          bodyFont: { weight: '400' },
          cornerRadius: 6
        }
      }
    }
  });
