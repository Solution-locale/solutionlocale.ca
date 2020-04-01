$(document).ready(function() {
    $("[name='region_id']").on("change", function() {
        // Getting the region's ID
        var $me = $(this);
        var id = $me.find('option:selected').val();
        if (!id) { return; }

        // Showing loading message on RCM drop down.
        var $rcm = $("[name='rcm_id']");
        $rcm.html('<option>Chargement en cours...</option>');

        // Sending request.
        $.getJSON('/mrc/json/'+id, function(rcms) {
            $rcm.html('');

            // Populating RCM drop down with results.
            $.each(rcms, function(idx, rcm) {
                $rcm.append('<option value="' + rcm.id + '">' + rcm.name + '</option>');
            });
        });
    });
});