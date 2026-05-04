function acc_button() {
    if (document.querySelector(".acc_bg")) {
        return;
    }

    const acc = document.querySelector(".account-button");

    let bg = document.createElement('div');
    bg.className = "acc_bg";

    let lock = document.createElement('img');
    lock.src = "images/lock2.png";
    lock.className = "lock-icon";

    let login_header = document.createElement('p');
    login_header.className = "login_header";
    login_header.textContent = "Welcome Back";

    let login_subheader = document.createElement('p');
    login_subheader.className = "login_subheader";
    login_subheader.textContent = "Sign in to your Account";

    let exit = document.createElement('button');
    exit.className = "exit_button";
    exit.textContent = "x";
    exit.onclick = close_overlay;

    let input_container = document.createElement('div');
    input_container.className = "input_container";

    let form = document.createElement('form');
    form.className = 'form_tag';
    form.onsubmit = handle_login; //function handle_login

    let email_header = document.createElement('p');
    email_header.className = "email_header";
    email_header.textContent = "Email or Username";

    let email = document.createElement('input');
    email.type = "text";
    email.name = "email";
    email.placeholder = "Enter your username or email";
    email.className = "input_tag";

    let password_header = document.createElement('p');
    password_header.className = "password_header";
    password_header.textContent = "Password";

    let password = document.createElement('input');
    password.type = "password";
    password.name = "password";
    password.placeholder = "Enter your password";
    password.className = "input_tag";

    let submit = document.createElement('button');
    submit.textContent = "Sign In";
    submit.value = "Log In";
    submit.className = "submit_button";

    input_container.appendChild(email);
    input_container.appendChild(password);
    input_container.appendChild(email_header);
    input_container.appendChild(password_header);

    form.appendChild(input_container);
    form.appendChild(submit);

    bg.appendChild(lock);
    bg.appendChild(login_header);
    bg.appendChild(login_subheader);
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