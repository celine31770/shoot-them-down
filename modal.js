document.addEventListener('DOMContentLoaded', function() {
    //alert("modal");
$('.modal-click').click(function(){
//alert('slt');
    $('.modal-bg').css('display', 'block');
    $('.modal-content').css('display', 'block');
    //pour bloquer l'action du lien
    return false;
})

$('.modal-close').click(function(){
//alert('slt');
    $('.modal-bg').css('display', 'none');
    $('.modal-content').css('display', 'none');
    //pour bloquer l'action du lien
    return false;
})

$('.modal-click1').click(function(){
//alert('slt');
    $('.modal-bg').css('display', 'block');
    $('.modal-content1').css('display', 'block');
    //pour bloquer l'action du lien
    return false;
})

$('.modal-close1').click(function(){
//alert('slt');
    $('.modal-bg').css('display', 'none');
    $('.modal-content1').css('display', 'none');
    //pour bloquer l'action du lien
    return false;
})





//## FIN DU DOMContentLoaded
});
