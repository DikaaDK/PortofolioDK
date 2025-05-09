// Inisialisasi Feather Icons dan fungsi lainnya saat DOM selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  feather.replace(); // Mengganti elemen <i> dengan ikon Feather
  initTypedText(); // Memulai animasi teks ketik
  initScrollAnimation(); // Memulai animasi saat scroll (jika elemen dengan class 'section' ada)
  initProjectCards(); // Menginisialisasi animasi hover pada kartu proyek (mungkin redundan dengan CSS)
  initFormInputs(); // Menginisialisasi animasi fokus pada input form (mungkin redundan dengan CSS)
  initChatbot(); // Menginisialisasi fungsionalitas chatbot
  initMobileMenu(); // Menginisialisasi menu mobile
  // initCustomCursor(); // Fungsi initCustomCursor() tidak terdefinisi dalam kode yang diberikan.
  initNavbarScroll(); // Menginisialisasi efek scroll pada navbar
  initActiveNavLinkHighlight(); // Menyorot tautan navigasi aktif saat menggulir
});

// --- Bagian Animasi Teks Ketik (Menggunakan Typed.js) ---
// Fungsi typeEffect() dan variabel terkait (phrases, phraseIndex, dsb.)
// adalah implementasi manual yang sudah digantikan oleh Typed.js.
// Kode manual tersebut dihapus untuk merapikan.

document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.getElementById("typing-text");
  const texts = ["UI/UX Designer", "FullStack Developer", "Content Creator"];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;
  let deletingSpeed = 75;
  let pauseBeforeDelete = 1500;
  let pauseBeforeNextText = 500;

  function typeText() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      // Deleting text
      textElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;

      // Move to next text when current text is fully deleted
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeText, pauseBeforeNextText);
        return;
      }

      setTimeout(typeText, deletingSpeed);
    } else {
      // Typing text
      textElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;

      // Start deleting when text is fully typed
      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, pauseBeforeDelete);
        return;
      }

      setTimeout(typeText, typingSpeed);
    }
  }

  // Start the typing animation
  typeText();
});

// --- Bagian Animasi Scroll (Intersection Observer) ---
function initScrollAnimation() {
  // Catatan: Agar fungsi ini bekerja, elemen section di HTML perlu memiliki class="section".
  // Dalam HTML yang diberikan sebelumnya, section tidak memiliki class="section".
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // Tambahkan class 'visible' saat elemen terlihat
        }
        // Opsional: Hapus class 'visible' saat elemen tidak terlihat
        // else {
        //   entry.target.classList.remove("visible");
        // }
      });
    },
    { threshold: 0.1 } // Persentase elemen yang terlihat untuk memicu callback (0.1 = 10%)
  );

  // Amati setiap section
  sections.forEach((section) => {
    observer.observe(section);
  });
}

// --- Bagian Animasi Kartu Proyek (Hover Effect) ---
function initProjectCards() {
  // Catatan: HTML yang diberikan sudah menggunakan class Tailwind seperti group-hover:scale-105
  // untuk efek hover pada gambar dan hover:shadow-2xl pada kartu.
  // Kode JavaScript ini menduplikasi beberapa efek hover dengan manipulasi style inline.
  // Pertimbangkan untuk hanya menggunakan salah satu (Tailwind atau JS) untuk menghindari konflik.
  const projectCards = document.querySelectorAll(
    "#project-card-container > div"
  ); // Pilih div langsung di dalam container

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow =
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
      card.style.transition = "transform 0.3s, box-shadow 0.3s"; // Pastikan transisi aktif
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      // Kembalikan ke shadow default atau hapus jika tidak ada shadow default
      card.style.boxShadow =
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
      card.style.transition = "transform 0.3s, box-shadow 0.3s";
    });
  });
}

