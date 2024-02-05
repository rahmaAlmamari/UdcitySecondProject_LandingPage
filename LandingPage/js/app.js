document.addEventListener("DOMContentLoaded", function () {
  // Code to append sections link in the empty ul
  let empty_ul = document.getElementById("dynamicLink");
  // Get all divs inside my-sections
  let sections = document.querySelectorAll(".my-sections > div");

  // Function to scroll to the clicked target section
  function goToSection(event) {
    event.preventDefault();
    let mySectionId = event.target.getAttribute("href").substring(1);
    let mySection = document.getElementById(mySectionId);

    mySection.scrollIntoView({
      behavior: "smooth",
    });
  }

  // Function to show the active section
  function showActiveSection() {
    sections.forEach(function (section) {
      let bounding = section.getBoundingClientRect();
      let windowHeight = window.innerHeight;

      // Check if the section is in the viewport
      if (
        bounding.top <= windowHeight / 2 &&
        bounding.bottom >= windowHeight / 2
      ) {
        // The section is in the viewport
        section.classList.add("active-section");
        changeNavBarActiveState(section.classList[0]);
      } else {
        section.classList.remove("active-section");
      }
    });
  }

  // Function to change the active state of the navbar menu
  function changeNavBarActiveState(sectionClass) {
    document.querySelectorAll("#dynamicLink li").forEach(function (navItem) {
      navItem.classList.remove("active");
    });

    let correspondingNavItem = document.querySelector(
      `#dynamicLink li a[href="#${sectionClass}"]`
    );

    if (correspondingNavItem) {
      let parentListItem = correspondingNavItem.parentNode;
      parentListItem.classList.add("active");
    }
  }

  // For-of loop to create navbar link, also to create click event listeners
  sections.forEach(function (section) {
    let link_li = document.createElement("li");
    let linkClass = section.classList[0];
    link_li.innerHTML = `<a href="#${linkClass}">${linkClass}</a>`;
    link_li.addEventListener("click", goToSection);
    empty_ul.appendChild(link_li);
  });

  // Listen for scroll events to show the active section
  window.addEventListener("scroll", showActiveSection);
});
