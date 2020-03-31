$(document).ready(function() {
    $("select#trierpar").change(function() {
        var $form = $(this).parents('form');
        $(this).addClass('d-none');
        $form.find('#loading').removeClass('d-none');
        $form.submit();
    });
});