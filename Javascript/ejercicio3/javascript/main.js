// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();
//var httpChannel = subject.
var data;
var arrayIdiomas = []
var costo=0;
var niveles=[];
var ban=false;
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://apiidiomas.firebaseapp.com/idiomas.json', true);

request.onload = function () {
   data = JSON.parse(this.response);
  //console.log(data);
  if (request.status >= 200 && request.status < 400) {
    var selectIdiomas = document.getElementById("idiomas");
    //el object.keys nos da los nombres de los idiomas
    var nomIdiomas = Object.keys(data);

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        var option = document.createElement("option");
        option.text = key;
        selectIdiomas.add(option,selectIdiomas[nomIdiomas.length]);
        //console.log(key);
       arrayIdiomas.push({
         idioma: key,
         ...data[key]
       })
      }
    }
    //
    

  } else
    console.log('error');
}

// Send request
request.send();

function myFunction() {
  /*if(ban){
    document.getElementsByClassName("aux")[0].removeChild(document.getElementById("aceptar"));
    ban=false;
  }
  */
  var selIdioma = document.getElementById("idiomas");
  var txt= selIdioma.options[selIdioma.selectedIndex].text;

  crearDiv(txt);

}

function crearDiv(txt){
  var desc, tot;
  //console.log(txt);

  //console.log(arrayIdiomas);
  var idioma= arrayIdiomas.find(obj => obj.idioma == txt);
  //console.log(idioma.niveles);
  desc=idioma.descuento.substr(0,2);
  desc=100-Number.parseInt(desc);
  //console.log(desc);


  //crear un div 
  var myDiv = document.createElement("div");
  myDiv.innerHTML="Idioma: "+txt+"<br>"+"Precio:  "+ idioma.precio+"<br>"+"Profesor:  "+ idioma.profesor+"<br>"+ "Descuento:  "+ idioma.descuento +"<br>"+ "Niveles:  ";

  var sel = document.createElement("select");
  sel.id=txt;
  llenarNiveles(sel, idioma.niveles);
  sel.onchange= cambioNivel.bind(this, txt);

  //console.log(sel.id);

  //generar id
  var uniqueId = 'id-' + Math.random().toString(36).substr(2, 16)+txt;

  myDiv.appendChild(sel);
  
  myDiv.id=uniqueId;
  //darle formato al div
  myDiv.style.width="200px";
  myDiv.style.display="block";
  myDiv.style.textAlign="center";
  myDiv.style.margin=20;
  //myDiv.style.color="#0000CD";
  
  document.getElementsByClassName("aux")[0].appendChild(myDiv);   
  //para el click del boton   

  tot=((Number.parseInt(idioma.precio))*desc)/100;
  costo+= tot;
  //console.log(costo);
  niveles.push({
    nombre: txt,
    total: tot+'',
    nivel: sel.options[sel.selectedIndex].text,
    id: uniqueId
  });
  //console.log(niveles);
}  

function llenarNiveles(select, array){
  var a= array.keys();

  for(i=0; i<array.length; i++){
    var option = document.createElement("option");
    option.text =array[i];
    select.add(option,select[a.length]);
  }
}


function aceptar(){
  //crear un div 
  var myDiv = document.createElement("div");

  var tx="";
  for(i=0; i<niveles.length; i++){
    var nom= document.createElement("p");
    var tot= document.createElement("p");
    var nivel= document.createElement("p");
    nom.appendChild(document.createTextNode("Idioma: "+ niveles[i].nombre));
    tot.appendChild(document.createTextNode("Total: "+ niveles[i].total));
    nivel.appendChild(document.createTextNode(node= "Nivel: "+niveles[i].nivel));
    console.log(niveles[i]);

    myDiv.appendChild(nom);
    myDiv.appendChild(tot);
    myDiv.appendChild(nivel);
    myDiv.appendChild(document.createElement("br"));
    console.log(niveles[i].id);
    console.log(typeof(document.getElementById(niveles[i].id)))
    document.getElementsByClassName("aux")[0].removeChild(document.getElementById(niveles[i].id));
  }
  var tot= document.createElement("p");
  tot.appendChild(document.createTextNode("Precio total de todos los cursos:  $"+ Math.floor(costo * 100) / 100));
  costo=0;
  myDiv.appendChild(tot);
  myDiv.style.width="90%";
  myDiv.id="aceptar";
  ban=true;
  document.getElementsByClassName("aux")[0].appendChild(myDiv); 
  console.log(tx);
  
}

function cambioNivel(id){
  var selNivel= document.getElementById(id);
  var nivel= selNivel.options[selNivel.selectedIndex].text;
  console.log(nivel);
  i= niveles.findIndex(x => x.nombre ===id);
  console.log(niveles[i].nivel);
  niveles[i].nivel=nivel;
}

