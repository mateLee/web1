let password = document.getElementById('pw');
let email = document.getElementById('email');
let cal = document.getElementById('cal');

// calendar setting
$.datepicker.setDefaults({
  dateFormat: 'yy-mm-dd',
  prevText: '이전 달',
  nextText: '다음 달',
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
  showMonthAfterYear: true,
  yearSuffix: '년'
});
// calendar event
cal.addEventListener('mousedown', function(){
  $("#cal").datepicker();
});

// password check
function validationPW(pw, options) {
  var o = {
    lower: 0,
    upper: 0,
    alpha: 0,
    numeric: 0,
    special: 0,
    length: [0, Infinity],
    custom: [],
    badWords: [],
    badSequenceLength: 0,
    noQwertySequences: false,
    noSequential: false
  };

  for (var property in options) {
    o[property] = options[property];
  }

  var re = {
    lower: /[a-z]/g,
    upper: /[A-Z]/g,
    alpha: /[A-Z]/gi,
    numeric: /[0-9]/g,
    special: /[\W_]/g
  },
  rule, i;

  // enforce min/max length
  if (pw.length < o.length[0] || pw.length > o.length[1]) {
    return false;
  }

  // enforce lower/upper/alpha/numeric/special rules
  for (rule in re) {
    if ((pw.match(re[rule]) || []).length < o[rule]) {
      return false;
    }
  }

  // enforce word ban (case insensitive)
for (i = 0; i < o.badWords.length; i++) {
  if (pw.toLowerCase().indexOf(o.badWords[i].toLowerCase()) > -1) {
    return false;
  }
}

// enforce the no sequential, identical characters rule
if (o.noSequential && /([\S\s])\1/.test(pw)) {
  return false;
}

// enforce alphanumeric/qwerty sequence ban rules
if (o.badSequenceLength) {
 var lower   = "abcdefghijklmnopqrstuvwxyz",
  upper   = lower.toUpperCase(),
  numbers = "0123456789",
  qwerty  = "qwertyuiopasdfghjklzxcvbnm",
  start   = o.badSequenceLength - 1,
  seq     = "_" + pw.slice(0, start);
 for (i = start; i < pw.length; i++) {
  seq = seq.slice(1) + pw.charAt(i);
  if (
   lower.indexOf(seq)   > -1 ||
   upper.indexOf(seq)   > -1 ||
   numbers.indexOf(seq) > -1 ||
   (o.noQwertySequences && qwerty.indexOf(seq) > -1)
  ) {
   return false;
  }
 }
}

// enforce custom regex/function rules
for (i = 0; i < o.custom.length; i++) {
 rule = o.custom[i];
 if (rule instanceof RegExp) {
  if (!rule.test(pw))
   return false;
 } else if (rule instanceof Function) {
  if (!rule(pw))
   return false;
 }
}

// great success!
return true;
}

password.addEventListener('keyup', valiPW, false);

function valiPW() {
  var str = password.value;
  console.log(str);
  var check = validationPW(str, {
    length:   [8, Infinity],
    lower:    1,
    upper:    0,
    numeric:  1,
    special:  1,
    badWords: [],
    badSequenceLength: 4
  });
  if (check) {
    console.log('success pw');
    document.getElementById('ierr').style.display = 'none';
  } else {
    console.log('error pw check');
    document.getElementById('ierr').style.display = 'inline';
  }
}

// email validation
email.addEventListener('keyup', valiE, false);
function valiE() {
  var e = email.value;
  var re = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (e.match(re)) {
    console.log('success email');
    document.getElementById('eerr').style.display = 'none';
  } else {
    console.log('error email check');
    document.getElementById('eerr').style.display = 'inline';
  }

}
