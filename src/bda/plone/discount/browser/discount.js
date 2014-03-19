(function ($) {

    $(document).ready(function () {
        $('#input-discount_form_filter').bind(
            'change', discount_form.switch_form);
    });

    discount_form = {

        switch_form: function(event) {
            event.preventDefault();
            var selection = $(this);
            var wrapper = selection.parent();
            var target = bdajax.parsetarget(wrapper.attr('ajax:target'));
            bdajax.action({
                name: selection.val(),
                selector: '.disount_form_wrapper',
                mode: 'inner',
                url: target.url,
                params: target.params
            });
        },

        // set search criteria and execute source lookup
        _execute_source_lookup: function(request, callback, url) {
            discount_form.query(url, function(data, status, request) {
                callback(data);
            });
        },

        // autocomplete callback for user field
        autocomplete_user: function(request, callback) {
            discount_form._execute_source_lookup(
                request, callback, '@@autocomplete_user');
        },

        // autocomplete callback for group field
        autocomplete_group: function(request, callback) {
            discount_form._execute_source_lookup(
                request, callback, '@@autocomplete_group');
        },

        // query data for autocomplete dropdown criteria
        query: function(url, success) {
            $.ajax({
                url: url,
                dataType: 'json',
                success: success,
                error: discount_form.error,
                cache: false
            });
        },

        // alert error message if JSON request failed
        error: function(request, status, error) {
            bdajax.error('Querying Server Failed');
        }
    };

})(jQuery);
