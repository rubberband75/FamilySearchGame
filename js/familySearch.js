FamilySearch.init({
	client_id: 'NQ3Q-PBD8-LL9N-RCLZ-MZCZ-X7P8-7SMX-RD6N',
	environment: 'production',
	redirect_uri: 'http://localhost:8000/auth/login/return/',
	http_function: $.ajax,
	deferred_function: $.Deferred//,
	//save_access_token: true,
	//auto_expire: true
});

function authenticate(){
	var defer = $.Deferred();
	FamilySearch.getAccessToken().then(function(response) {
		FamilySearch.getCurrentUser().then(function (response) {
            var user = response.getUser();
            console.log(user.id);
            ID = user.id;
            // return ID;

            FamilySearch.getAncestry(user.personId, {
                										generations: 3,
                										personDetails: true,
                										marriageDetails: true
	            									}
	            ).then(function (response) {
	               
	                var TREE =[];
	                var persons = response.getPersons(), person;

		            for (i = 1, len = 16 ; i < len; i++) {
		                if (response.exists(i)) {
		                    
		                    person = response.getPerson(i);		                    
		                    TREE.push(person);
		                    var parents = person
		                }
		            }
	                defer.resolve(TREE);
	        });
        });
	});
	return defer.promise();
}

function getUserID(){
	var ID = "temp";
	FamilySearch.getCurrentUser().then(function (response) {
            var user = response.getUser();
            console.log(user.id);
            ID = user.id;
            return ID;
        });
	
}

function run(TREE) {

	FamilySearch.getCurrentUser().then(function (response) {
		var playerID = response.getUser().personId;

		FamilySearch.getAncestry(playerID, {
                generations: 2,
                personDetails: true,
                marriageDetails: true
            }).then(function (response) {
                var persons = response.getPersons(), person;
                //console.log(persons);
                
                for (i = 1, len = persons.length + 1; i < len; i++) {
                    if (response.exists(i)) {
                        person = response.getPerson(i);

                        var name = person.$getDisplayName();
                        var id = person.id;
                        var tempPerson = new Person(0, name, id);
                        TREE.push(tempPerson);
                                  
                    }
                }

                console.log(TREE);
                defineParents(TREE);
        });

	});

}

function defineParents(TREE){
	for(var i = 0; i < TREE.length; i++){
		var user = TREE[i];
		var father = TREE[ ( i * 2 ) + 1 ];
		var mother = TREE[ ( i * 2 ) + 2 ];
		user.fatherID = father.ID;
		user.motherID = mother.ID;

		//var relationship  = {root: user, paternal: father, maternal: mother};
		var x = 0;		

	}
}

var ahnentafel = ['',
    'primary',
    'father',
    'mother',
    'paternal grandfather',
    'paternal grandmother',
    'maternal grandfather',
    'maternal grandmother'];