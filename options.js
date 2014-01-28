(function(root) {
  root.FF = {
    save_options: function() {
      $(".form-field").each(function() {
        var object = {};
        object[$(this).attr('name')] = $(this).val();
        chrome.storage.sync.set(object);
      });

      // Update status to let user know options were saved.
      $('#status').html("Settings were saved.");
      setTimeout(function() { $('#status').html(); }, 750);
    },

    // Restores select box state to saved value from localStorage.
    restore_options: function() {
      chrome.storage.sync.get(null, function (contact_info) {
        for (var key in contact_info) {
          if (key == "random_email") { $('#' + key).prop('checked', true); }
          else { $("#" + key).val(contact_info[key]); }
        }
      });
    }
  };
})(this);

$(document).ready(function() {
  document.addEventListener('DOMContentLoaded', FF.restore_options());
  $('#save').click(function() { FF.save_options(); });
});