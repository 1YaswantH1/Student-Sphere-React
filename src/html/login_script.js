const firebaseConfig = {
  apiKey: "AIzaSyBnNHhkar1avPI_2HpzHUsoSWS4bYS_Fhw",
  authDomain: "student-sphere-c653f.firebaseapp.com",
  projectId: "student-sphere-c653f",
  storageBucket: "student-sphere-c653f.appspot.com",
  messagingSenderId: "49712095783",
  appId: "1:49712095783:web:e7ec8321c2c373259f2402",
  measurementId: "G-3774M7LB21"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const databse = firebase.database();
const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct");
const signupEmailIn = document.getElementById("email-signup");
const usernameIn = document.getElementById("username-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById(
  "confirm-password-signup"
);
const createacctbtn = document.getElementById("create-acct-btn");
const forgetBtn = document.querySelector(".forget-btn");

// const returnBtn = document.getElementById("return-btn");

var email,
  password,
  signupEmail,
  signupPassword,
  confirmSignUpPassword,
  username,
  userId;

createacctbtn.addEventListener("click", function () {
  var isVerified = true;
  signupEmail = signupEmailIn.value;

  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if (signupPassword != confirmSignUpPassword) {
    window.alert("Password fields do not match. Try again.");
    isVerified = false;
  }

  username = usernameIn.value;
  if (
    signupEmail == null ||
    signupPassword == null ||
    confirmSignUpPassword == null
  ) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }

  if (isVerified) {
    auth
      .createUserWithEmailAndPassword(signupEmail, signupPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log("Success! Account created.");
        sessionStorage.setItem("userId", auth.currentUser.uid);
        // console.log(auth.currentUser.uid);
        databse
          .ref("/Users/" + auth.currentUser.uid)
          .set({
            Basic_info: {
              email_id: signupEmail,
              user_name: username,
            },
          })
          .then((res) => {
            window.alert("Data added to database.");
            location.replace("./start.html");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
        window.alert("Something went Wrong ", errorCode);
      });
  }
});

submitButton.addEventListener("click", function () {
  email = emailInput.value;
  password = passwordInput.value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      sessionStorage.setItem("userId", auth.currentUser.uid);
      console.log("Success! Welcome back!");
      // window.alert("Success! Welcome back!");
      location.replace("http://localhost:5173/");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      window.alert("Error occurred. ErrorCode ", errorCode);
    });
});

// reseting password
forgetBtn.addEventListener("click", function () {
  email = emailInput.value;
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      window.alert("Password reset email sent, check your inbox. ");
    })
    .catch((error) => {
      window.alert(error);
    });
});
history.pushState(null, null, window.location.href);

    // When the user attempts to go back, push the same state again to stay on the page
    window.onpopstate = function () {
        history.pushState(null, null, window.location.href);
    };