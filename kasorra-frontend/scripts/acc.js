const { createElement } = require("react");

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

    /*let email_icon = document.createElement('img');
    email_icon.src = "images/mail.png";
    email_icon.className = "input_icon"; 

    let email_text = document.createElement('p');
    email_text.className = "input_text";
    email_text.textContent = "Enter your username or email"; */

    let email = document.createElement('input');
    email.type = "text";
    email.name = "email";
    email.placeholder = "Enter your username or email";
    email.className = "input_tag";

    let password_header = document.createElement('p');
    password_header.className = "password_header";
    password_header.textContent = "Password";

    /*let password_icon = document.createElement('img');
    password_icon.src = "images/lock4.png";
    password_icon.className = "input_icon"; */

    let password = document.createElement('input');
    password.type = "password";
    password.name = "password";
    password.placeholder = "Enter your password";
    password.className = "input_tag";

    let submit = document.createElement('button');
    submit.textContent = "Sign In";
    submit.value = "Log In";
    submit.className = "submit_button";

    let signUp_header = document.createElement('p');
    signUp_header.className = "signUp_header";
    signUp_header.textContent = "-----------  or continue with  -----------";

    let thirdParty_container = document.createElement('div');
    thirdParty_container.className = "thirdParty_container";

    let google_icon = document.createElement('img');
    google_icon.src = "images/google.png";
    google_icon.className = "google_icon";

    let google_button = document.createElement('button');
    google_button.className = "google_button";

    google_button.appendChild(google_icon);

    let google_text = document.createElement('p');
    google_text.className = "google_text";
    google_text.textContent ="Google";

    google_button.appendChild(google_text);

    thirdParty_container.appendChild(google_button);

    let no_acc_container = document.createElement('div');
    no_acc_container.className = "no_acc_container";

    let no_acc = document.createElement('p');
    no_acc.className = "no_acc";
    no_acc.textContent = "Don't have an account? ";

    let sign_up = document.createElement('button');
    sign_up.className = "sign_up";
    sign_up.textContent = "Sign up";

    sign_up.addEventListener("click", signUp_overlay);

    no_acc_container.appendChild(no_acc);
    no_acc_container.appendChild(sign_up);

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
    bg.appendChild(signUp_header);
    bg.appendChild(form);
    bg.appendChild(thirdParty_container);
    bg.appendChild(no_acc_container);

    document.body.appendChild(bg);

    document.body.classList.add("no-scroll");
}

function handle_login(event){
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if (email.trim() === "" || password.trim() === "") {
        let error_container = document.createElement('div');
        error_container.className = "error_container";

        let error_message = document.createElement('p');
        error_message.textContent = "Please Fill in all the fields."
        return;
    }

    // Here you’d send data to backend/database
    console.log("Sending:", { email, password });
}

function close_overlay(){
    const overlay_signIn = document.querySelector('.acc_bg');
    const overlay_signUp = document.querySelector('.signUp_bg');

    if (overlay_signIn) overlay_signIn.remove();
    if (overlay_signUp) overlay_signUp.remove();

    document.body.classList.remove("no-scroll");
}

function open_cart(){
    window.location.href = "cart-page.html";
}

function signUp_overlay(){
    const logIn_overlay = document.querySelector('.acc_bg');
    if (logIn_overlay) logIn_overlay.remove();

    let bg = document.createElement('div');
    bg.className = "signUp_bg";

    let container = document.createElement('div');
    container.className = "signUp_container";

    let lock = document.createElement('img');
    lock.src = "images/person.png";
    lock.className = "person-icon";

    let login_header = document.createElement('p');
    login_header.className = "login_header";
    login_header.textContent = "Create Account";

    let login_subheader = document.createElement('p');
    login_subheader.className = "login_subheader";
    login_subheader.textContent = "Join thousands of businesses on our platform";

    let exit = document.createElement('button');
    exit.className = "exit_button2";
    exit.textContent = "x";
    exit.onclick = close_overlay;

    let direction = document.createElement('p');
    direction.className = "direction-text";
    direction.textContent = "I want to";

    let button_container = document.createElement('div');
    button_container.className = "button_container";

    let buy = document.createElement('button');
    buy.className = "buy-btn";

    let buy_icon = document.createElement('img');
    buy_icon.src = "images/cartss.png";
    buy_icon.className = "buy_icon";

    let buy_header = document.createElement('span');
    buy_header.className = "sb_header";
    buy_header.textContent = "Buy Products";

    let buy_subheader = document.createElement('span');
    buy_subheader.className = "sb_subheader";
    buy_subheader.textContent = "Source From Suppliers";

    let sell = document.createElement('button');
    sell.className = "sell-btn";

    let sell_icon = document.createElement('img');
    sell_icon.src = "images/buildings.png";
    sell_icon.className = "sell_icon";

    let sell_header = document.createElement('span');
    sell_header.className = "sb_header";
    sell_header.textContent = "Sell Products";

    let sell_subheader = document.createElement('span');
    sell_subheader.className = "sb_subheader";
    sell_subheader.textContent = "Become a supplier";

    buy.appendChild(buy_icon);
    buy.appendChild(buy_header);
    buy.appendChild(buy_subheader);

    sell.appendChild(sell_icon);
    sell.appendChild(sell_header);
    sell.appendChild(sell_subheader);

    button_container.appendChild(buy);
    button_container.appendChild(sell);

    let form = document.createElement('form');
    form.className = "form-container";

    container.appendChild(lock);
    container.appendChild(login_header);
    container.appendChild(login_subheader);
    container.appendChild(exit);
    container.appendChild(direction);
    container.appendChild(button_container);

    bg.appendChild(container);

    document.body.appendChild(bg);
}