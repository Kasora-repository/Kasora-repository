function acc_button() {
    if (document.querySelector(".acc_bg")) {
        return;
    }

    const acc = document.querySelector(".account-button");

    let bg = document.createElement('div');
    bg.className = "acc_bg";

    let login_header = document.createElement('p');
    login_header.className = "login_header";
    login_header.textContent = "Welcome Back";

    let exit = document.createElement('button');
    exit.className = "exit_button";
    exit.textContent = "x";
    exit.onclick = close_overlay;

    let form = document.createElement('form');
    form.className = 'form_tag';
    form.onsubmit = handle_login; //function handle_login

    let email = document.createElement('input');
    email.type = "text";
    email.name = "email";
    email.placeholder = "Please Enter your username or email";
    email.className = "input_tag";

    let password = document.createElement('input');
    password.type = "password";
    password.name = "password";
    password.placeholder = "Please Enter your password";
    password.className = "input_tag";

    let submit = document.createElement('button');
    submit.textContent = "submit";
    submit.value = "Log In";

    form.appendChild(email);
    form.appendChild(password);
    form.appendChild(submit);

    bg.appendChild(login_header);
    bg.appendChild(exit);
    bg.appendChild(form);

    document.body.appendChild(bg);

    document.body.classList.add("no-scroll");
    document.body.classList.add("blur-active");
}

function handle_login(event){
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if (email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Here you’d send data to backend/database
    console.log("Sending:", { email, password });

}

function close_overlay(){
    const overlay = document.querySelector('.acc_bg');
    if (overlay) overlay.remove();
    document.body.classList.remove("no-scroll");
    document.body.classList.remove("blur-active");
}