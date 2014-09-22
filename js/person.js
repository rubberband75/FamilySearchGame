function PersonManager(){
	this.gen = 3;
	this.people = [];
	this.ramdomize = true;
	//this.Initialize();
  this.liveData = [];
}


function Person(value, name, ID, fatherID, motherID, container){
  this.value = value;
  this.name = name;
  this.ID = ID;
  this.fatherID = fatherID;
  this.motherID = motherID;
  this.childID = null;
  this.coupleID = null;
  this.container = container;
  
  this.CSSvalue = null;
  this.border = null;
}



PersonManager.prototype.Initialize = function(data){

  var me = this.people[0];
  me.CSSvalue = 2048;
  me.getTopGeneration(this.gen);
  //this.setBorderColor();
    
  return;
}


PersonManager.prototype.setLiveData = function(data) {
  console.log(Date());
  for(var i = 0; i < data.length; i++){
        this.liveData.push(new Person(0, data[i].display.name, data[i].id, null, null, this));
  }
  

  this.liveData[0].CSSvalue = 1;
  this.establishRelationships();
  this.people = this.liveData;
  this.people.shift();
  //this.Initialize();
  console.log(this.liveData);
}

PersonManager.prototype.establishRelationships = function(){
  for(var i = 0; i < this.liveData.length; i++){

    mother_position = ((i + 1) * 2);
    father_position = mother_position - 1;

    if(this.liveData.length > father_position) {
      //Set parents for child
      this.liveData[i].fatherID = this.liveData[father_position].ID;
      this.liveData[i].motherID = this.liveData[mother_position].ID;

      //Set child for parents
      this.liveData[father_position].childID = this.liveData[i].ID;
      this.liveData[mother_position].childID = this.liveData[i].ID;

      //Set Couple ID for paretns
      var coupleID = this.liveData[father_position].ID + this.liveData[mother_position].ID;
      this.liveData[father_position].coupleID = coupleID;
      this.liveData[mother_position].coupleID = coupleID;

      this.liveData[father_position].CSSvalue = this.liveData[i].CSSvalue * 2;
      this.liveData[mother_position].CSSvalue = this.liveData[i].CSSvalue * 2;


    }
  }
};



PersonManager.prototype.setBorderColor = function(){
  var val = 1;
  this.people[0].border = 0;

  for(var i = 1; i < this.people.length; i++){
    this.people[i].border = val;
    i++;
    this.people[i].border = val;
    val++;
  }

}

PersonManager.prototype.getPerson = function(ID){
	for(var i = 0; i < this.people.length; i++){
		if(this.people[i].ID.toString() == ID.toString()){
			return this.people[i];
		}
	}
	return null;
}

PersonManager.prototype.getGeneration = function() {
	return this.people[0].getTopGeneration(this.gen);
}




Person.prototype.getFather = function (){
  for(var i = 0; i < this.container.people.length; i++){    
    if(this.container.people[i].ID == this.fatherID){
      this.container.people[i].childID = this.ID;
      return this.container.people[i];
    }
  }
    
  return null;
}

Person.prototype.getMother = function (){
  for(var i = 0; i < this.container.people.length; i++){    
    if(this.container.people[i].ID == this.motherID){      
      this.container.people[i].childID = this.ID;
      return this.container.people[i];
    }
  }  
  return null;
}

Person.prototype.getTopGeneration = function(num){
  var currentGen = [];

  this.getGeneration(currentGen, num-1);

  if(true){
      currentGen = shuffle(currentGen);
    }

  return currentGen;
}

Person.prototype.buildTree = function(num){
  var tree = [];
  
  for(var i = num - 1; i >= 0; i--){
    var currentGen = [];
    this.getGeneration(currentGen, i);
    
    if(true){
      currentGen = shuffle(currentGen);
    }
    
    tree = arrayMerge([tree, currentGen]);
  }
  tree.push(this);
  this.CSSvalue = 2048;
  
  return tree;
}

Person.prototype.getGeneration = function(genArray, num){
  //var genArray = [];
  var father = this.getFather();
  var mother = this.getMother();
  var value = father.ID.toString().concat(mother.ID.toString());
  father.coupleID = value;
  mother.coupleID = value;
  
  var CSS = Math.pow(2, num+2);
  father.CSSvalue = CSS;
  mother.CSSvalue = CSS;


  
  if(num == 0){
    genArray.push(father);
    genArray.push(mother);
  }
  else{
    father.getGeneration(genArray, num - 1);
    mother.getGeneration(genArray, num - 1);
  }
  return genArray;
}

function shuffle(array) {
 
  var rand = [];  
  
  for(var i = (array.length - 1) ; i >= 0; i--) { 
    var pos = Math.floor(Math.random() * (i + 1));
    
    var temp = array[i];
    array[i] = array[pos];
    array[pos] = temp;    
    
    rand.push(array.pop());
  }
  
  return rand;
}


function arrayMerge(arrayArray){
  var temp = [];  
  for(var i = 0; i < arrayArray.length; i++){
    for(var j = 0; j < arrayArray[i].length; j++){
      temp.push(arrayArray[i][j]);
    }
  }
  return temp;
}

Array.prototype.append = function(arrayArray){
  for(var i = 0; i < arrayArray.length; i++){
    for(var j = 0; j < arrayArray[i].length; j++){
      this.push(arrayArray[i][j]);
    }
  }
  return this;
}
