class Paging {
  //  αριθμος li που ζωγραφηζονται δε καθε σελιδα της html
  window_size = null;
  obj_name = null;
  div_data_el = null;
  div_prev_button_pag_el = null;
  div_num_button_pag_el = null;
  div_next_button_pag_el = null;
  new_rows_in_page = null;
  window_Button = null;
  data_variable_name = null;
  page = null;


  /*  constructor που παιρνει σαν παραμετρους data_variable_name, page, window_size, new_rows_in_page, window_Button
  για να που αρχικοποιηει ολες τις παραμετρους που χρησιμοποιει για την δημιουργεια του νεου object*/
  constructor(obj_name, data_variable_name, div_data_el, div_prev_button_pag_el, div_num_button_pag_el, div_next_button_pag_el, page, window_size, new_rows_in_page, window_Button) {
    this.obj_name = obj_name;
    this.page = page || null;
    this.div_data_el = (div_data_el == null) ? null : div_data_el;
    this.div_prev_button_pag_el = (div_prev_button_pag_el == null) ? null : div_prev_button_pag_el;
    this.div_num_button_pag_el = (div_num_button_pag_el == null) ? null : div_num_button_pag_el;
    this.div_next_button_pag_el = (div_next_button_pag_el == null) ? null : div_next_button_pag_el;
    this.window_size = window_size || 5;
    this.new_rows_in_page = new_rows_in_page || 2;
    this.window_Button = window_Button || 3;
    this.data_variable_name = data_variable_name;


  }



  /* ειναι μια μεθοδος του Paging που υπολογιζει την τελευταια page της και μας την επιστρεφει */
  get_last_page() {
    console.log('####get_last_page');

    let last_page = Math.round((this.data_variable_name.length - this.window_size) / this.new_rows_in_page) + 1;
    return last_page;
  }

  //  εκχωρη το vaule της page στην this.page
  set_page(page) {
    this.page = page;
  }

  // καλει την function set_page() με παραμετρο οτι μας επηστρεφει η function get_last_page()
  set_last_page() {
    this.set_page(this.get_last_page());
  }


  //  ειναι μια μεθοδος του Paging που μας ζωγραφιζει τα data στην HTML
  render() {
    console.log('>>>>>render_data');
    // διαγραφη ολα τα li και τα button του pagination στην html
    this.#clear_preview();

    //καλει την function inttialize_pagination() για να ζωγραφισει στην html την σωστη page
    let data = this.#inttialize_pagination();

    let mylist = data.page_data;


    /* zografizei ta <li> sthn html pairnontas apo thn main_data['data'] thn position kai to vaule
    san text tou <li> ka8os zvgrafizei kai ena delete button */
    for (let i in mylist) {
      let list_item_data = mylist[i];
      this.#renderListItem(i, list_item_data);
    }

    if (data.pages > 0) {
      // καλει την μεθοδο render_page_render_buttons του object Paging
      this.#renderButtonsPagination(data.pages);
    }

  }


  /* υπολογιζει ολες τις variable που ειναι χρησιμες για το pagination
  και παιρνει σαν παραμετρους τις page_data, page, rows*/
  #inttialize_pagination() {
    let data_variable_name = this.data_variable_name;
    let page = this.page;
    let new_rows_in_page = this.new_rows_in_page;

    console.log('######## inttialize pagination');
    let pages = Math.round((this.data_variable_name.length - this.window_size) / new_rows_in_page) + 1;

    /*ελεγχει αν το vaule της last_page ειναι μικροτρο απο το  vaule της state.page */
    page = (page >= pages) ? this.get_last_page() : page;
    this.page = page;

    let trimStart = (page == 1) ? page - 1 : (page - 1) * new_rows_in_page;
    if (this.page == pages) {
      trimStart = this.data_variable_name.length - this.window_size
    }
    if (trimStart < 0) {
      trimStart = 0;
    }

    let trimEnd = (trimStart + this.window_size);

    let trimPageData = (page == 0) ? data_variable_name.slice(0, data_variable_name.length) : data_variable_name.slice(trimStart, trimEnd);

