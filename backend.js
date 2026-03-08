
async function saveInputSU() {
    let newUserName = document.getElementById("newUserName").value;
    let newUserEmail= document.getElementById("newUserEmail").value;
    let newUserPassword1= document.getElementById("newUserPassword1").value;
    let newUserPassword2= document.getElementById("newUserPassword1").value;

    if (newUserName === "") {
        document.getElementById("errorMessage").innerText = "Username cannot be empty.";
        return;
    }
    if (newUserPassword1 === "") {
        document.getElementById("errorMessage").innerText = "Password cannot be empty.";
        return;
    }
    if (newUserName === "") {
        document.getElementById("errorMessage").innerText = "Username cannot be empty.";
        return;
    }
    if(newUserPassword1!=newUserPassword2){
        document.getElementById("errorMessage").innerText = "The two passwords do not match";
        return;
    }

    document.getElementById("errorMessage").innerText = "";

    try {
        const response = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: newUserName,
                email: newUserEmail,
                password: newUserPassword1
            })
        });

        const data = await response.json();

        if (data.success) {
            document.getElementById("errorMessage").innerText = "Signup successful!";
            res.redirect('/');
        } else {
            document.getElementById("errorMessage").innerText = data.message;
        }
    } catch (error) {
        console.error(error);
        document.getElementById("errorMessage").innerText = "Could not connect to server.";
    }
}
