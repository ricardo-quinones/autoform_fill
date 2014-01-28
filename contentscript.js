// helper functions
function random_string(size){
  var str = "";
  for (var i = 0; i < size; i++){
      str += random_character();
  }
  return str;
}

function random_character() {
  var chars = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
  return chars.substr( Math.floor(Math.random() * 62), 1);
}

function full_name(contact_info) {
  return contact_info.first_name + contact_info.last_name;
}

function full_phone(contact_info) {
  return contact_info.phone_area_code + contact_info.phone_first_3 + contact_info.phone_last_4;
}

function full_address(contact_info) {
  return contact_info.address1 + " " + contact_info.address2 + " " + contact_info.city + ", " + contact_info.state + " " + contact_info.zipcode;
}

function email(contact_info) {
  if (contact_info.random_email != "true") return contact_info.email;
  return contact_info.email.split("@").join("+" + random_string(5) + "@");
}

// TODO - make regex selectors for field
var email_attribute_selector = "input[id*=email][name*=email][class*=email]";
var phone_attribute_selector = "";

// Grab contact info
chrome.storage.sync.get(null, function(contact_info) {
  // Fill in obvious fields
  if ($('input[type="email"]').length > 0) $('input[type="email"]').filter(':visible').val(email(contact_info));
  if ($('input[type="password"]').length > 0) $('input[type="password"]').filter(':visible').val(contact_info.password);

  // Handybook specific fields
  if ($('#transaction_first_name').length > 0) $('#transaction_first_name').filter(':visible').val(contact_info.first_name);
  if ($('#transaction_last_name').length > 0) $('#transaction_last_name').filter(':visible').val(contact_info.last_name);
  if ($('#transaction_full_name').length > 0) $('#transaction_full_name').filter(':visible').val(full_name(contact_info));
  if ($('#transaction_full_phone').length > 0) $('#transaction_full_phone').filter(':visible').val(full_phone(contact_info));
  if ($('#transaction_area_code').length > 0) $('#transaction_area_code').filter(':visible').val(contact_info.phone_area_code);
  if ($('#transaction_phone_first_3').length > 0) $('#transaction_phone_first_3').filter(':visible').val(contact_info.phone_first_3);
  if ($('#transaction_phone_last_4').length > 0) $('#transaction_phone_last_4').filter(':visible').val(contact_info.phone_last_4);
  if ($('#transaction_address').length > 0) $('#transaction_address').filter(':visible').val(contact_info.address1);
  // if ($('#transaction_address').length > 0) $('#transaction_address').filter(':visible').val(contact_info.address2);
  if ($('#card_number').length > 0) $('#card_number').filter(':visible').val(contact_info.credit_card);
  if ($('#card_code').length > 0) $('#card_code').filter(':visible').val(contact_info.cvc);
  if ($('#select_month').length > 0) $('#select_month').filter(':visible').val(contact_info.card_month);
  if ($('#select_year').length > 0) $('#select_year').filter(':visible').val(contact_info.card_year);
  if ($('#zipcode').length > 0) $('#zipcode').filter(':visible').val(contact_info.zipcode);
  if ($('#booking_zipcode').length > 0) $('#booking_zipcode').filter(':visible').val(contact_info.zipcode);
});
