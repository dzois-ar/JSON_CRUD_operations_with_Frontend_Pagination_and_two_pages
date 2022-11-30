// δημιουργει ενα αδειο object με ονομα main_data
var main_data = {};
var main_data_p2 = {};
//Counter που αριθμη τα text τον li στην html
let position_in_list = 0;
let paging_p1;
let paging_p2;

// αδειο object
let queryDict = {}
location.search.substr(1).split("&").forEach(function (item) { queryDict[item.split("=")[0]] = item.split("=")[1] })
const getPageGetParam = function () {
  if (queryDict['page']) {
    return queryDict['page'];
  }
  return null;
}
// μετατρεπει το vaule της function getPageGetParam() σε Number
const url_page = Number(getPageGetParam());


/** εκχωρει τα key/vaule του json αρχειου στο  object main_data
 * και τα key/vaule  main_data.data στο object state.page_Data*/
let initialize_data = async function () {
  console.log('>>>>>>>> initialize_data');
  if (Object.keys(main_data).length === 0) {
    main_data = await getData();
  }
  if (Object.keys(main_data_p2).length === 0) {
    main_data_p2 = await getData();
  }
}



// προσθετη ενα event στα element id με btn_add_data, btn_save_data, btn_demo_data_create
let initialize_buttons_add_save_create_demo_data = function () {
  console.log("##########initialize_buttons");
  const ev_add_data_p1 = ev_add_data_create('in1', paging_p1);
  let button_add_data = document.getElementById('btn_add_data');
  button_add_data.addEventListener('click', ev_add_data_p1);
  const ev_add_data_p2 = ev_add_data_create('in2', paging_p2);
  let button_add_data_p2 = document.getElementById('btn_add_data_page2');
  button_add_data_p2.addEventListener('click', ev_add_data_p2);
  let button_save_data = document.getElementById('btn_save_data');
  button_save_data.addEventListener('click', ev_save_data);
}

//προσθετη ενα event  στο element id με filter
let initialize_search = function () {
  console.log("##########search");
  // εκχωρουμε στην variable filter το element με id filter
  let filter = document.getElementById('filter');
  // και προσθετουμε στην filter ενα event που θα ακουει σε ενα keyup event και θα καλει την function filterItems
  filter.addEventListener('keyup', filterItems);
}


const main = async function () {
  initialize_search();
  await initialize_data();
  console.log('fin');

  // δημιουργει δυο νεα object του object Paging 
  paging_p1 = new Paging('page1', main_data.data, document.getElementById('data'), document.getElementById('pagination_prev_area'), 
                         document.getElementById('pagination_num_area'), document.getElementById('pagination_next_area'));

  paging_p2 = new Paging('page2', main_data_p2.data, document.getElementById('data_page2'), document.getElementById('pagination_prev_area_page2'), 
                         document.getElementById('pagination_num_area_page2'), document.getElementById('pagination_next_area_page2'), 1);
  
  initialize_buttons_add_save_create_demo_data();

  let button_create_data = document.getElementById('btn_demo_data_create');
  button_create_data.addEventListener('click', function(e){
    
    
    ev_create_demo_data(e);
  });


  /* αν η variable url_page εχει vaule και ειναι μεγαλητερο απο το μηδεν
  δινει στην variable paging το vaule της url_page
  αλλιως εκχωρει σαν vaule στην variable paging οτι επιστρεφει η μεθοδο set_last_page() απο το object Paging()
  */

  if (url_page > 0) {
    paging_p1.set_page(url_page);
  } else {
    paging_p1.set_last_page();
  }
  
  //καλει την μεθοδο render() απο το νεο object που δημιουργισε
  paging_p1.render();
  paging_p2.render();

  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
}

/*οταν το εγραφο HTML εχει φορτωθει πληρως 
θα ενεργοποιηθει το event DOMContentLoaded που καλει την main function */
window.addEventListener('DOMContentLoaded', (event) => {
  main().then(() => {
    //οταν ολα τρεχει σωστα και  fin
    console.log('fin');
    //σε περιπτωση σφαλματος στην main()
  }).catch((e) => {
    //το ονομα του Error και message που στελνει το Event
    console.error(e.name + ':', e.message);
    //σε περιπτωση Error θα εμφανισει το ιχνος των function που κληθηκαν και ποια σειρα
    console.log(e.stack);
  });
});

