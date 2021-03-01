$("#linkedIn").click(() => {
    
}
$("#portPage").click(() => {
    if($("#portfolio").attr('class') == 'hide') {
        $("#portfolio").removeClass();
        $("#home").addClass('hide');
        $("#contactMe").addClass('hide');
    }
});
$("#homePage").click(() => {
    if($("#home").attr('class') == 'hide') {
        $("#home").removeClass();
        $("#portfolio").addClass('hide');
        $("#contactMe").addClass('hide');
    }
});
$("#contactPage").click(() => {
    if($("#contactMe").attr('class') == 'hide') {
        $("#contactMe").removeClass();
        $("#portfolio").addClass('hide');
        $("#home").addClass('hide');
    }
})