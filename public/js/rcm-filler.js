$(document).ready(function() {
    var $region = $("[name='region_id']");
    var $rcm = $("[name='rcm_id']");
    var rcms = [];

    // Event called when user change region entry.
    $region.on("change", function() {
        var $me = $(this);

        var id = $me.find('option:selected').val();
        if (!id) { return; }
        id = isNaN(id) ? null : parseInt(id);

        $rcm.html('');
        for (var i = 0; i < rcms.length; i++) {
            if (rcms[i].region_id == id) {
                $rcm.append('<option data-region="' + rcms[i].region_id + '" value="' + rcms[i].rcm_id + '">' + rcms[i].rcm_name + '</option>');
            }
        }
    });

    // Keeping all the RCM information into memory.
    $rcm.find('option').each(function() {
        var region = $(this).data("region");
        rcms.push({ region_id: region, rcm_id: $(this).val(), rcm_name: $(this).text().trim() });
    });

    // In case we arrive on the page and the region list is already filled.
    if (!isNaN($region.find('option:selected').val())) {
        var selectedRegion = $region.find('option:selected').val();
        $rcm.find('option').each(function() {
            var rcmRegion = $(this).data("region");
            if (selectedRegion != rcmRegion) {
                $(this).remove();
            }
        });
    } else {
        $region.trigger('change');
    }

});