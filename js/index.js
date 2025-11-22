$(document).ready(function () {
  new WOW({
    boxClass: "wow", // 默认 class 名，表示要添加动画的元素
    animateClass: "animate__animated", // Animate.css 4 的 class 前缀
    offset: 100, // 距离视口多少像素触发动画
    mobile: true, // 是否在移动端触发
    live: true, // 动态加载内容也能触发
  }).init();

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".apple-header nav");

  // 移动端菜单切换
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("show");
    const icon = menuToggle.querySelector("i");
    if (nav.classList.contains("show")) {
      icon.classList.replace("fa-bars", "fa-xmark");

      // 动画效果
      nav.querySelectorAll("a, button").forEach((el, i) => {
        // 移除旧的动画类
        el.classList.remove("animate__animated", "animate__fadeInUp");
        // 强制回流，确保动画重新触发
        void el.offsetWidth;
        el.style.animationDelay = `${i * 0.1}s`;
        el.classList.add("animate__animated", "animate__fadeInUp");
      });
    } else {
      icon.classList.replace("fa-xmark", "fa-bars");
      // 移除动画类，防止累积
      nav.querySelectorAll("a, button").forEach((el) => {
        el.classList.remove("animate__animated", "animate__fadeInUp");
        el.style.animationDelay = "";
      });
    }
  });

  // 点击导航链接关闭菜单
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        nav.classList.remove("show");
        menuToggle.querySelector("i").classList.remove("fa-xmark");
        menuToggle.querySelector("i").classList.add("fa-bars");
      }
    });
  });

  // 主题切换
  const themeToggle = $("#theme-toggle");
  const html = $("html");
  const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function getTheme() {
    const stored = localStorage.getItem("theme");
    return stored ? stored : userPrefersDark.matches ? "dark" : "light";
  }
  function applyTheme(theme) {
    if (theme === "dark") {
      html.addClass("dark-mode");
      themeToggle.find("i").removeClass("fa-moon").addClass("fa-sun");
    } else {
      html.removeClass("dark-mode");
      themeToggle.find("i").removeClass("fa-sun").addClass("fa-moon");
    }
    localStorage.setItem("theme", theme);
  }

  applyTheme(getTheme());

  themeToggle.on("click", () => {
    const newTheme = html.hasClass("dark-mode") ? "light" : "dark";
    applyTheme(newTheme);
  });
});
