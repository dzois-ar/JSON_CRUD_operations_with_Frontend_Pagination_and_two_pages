
//  αποθηκευει την main_data στο json
const ev_save_data = function () {
  console.log('>>>>>>> save data');
  sendData(main_data);

}

let ev_add_data_create = function (input, page) {
  /* δημιοργει και προθετη ενα καινουργιο attribute στην main_data
  * και την ζωγραφιζει στην html στην λιστα */
  console.log('------ev_add_data_create ');
  let ev_add_data = function () {
    
    console.log('------ev_add data');

    let input_new_value = document.getElementById(input).value;
    adding_data_the_page(input_new_value, page);
  }
  return ev_add_data;
}



/* δημιοργει και προθετη ενα καινουργιο attribute στην data_variable_name του object Paging
 και την ζωγραφιζει στην html στην λιστα */

/**  νεα key/vaule  στο object main_data.data*/
const adding_data_the_page = function (input_new_value, page) {
  console.log('------add to main_data');

  /* δημιουργει την variable last_position στην οποια υπολογιζει την τελευταια θεση του object data_variable_name*/
  let last_position = page.data_variable_name.length - 1;

  /* εκχωρουμε το vaule του key position του object data_variable_name στην variable  position_in_list*/
  if (last_position < 0) {
    position_in_list = 0;
   
  } else {
    position_in_list = page.data_variable_name[last_position].position;
  }

  // προσθετη στο property data_variable_name του object Paging το νεο key/vaule που δημιουργησε
  page.data_variable_name.push({ id: createUUID(), position: ++position_in_list, value: input_new_value });

  //καλει την μεθοδο set_last_page() απο το  object Paging
  page.set_last_page();

  //καλει την μεθοδο render() απο το  object Paging
  page.render();
}


/* δημιουργει μια random την demo_data
 ακομα εκχωρει την  demo_data στην main_data */
const ev_create_demo_data = async function (e) {

  console.log("###### create random demo data");
  // σβηνει οτι υπαρχρει στην html

  //εκχωρουμε στην variable now ποσα χιλιοστα του δευτερολεπτου εχουν περασει μεχρι σημερα απο την χρονο UNIX
  let now = new Date().getTime();
  //εκχωρουμε στην variable  demo_data atribute σε μορφη  json
  main_data = {
    'when': now,
    data: [
      // {id: 'afa08146-8e56-47ba-a828-fa9deaa87bc4', value: 'α'},
    ]

  };

  // εκχωρουμε στην variable demo_values ενα array που εχει για element  το value απο το atribute "value" του atribute data του αρχειου data.json
  const demo_values = ['αβγο', 'βαριδι', 'γατα', 'δασος', 'ελενη', 'ζωη', 'ηρθα', 'θιμαρι', 'ικαρια', 'κωστας', 'λουλουδι', 'μαρια', 'ναξος', 'ξηρα'];
  //εκχωρουμε στην variable ri εναν τυχαιο αριθμο με max = 12 και min = 6
  let ri = Math.floor(Math.random() * 8) + 6;
  console.log('ri :' + ri);
  // δημιουργουμε εναν αδειο array
  let random_list = [];
  for (let i = 0; i < ri; i++) { //loop οσο  το ri ειναι μεγαλητερο του i
    // εκχωρει στην random_list τα atribute "id" με value οτι μας δημιουγει η μεθοδος randomUUID() καθως και το  atribute "value" με value το element του array demo_values και με δεικτη το i
    random_list.push({ id: createUUID(), position: ++position_in_list, value: demo_values[i] });
  }
  //  εκχωρουμε στο atribute "data" της main_data σαν object την random_list
  main_data['data'] = random_list;
  paging_p1.data_variable_name = random_list;
  
  /* οριζουμε τις variable που μας ειναι χρησιμες για το pagination*/
  
  console.log("send demo data");
  await sendData(main_data);

  //καλει την μεθοδο set_last_page() απο το  object Paging
  paging_p1.set_last_page();
  //καλει την μεθοδο render() απο το  object Paging
  paging_p1.render();
  console.log("---------");
}

// παιρνει σαν παραμετρο το event και κανει το display των Elements li αναλογα με το ποτελσμα που βγαζει καθε φορα
function filterItems(e) {
  console.log('----------filterItems')
  // εκχωρουμε στην variable itemList το element με id data
  let itemList = document.getElementById('data');
  // Μετατρεπη σε πεζα οτι βρησκετε μεσα στο element  με id fiter 
  let text = e.target.value.toLowerCase();

  // εκχωρουμε στην variable items ολα τα lis  που εχουν ζωγραφηστη στο body
  let items = itemList.getElementsByTagName('li');
  // ξεχωριζει το καθε element απο το array που επιστρεφει η variable items
  for (let item of items) {
    //εκχωρουμε στην variable itemName το text απο το li
    let itemName = item.firstChild.textContent;
    /* συγκρινουμε καθε element της itemName που το εχουμε μετατρεψει σε πεζα με οτι εχουμε γραψει μεσα στο input  με id fiter 
    η indexOf μέθοδος επιστρέφει -1 εάν δεν βρεθεί η τιμή που ψαχνουμε.
    ετσι σε περιπτωση που η indexOf μας επιστρεψει κατι εκτος απο -1 θελουμε το li να εμφανιστει στην html 
    εννω αν ειναι -1 να μην εμφανιστει για αυτο και αλαζουμε το display */
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  };
}
