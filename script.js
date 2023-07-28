const { createApp } = Vue;

createApp({
  data() {
    return {
      colors: [],
      message: '',
      showSuccessAlert: false,
    };
  },
  methods: {
    calculate() {
      this.colors = [];
      this.showSuccessAlert = false;
      const usedColors = new Set(); // Keep track of used colors
      while (this.colors.length < 6) {
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        let hexColor = '#' + randomColor.padStart(6, '0'); // Make sure the color has exactly 6 digits
        if (!usedColors.has(hexColor)) { // Check if color has already been added
          this.colors.push(hexColor);
          usedColors.add(hexColor);
        }
      }
    },
    handleSpacebar(event) {
      if (event.code === 'Space') {
        // Your code to execute when the spacebar is pressed
        this.calculate();
      }
    },
    handleCopy(color) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(color);
        this.message = 'copied' + color;
        this.showSuccessAlert = true;
      } else {
        var textarea = document.createElement('textarea');
        textarea.value = color;
        textarea.style.position = 'fixed';
        textarea.style.opacity = 0;
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
          document.execCommand('copy');
          this.message = 'copied' + color;
          this.showSuccessAlert = true;
        } catch (err) {
          console.error('Could not copy text: ', err);
        }
        document.body.removeChild(textarea);
      }
    },
    handleClick(event) {
      // Check if the clicked element is a link or inside a colored card
      if (event.target.tagName !== 'A' && !event.target.closest('.colored')) {
        // Your code to execute when a non-link element is clicked goes here
        this.showSuccessAlert = false;
      }
    },
  },
  mounted() {
    // Add event listeners for click and spacebar keydown
    document.addEventListener('click', this.handleClick);
    this.calculate();
    document.addEventListener('keydown', this.handleSpacebar);
  },
  beforeUnmount() {
    // Remove event listeners when the app is unmounted
    document.removeEventListener('click', this.handleClick);
    document.removeEventListener('keydown', this.handleSpacebar);
  },
}).mount("#app");
