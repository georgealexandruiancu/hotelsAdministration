    import firebase from "firebase";

    const config = {
        apiKey: "AIzaSyD2RLUneKWZPYntqaD5ZpWIH1uUTD65lBQ",
        authDomain: "hotelsadministration.firebaseapp.com",
        databaseURL: "https://hotelsadministration.firebaseio.com",
        projectId: "hotelsadministration",
        storageBucket: "hotelsadministration.appspot.com",
        messagingSenderId: "131342378954"
    }
    const fire = firebase.initializeApp(config);
    export default fire;