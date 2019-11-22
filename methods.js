var app = new Vue ({
    el: 'main',
    data:{
      search: '',
      rows: [
                  {'topic': 'math', 'location': 'hendon', 'price': 100, 'time': '12:30', 'length': 1.0 },
                  {'topic': 'math', 'location': 'colindale', 'price': 80, 'time': '14:00', 'length': 2.0},
                  {'topic': 'math', 'location': 'brent cross', 'price': 90, 'time': '16:30', 'length': 1.0},            
      ]},

  computed: {
    filteredAndSorted(){
     // function to compare names

    var topic = true;
    var location = true;
    var rowz;

     function compare(a, b) {
       if (a.topic < b.topic || a.topic> b.topic) {
        topic = false;
        return -1;
       }
       if (a.location < b.location || a.location> b.location) {
         location =false;
         return 1;
         }
       return 0;
     }
     
      if(topic){
        rowz = this.rows.filter(row => {
        return row.topic.toLowerCase().includes(this.search.toLowerCase())
     }).sort(compare)
      }

     return rowz;
    }
  }
})


    
//Checks if the fields in registration are all filled
var register = new Vue({
  el: '#registration',
  
  methods:{
    registerMethod: function(){
      var nameCheck = document.getElementById("newName").value;
      var emailCheck = document.getElementById("newEmail").value; 
      var passwordCheck = document.getElementById("newPassword").value;
      
      //checks if all fields are inputed
      if(nameCheck == "" || passwordCheck == "" || emailCheck == "" ){
        alert("Please fill ALL the fields");
        return false;
      }

      //checks if this input is a new email
      else if (localStorage.getItem(emailCheck) === null){
      //Stores the information in localstorage
      stored ="";
      var userObject ={};
      userObject.name = document.getElementById("newName").value;
      userObject.option = document.getElementById("options").value;
      userObject.newEmail = document.getElementById("newEmail").value; 
      userObject.newPassword = document.getElementById("newPassword").value;
      
        
      //Storing user information  
      localStorage.setItem([userObject.newEmail], JSON.stringify(userObject));
      //informing the user they have been registered 
      alert("You have been registered");}
      

      else{
        alert("This email exist, Please try again");
        return false;
        }
      }
    }
  })

//Login in function
var stored = "";
var login = new Vue({
  el: "#login",
  methods:{
    loggingIn: function(){
      var loggingInEmail = document.getElementById("email").value;
      var loggingInPassword = document.getElementById("password").value;

      //This checks if the email is in localStorage
     if(localStorage[loggingInEmail] === undefined){
     alert("Email not found. Please register to login.");
     return false;}

     else {
     stored = JSON.parse(localStorage[loggingInEmail]);}

     //checks if both email and password are correct
     if(stored.newEmail === loggingInEmail && stored.newPassword === loggingInPassword){
         if (stored.option == "Administrator"){
          localStorage.setItem(["current"], JSON.stringify(stored));
      alert("Welcome " + stored.name + " ,You can add, edit or delete any class as you wish")}

         else{
          localStorage.setItem(["current"], JSON.stringify(stored));
      alert("Welcome " + stored.name + " .You can check the classes that are avaliable")}
      }
      else{
        alert("Either email or password was incorrect. Please try again");
      }  
    }
  }
})

var current = JSON.parse(localStorage['current']);

//displays the details of the current user
var displayDetails = new Vue({
    el: '#display',
    data:{
    currents: {'name': current.name,
                'option': current.option,
                'email': current.newEmail,
                'password':current.newPassword}},

    methods:{
      logoutMehtod: function(){
        if(current != undefined){
          localStorage.removeItem('current')
          alert('You have been logged out');
        }
      }
    }           
})

//Checks if the user is administrator. If ture, add a new list
var addingMethod = new Vue({
  el: '#addingMethod',
  data: {
      seen: '',
      newTopic:'',
      newPrice: null,
      newLocation:'',
      newTime:'',
      newLength: null,},

       methods:{
        addNewClass: function(topic, price, location, time, length){


          if(current.option === 'Student'){
            alert("Sorry ONLY Administrator can add new classes")
          }

          else{
              app.rows.push({  
              topic: topic,
              location: location,
              price: price,
              time: time,
              length: length});

              this.newTopic='';
              this.newPrice='';
              this.newLocation='';
              this.newTime='';
              this.newLength='';}
              
        }, 
      }
})      

//localStorage.setItem([stored.name], JSON.stringify(stored))

      //if (loggingInEmail === localStorage[loggingInEmail]) <------ the input does not equal to the string
      