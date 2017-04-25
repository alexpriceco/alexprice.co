function checkSecret(secret) {
    location.href='//localhost:4000/clients/' + secret +"/";
    return false;
}