// --- Bagian Animasi Input Form (Label Floating) ---
function initFormInputs() {
  // Catatan: CSS yang diberikan sudah menggunakan pseudo-class :focus dan :not(:placeholder-shown)
  // pada class .input-group untuk membuat label mengambang.
  // Kode JavaScript ini menambahkan/menghapus class 'active' yang juga bisa diatasi oleh CSS saja.
  // Fungsi ini mungkin redundan jika efek label floating sudah berfungsi dengan CSS.
  const formInputs = document.querySelectorAll(
    ".input-group input, .input-group textarea"
  );

  formInputs.forEach((input) => {
    // Periksa nilai awal saat halaman dimuat
    if (input.value !== "") {
      input.parentElement.classList.add("active");
    }

    input.addEventListener("focus", () => {
      input.parentElement.classList.add("active");
    });

    input.addEventListener("blur", () => {
      if (input.value === "") {
        input.parentElement.classList.remove("active");
      }
    });
  });
}

// --- Bagian Fungsionalitas Chatbot ---
function initChatbot() {
  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotPanel = document.getElementById("chatbot-panel");
  const closeButton = document.getElementById("close-chatbot");
  const chatbotMessages = document.getElementById("chatbot-messages");
  const chatbotInput = document.getElementById("chatbot-input-field");
  const sendButton = document.getElementById("send-message");

  // Dapatkan referensi ke tautan "Let's Talk"
  const letsTalkLink = document.getElementById("lets-talk-link");

  // Helper function untuk menghapus indikator "sedang mengetik" yang ada
  function removeTypingIndicator() {
    // Cari elemen dengan class 'typing-indicator'
    const existingTyping = chatbotMessages.querySelector(".typing-indicator");
    if (existingTyping) {
      chatbotMessages.removeChild(existingTyping);
    }
  }

  // Fungsi untuk menangani toggle panel chatbot
  function toggleChatbotPanel() {
    const isHidden = chatbotPanel.style.display !== "flex"; // Periksa apakah panel tersembunyi
    chatbotPanel.style.display = isHidden ? "flex" : "none"; // Toggle display

    // Tambahkan pesan awal dari bot hanya jika panel ditampilkan dan belum ada pesan
    if (isHidden && chatbotMessages.children.length === 0) {
      removeTypingIndicator(); // Pastikan tidak ada indikator jika ini adalah pesan awal
      addMessage(
        "Halo! Aku Jeccelyn asisten Dika, Ada yang bisa aku bantu?",
        "bot"
      );
    }
    // Anda bisa menambahkan logika lain di sini jika panel ditutup
    // Contoh: membersihkan pesan saat menutup
    // else if (!isHidden) {
    //     chatbotMessages.innerHTML = '';
    // }
  }

  function toggleChatbotPanel() {
    const isHidden = chatbotPanel.style.display !== "flex";
    chatbotPanel.style.display = isHidden ? "flex" : "none";

    // Jika panel terbuka dan belum ada pesan, tambahkan pesan awal
    if (isHidden && chatbotMessages.children.length === 0) {
      removeTypingIndicator(); // Bersihkan indikator typing dulu

      setTimeout(() => {
        const msgEl = addMessage(
          "Halo! Aku Jeccelyn asisten Dika, Ada yang bisa aku bantu?",
          "bot"
        );
        msgEl.classList.add("pop-in"); // Tambahkan animasi pop-in setelah pesan dimasukkan
      }, 300); // Delay sedikit supaya lebih natural
    }
  }

  // Toggle panel chatbot saat tombol mengambang diklik
  chatbotToggle.addEventListener("click", toggleChatbotPanel);

  // Tutup chatbot saat tombol tutup diklik dan hapus riwayat chat
  closeButton.addEventListener("click", () => {
    chatbotPanel.style.display = "none"; // Menyembunyikan panel chatbot
    chatbotMessages.innerHTML = ""; // Menghapus semua riwayat chat
  });

  // --- Tambahkan event listener untuk tautan "Let's Talk" ---
  if (letsTalkLink) {
    // Pastikan elemen ditemukan
    letsTalkLink.addEventListener("click", (e) => {
      e.preventDefault(); // Mencegah perilaku default tautan (navigasi)
      toggleChatbotPanel(); // Panggil fungsi toggle
    });
  }
  // --- Akhir event listener tautan ---

  // Kirim pesan saat tombol kirim diklik
  sendButton.addEventListener("click", sendUserMessage);

  // Kirim pesan saat menekan Enter pada input
  chatbotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Mencegah submit form default jika input berada di dalam form
      sendUserMessage();
    }
  });

  // Fungsi untuk mengirim pesan pengguna
  function sendUserMessage() {
    const message = chatbotInput.value.trim();
    if (message === "") return; // Jangan kirim pesan kosong

    removeTypingIndicator(); // Hapus indikator jika masih ada (misal, pengguna mengetik lagi)

    // Tambahkan pesan pengguna ke panel
    addMessage(message, "user");

    // Kosongkan input field
    chatbotInput.value = "";
    chatbotInput.focus(); // Tetap fokus pada input setelah mengirim

    // Proses pesan pengguna (kirim ke backend)
    processUserMessage(message);
  }

  // Fungsi untuk menambahkan pesan ke panel chatbot
  function addMessage(text, sender) {
    const messageElement = document.createElement("div");
    // Tambahkan class 'message' dan 'sender-message' (user-message atau bot-message)
    messageElement.classList.add("message", `${sender}-message`);

    // Untuk pesan bot, pastikan jika itu adalah indikator mengetik, biarkan innerHTML-nya
    // Jika itu pesan teks biasa, gunakan textContent
    if (sender === "bot" && text.startsWith('<div class="flex space-x-2')) {
      // Ini kasus jarang, tapi untuk jaga-jaga jika text berupa HTML indikator
      messageElement.innerHTML = text;
      // Tambahkan juga kelas 'typing-indicator' jika ini adalah elemen indikator
      messageElement.classList.add("typing-indicator");
    } else {
      messageElement.textContent = text;
    }

    // removeTypingIndicator(); // Dipindahkan ke awal sendUserMessage dan di dalam processUserMessage

    // Tambahkan elemen pesan ke dalam container pesan
    chatbotMessages.appendChild(messageElement);

    // Terapkan animasi muncul setelah sedikit jeda agar elemen ditambahkan ke DOM dulu
    setTimeout(() => {
      messageElement.classList.add("visible");
    }, 50); // Jeda kecil (ms)

    // Gulirkan ke bagian bawah panel pesan
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Kembalikan elemen pesan jika perlu referensi di luar fungsi ini
    return messageElement;
  }

  // Fungsi untuk animasi mengetik bot (menampilkan teks satu per satu)
  // Ini adalah animasi teks, BUKAN indikator titik-titik.
  // Jika Anda ingin langsung menampilkan teks penuh setelah dots menghilang,
  // Anda bisa menghapus fungsi ini dan memanggil addMessage langsung di processUserMessage.
  // Saya simpan fungsi ini sesuai kode asli Anda, tetapi pastikan indikator dihapus sebelum ini berjalan.
  function typeBotReply(text) {
    // Buat elemen pesan baru untuk balasan bot
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "bot-message");

    // Pastikan indikator dihapus SEBELUM memulai animasi ketik teks
    removeTypingIndicator();

    // Gunakan span untuk menampung teks yang akan diketik
    const span = document.createElement("span");
    messageElement.appendChild(span);
    chatbotMessages.appendChild(messageElement); // Tambahkan elemen pesan ke DOM

    let index = 0;
    const typingSpeed = 0; // Kecepatan mengetik (ms) - Anda bisa menyesuaikannya

    const interval = setInterval(() => {
      if (index < text.length) {
        span.textContent += text.charAt(index);
        index++;
        // Auto-scroll during typing
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      } else {
        clearInterval(interval);
        // Make message fully visible after typing and ensure it's scrolled into view
        messageElement.classList.add("visible");
        // Force one final scroll to ensure the message is completely visible
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }
    }, typingSpeed);

    // Kembalikan elemen pesan jika perlu referensi di luar fungsi ini
    return messageElement;
  }

  // Fungsi untuk memproses pesan pengguna (mengirim ke API backend)
  async function processUserMessage(message) {
    // --- INI BAGIAN UNTUK MENAMPILKAN INDIKATOR "SEDANG MENGETIK" (DOTS) ---
    const thinkingEl = document.createElement("div");
    // Gunakan class bot-message untuk styling latar belakang/warna teks
    thinkingEl.classList.add("message", "bot-message");
    // Tambahkan kelas identifikasi agar mudah dicari/dihapus
    thinkingEl.classList.add("typing-indicator");
    // Struktur HTML untuk titik-titik animasi (menggunakan kelas Tailwind)
    thinkingEl.innerHTML = `<div class="flex space-x-2 items-center">
          <div class="w-2 h-2 bg-blue-900 rounded-full animate-bounce"></div>
          <div class="w-2 h-2 bg-blue-900 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          <div class="w-2 h-2 bg-blue-900 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
      </div>`;

    // Tambahkan indikator SEBELUM melakukan panggilan API
    chatbotMessages.appendChild(thinkingEl);
    // Gulirkan ke bawah setelah menambahkan indikator
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    // --- AKHIR BAGIAN INDIKATOR ---

    try {
      // Lakukan request fetch ke API backend Anda
      // !!! PASTIKAN BACKEND SERVER DI http://localhost:3000 BERJALAN !!!
      const response = await fetch("http://localhost:3000/api/chatai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }), // Kirim pesan pengguna dalam format JSON
      });

      // Hapus indikator thinking segera setelah response diterima (bahkan sebelum parsing)
      // Ini membuat transisi lebih responsif
      removeTypingIndicator();

      // Periksa apakah response berhasil (status code 2xx)
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Kesalahan HTTP! status: ${response.status}, body: ${errorText}`
        );
      }

      const data = await response.json(); // Parsing response sebagai JSON

      // Logging response untuk debugging
      console.log("Response dari API:", data);

      // Ekstrak konten pesan dari struktur response API
      // Sesuaikan baris ini jika struktur response API Anda berbeda
      // Mencoba data.text dulu, lalu struktur OpenAI/Gemini
      const botReply = data.text || data.choices?.[0]?.message?.content;

      console.log("Isi botReply:", botReply);

      if (botReply) {
        // Tampilkan balasan bot.
        // Menggunakan typeBotReply untuk efek ketik per karakter
        typeBotReply(botReply);
        // Jika ingin langsung menampilkan pesan penuh tanpa efek ketik:
        // addMessage(botReply, "bot");
      } else {
        // Jika balasan kosong atau tidak sesuai format
        addMessage(
          "Bot tidak mengerti jawabannya 😅 (Balasan kosong/tidak valid)",
          "bot"
        );
      }
    } catch (error) {
      // Pastikan indikator thinking dihapus bahkan jika terjadi error
      removeTypingIndicator();
      console.error("Error saat mengambil response chatbot:", error);
      // Tampilkan pesan error ke pengguna
      addMessage(
        "Server sedang bermasalah 😢 atau ada kesalahan lain. Coba lagi sebentar ya.",
        "bot"
      );
    }
  }
}
// Jalankan inisialisasi chatbot setelah seluruh halaman dimuat
document.addEventListener("DOMContentLoaded", initChatbot);

// Ambil semua elemen DOM yang diperlukan
const dynamicIsland = document.getElementById("dynamic-island");
const islandDefault = document.getElementById("island-default");
const islandExpanded = document.getElementById("island-expanded");
const overlay = document.getElementById("overlay");
const closeMenu = document.getElementById("close-menu");
const navItems = document.querySelectorAll(".nav-item");
const indicators = document.querySelectorAll(".indicator");

// Pelacakan status
let isExpanded = false;

// Fungsi untuk memperluas island
function expandIsland() {
  // Tambahkan animasi pop-out
  dynamicIsland.classList.add("animate-pop-out");

  // Tunggu hingga animasi selesai
  setTimeout(() => {
    // Sembunyikan tampilan default
    islandDefault.classList.add("hidden");

    // Tampilkan tampilan yang diperluas
    islandExpanded.classList.remove("hidden");

    // Perbarui ukuran island
    dynamicIsland.classList.remove("island-default", "animate-pop-out");
    dynamicIsland.classList.add("island-expanded", "animate-pop-in");

    // Tampilkan overlay
    overlay.classList.add("active");

    // Perbarui status
    isExpanded = true;

    // Hapus kelas animasi setelah selesai
    setTimeout(() => {
      dynamicIsland.classList.remove("animate-pop-in");
    }, 400);
  }, 300);
}

// Fungsi untuk mengerutkan island
function collapseIsland() {
  // Tambahkan animasi pop-out
  dynamicIsland.classList.add("animate-pop-out");

  // Sembunyikan overlay
  overlay.classList.remove("active");

  // Tunggu hingga animasi selesai
  setTimeout(() => {
    // Sembunyikan tampilan yang diperluas
    islandExpanded.classList.add("hidden");

    // Tampilkan tampilan default
    islandDefault.classList.remove("hidden");

    // Reset ukuran island
    dynamicIsland.classList.remove("island-expanded", "animate-pop-out");
    dynamicIsland.classList.add("island-default", "animate-pop-in");

    // Perbarui status
    isExpanded = false;

    // Hapus kelas animasi setelah selesai
    setTimeout(() => {
      dynamicIsland.classList.remove("animate-pop-in");
    }, 400);
  }, 300);
}

// Toggle ekspansi island saat klik tampilan default
islandDefault.addEventListener("click", () => {
  if (!isExpanded) {
    expandIsland();
  }
});

// Kembali ke keadaan semula saat klik tombol tutup
closeMenu.addEventListener("click", (e) => {
  e.stopPropagation(); // Mencegah bubbling event
  if (isExpanded) {
    collapseIsland();
  }
});

// Kembali ke keadaan semula saat klik overlay
overlay.addEventListener("click", () => {
  if (isExpanded) {
    collapseIsland();
  }
});

// Menangani klik item navigasi
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    // Perbarui item yang aktif
    navItems.forEach((navItem) => navItem.classList.remove("active"));
    item.classList.add("active");

    // Perbarui indikator yang sesuai
    const section = item.getAttribute("data-section");
    indicators.forEach((indicator) => {
      if (indicator.getAttribute("data-for") === section) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });

    // Tutup island setelah navigasi
    collapseIsland();
  });
});

// Menangani klik indikator
indicators.forEach((indicator) => {
  indicator.addEventListener("click", () => {
    // Ambil bagian yang sesuai
    const section = indicator.getAttribute("data-for");

    // Perbarui indikator yang aktif
    indicators.forEach((ind) => ind.classList.remove("active"));
    indicator.classList.add("active");

    // Perbarui item navigasi yang sesuai
    navItems.forEach((item) => {
      if (item.getAttribute("data-section") === section) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  });
});

// Array of image sources
let imageSources = [
  "assets/img/me1.png",
  "assets/img/me2.png",
];

// Index of the currently displayed image in the imageSources array
let currentImageIndex = 0;

// Get references to the image elements and the button
const myImageElement = document.getElementById("myImage");
const overlayImageElement = document.getElementById("overlayImage"); // Reference to the image inside bgOverlay
const myButtonElement = document.getElementById("myButton");

// Function to update both the main image and the overlay image
function updateImages() {
  // Set the main image source to the current image in the sequence
  myImageElement.src = imageSources[currentImageIndex];

  // Calculate the index for the overlay image.
  // This is the image that comes *after* the current image.
  // The modulo operator (%) ensures we loop back to the start of the array.
  let overlayIndex = (currentImageIndex + 1) % imageSources.length;

  // Set the overlay image source to the next image in the sequence
  overlayImageElement.src = imageSources[overlayIndex];
}

// --- Initialization ---
// Call updateImages() once when the script loads to set the initial images
updateImages();

// --- Event Listener for the Button ---
// Add a click event listener to the button
myButtonElement.addEventListener("click", function () {
  // Increment the current image index to move to the next image
  // The modulo operator (%) makes the sequence loop
  currentImageIndex = (currentImageIndex + 1) % imageSources.length;

  // Call the updateImages function to change the image sources based on the new index
  updateImages();
});

// Zoom profile Ai
document.addEventListener("DOMContentLoaded", (event) => {
  const profileImage = document.querySelector(".profile-zoom-effect");

  if (profileImage) {
    profileImage.addEventListener("click", (event) => {
      event.stopPropagation();
      profileImage.classList.toggle("is-zoomed");
    });

    document.addEventListener("click", (event) => {
      if (
        profileImage.classList.contains("is-zoomed") &&
        !profileImage.contains(event.target)
      ) {
        profileImage.classList.remove("is-zoomed");
      }
    });
  }
});
