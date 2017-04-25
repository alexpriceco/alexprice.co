function customDate() {
    var d = new Date();
    var t = d.getHours();

    var greeting = "Hello";

    if(t<=0 && t<6) {
        greeting = "Burning the midnight oil? ";
    }
    else if (6<=t && t<11) {
        greeting = "Good morning!";
    }
    else if (11<=t && t<15) {
        greeting = "Good day!";
    }
    else if (15<=t && t<18) {
        greeting = "Good afternoon!";
    }
    else if (18<=t) {
        greeting = "Good evening!";
    }
    else {
        greeting = "Howdy!";
    }
    document.getElementById("greeting").innerHTML = greeting;
}
customDate();