    return {
      'page_data': trimPageData,
      'pages': pages,

    }

  }
  //  ειναι μια μεθοδος του Paging που ζωγραφιζει τα buttons τα pagination παιρνοντας σαν παραμετρο το pages
  #renderButtonsPagination(pages) {
    console.log('########render_buttons');

    let self = this;

    if (this.page != 1) {


      /**δημιουργει ενα button
       * με atribute id = pagination_prev
       * και atribute class = pagination_prev*/
      let button_previous = document.createElement('button');
      button_previous.innerText = '< Prev';
      button_previous.setAttribute("id", "pagination_prev");
      button_previous.setAttribute("class", "pagination_prev");

      /*δημιουργει ενα event στο button prev
      το οποιο μειωνει το state.page κατα 1
      και καλη την render_page() function με παραμετρο state.page*/
      button_previous.addEventListener('click', function (event) {
        self.page--;
        self.render();

      });
      // prev_button.append(button_previous);
      this.div_prev_button_pag_el.append(button_previous);
    }

    // zwxrafizei sto pagination_num_area
    if (this.page <= pages) {

      /**ελεγχει αν το vaule του  state.window_Button ειναι αρτιο η περριτο αριθμος
       * και αναλογος με ο αποτελεσμα υπολογιζει το maxLeft και το maxRight
       */
      let maxLeft = (this.window_Button % 2 == 0) ? this.page - (this.window_Button / 2) : this.page - Math.floor(this.window_Button / 2);
      let maxRight = (this.window_Button % 2 == 0) ? (this.page + (this.window_Button / 2) - 1) : this.page + Math.floor(this.window_Button / 2);
      /**ελεγχει το maxLeft να μαην ειναι μικοροτερο του 1 και
       * το  maxRight μεγαλητερο του pages*/
      if (maxLeft < 1) {
        maxLeft = 1;
        maxRight = this.window_Button;
      }

      if (maxRight > pages) {
        maxLeft = pages - (this.window_Button - 1);
        if (maxLeft < 1) {
          maxLeft = 1;
        }
        maxRight = pages;
      }

      /**ζωγραφιζει τα buttons του  pagination στην html*/
      for (let i = maxLeft; i <= maxRight; i++) {

        // let list_pagination = document.getElementById(self.div_num_button_pag);
        let pagination_numbers = document.createElement('button');
        pagination_numbers.setAttribute("class", `pagination_num_${self.obj_name}`);
        pagination_numbers.setAttribute("id", `pagination_num_${self.obj_name}`);


        /**εκχωρει στην num_pagination τον αριθμο απο το button του pagination που εχει
         * καλεσει το even και καλει την first_item_in_list() για να τα ζωγραφισει στην html
         */
        pagination_numbers.addEventListener('click', function (event) {
          self.page = Number(this.innerText);

          self.render();

        });
        //στην μεταβλητη text_button εκγχωρουμε το περιεχομενο του i
        let text_button = i;

        pagination_numbers.innerText = text_button;
        // προσθετουμε το button στην html
        self.div_num_button_pag_el.append(pagination_numbers);
      }

    }
    // zografizei sthn html to button <Next sto pagination
    if (this.page != pages) {
      /**δημιουργει ενα button
       * με atribute id = pagination_next
       * και atribute class = pagination_prev*/
      let button_next = document.createElement('button');
      button_next.setAttribute("class", "pagination_next");
      button_next.setAttribute("id", "pagination_next");
      button_next.innerText = 'Next >';
      //δημιουργει ενα Event Listener το οποιο προσθετη ενα στο this.page και καλει την function render_page()
      button_next.addEventListener('click', function (event) {
        self.page++;

        self.render();


      });
      // προσθετη το Event Listener στο button next
      this.div_next_button_pag_el.append(button_next);
    }
    // καλει την μεθοδο active_button του object Paging

    this.#active_button(this.page);
  }

  /**ειναι μια μεθοδος του Paging παιρνει σαν παραμετρο το page για να κανει
   * active σωστο button στο Element με Id  pagination_num_area*/
  #active_button = function (page) {
    console.log('####active_button');

    let self = this;
    
    let pagination_button = document.getElementsByClassName(`pagination_num_${self.obj_name}`);

    let new_active_button;

    let index_num = page;

    /*βρησκει ποιο button στο Element με  Class name : pagination_num
    εχει inner text ισο με το vaule της variable index_num
    και το κανει active  */
    for (let i = 0; i < pagination_button.length; i++) {
      let new_class = Number(pagination_button[i].innerText);

      if (new_class == index_num) {
        new_active_button = pagination_button[i];

      }
    }
    new_active_button.className += " active";
   
  }



  #clear_preview() {
    console.log('#######clear preview');
    this.div_data_el.innerHTML = '';
    this.div_prev_button_pag_el.innerHTML = '';
    this.div_num_button_pag_el.innerHTML = '';
    this.div_next_button_pag_el.innerHTML = '';
  }

  #renderListItem(i, list_data) {

    let list_li = document.createElement('li');
    let id = list_data['id'];


    /*ekxorei stiv variable list_position tnn position main_data['data'] kai sthn
    variable list_value to vaule main_data['data']*/
    let list_position = list_data['position'];
    let list_value = list_data['value'];


    list_li.innerText = `${list_position}.     ${list_value}`;
    /* dhmiourgei ena attribute se ka8e <li> me onoma 'id' kai analoga me to an einai
    i artio h perito dinei sto 'id' onoma "data_even" h data_odd"*/
    list_li.setAttribute('data-id', id);
    if (i % 2 == 0) {
      list_li.setAttribute("class", "data_even");
    } else {
      list_li.setAttribute("class", "data_odd");
    }
    // ta zografizi to <li> sthn html
    this.div_data_el.append(list_li);


    /*dimioyrgei to button delete tou dinei atribute ka8os kai ena EventListener
    *kai to pros8eti se ka8e li pou dimioyrgite*/
    let button_delete = document.createElement('button');
    button_delete.setAttribute("class", "delete_button");
    button_delete.setAttribute("id", `delete_button${this.div_data_id}`)

    let delete_handler = this.#createDeleteEventHandler();
    button_delete.addEventListener('click', delete_handler);
    list_li.append(button_delete);

    let create_span_text = document.createElement('span');
    create_span_text.setAttribute("class", "button__text");
    create_span_text.innerText = "Delete";
    button_delete.append(create_span_text);

    let create_span_icon = document.createElement('span');
    create_span_icon.setAttribute("class", "button__icon");
    button_delete.append(create_span_icon);

    let create_span_ion_icon = document.createElement('ion-icon');
    create_span_ion_icon.setAttribute("name", "trash-outline");
    create_span_icon.append(create_span_ion_icon);


  }

  #createDeleteEventHandler() {
    let self = this;

    const delete_index = function (array_index, self) {

      self.data_variable_name.splice(array_index, 1);

      /*ελεγχει αν τpaging.data_variable_name  περιεχει element
      αν εχει καλει την function render_page() για να τα ζωγραφισει στην html
      αν οχι καλει την function  clear_preview() που σβηνει οτι υπαρχρει στην html  */
      if (self.data_variable_name.length > 0) {
        // καλει την μεθοδο set_last_page() του object Paging
        self.set_last_page();
        //καλει την μεθοδο render() απο το νεο object που δημιουργισε
        self.render();
      } else {
        console.log('#there are no items in the list');

        self.#clear_preview();
      }
    };


    return function (e) {
      /*εκχωρει μεσα την variable my_list_element το γονιο του element το οποιο καλει το event
      *δηλαδη το  li που εχει παιδι στο συγκεκριμενο button*/

      let my_list_element = this.parentElement;
      let id = my_list_element.getAttribute('data-id');
      let position_data_for_delete = null;

      for (let i in self.data_variable_name) {
        let tmp_id = self.data_variable_name[i].id;
        if (tmp_id == id) {
          position_data_for_delete = i;
          delete_index(position_data_for_delete, self);
          break;
        }
      }
      if (position_data_for_delete == null) {
        console.log('index not found for id:', id);
      }
    }

  }

};