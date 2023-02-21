const form = document.querySelector("#contactForm");

form.onsubmit = function () {
    event.preventDefault();

    console.log(event);

    const name = document.querySelector("#name");

    console.log(name.value);
};
