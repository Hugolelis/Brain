document.querySelectorAll(".upload-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        const fileInput = button.closest(".file-upload").querySelector(".file-input");
        fileInput.click();
    });
});

document.querySelectorAll(".file-input").forEach(input => {
input.addEventListener("change", () => {
        const fileName = input.files[0] ? input.files[0].name : "Escolher arquivo";
        input.closest(".file-upload").querySelector("#file-name").textContent = fileName;
    });
});