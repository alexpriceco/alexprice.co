<?php
class Course{
    $CourseName;
    $units;
    $prereqs = new array();

    function __construct($CourseName, $units, $prereqs){
        $this->$CourseName=$CourseName;
        $this->$units=$units;
        $this->$prereqs=$prereqs;
    }
}

function getPath($major, $reqsFulfilled){
	$cleanArray=RmvSP(getCourses($major), $reqsFulfilled);
	$path=new array();
	for ($c=0; $c<count($cleanArray);$c+=2)
	{
		array_push($path, array(NULL , NULL));  //need to fix
	}

	$q=0;
	$c=0;
	while(count($cleanArray)>0){
		foreach($cleanArray as $x){ // $x=each object in $cleanArray
			if(count($x->$prereqs)==0){
				$path[q][c]=$x;
				if ($c==0){       //c and q define position in the $path 2darray
					$c++;
				}
				else{
					$c=0;
					q++;
				}
				foreach($cleanArray as $y){
					for($z=0; $z<count($y->$prereqs); $z++){
						if ($y->$prereqs[$z]==$x){
							unset($y->$prereqs[$z]);
							$z--;
						}
					}
				}
				unset($x);
				break;
			}
		}
	return $path;
}
array getCourses($major){
 switch ($major):
  case "Computer Science BS" :
     return getCMPSBSCourses();
}
public function getCMPSBSCourses(){
	$courses=new array();
	$AP3 = new Course("AP Credit", 5, array());
	$AP5 = new Course("AP Credit", 5, array());
	$prof = new Course("Professor Permission", 0, array());
	$5J = new Course("CMPS 5J", 5, array());
	$10 = new Course("CMPS 10", 5, array($5J));
	$12A = new Course("CMPS 12A/L", 7, array ($AP)));
	$12B = new Course("CMPS 12B/M",  , array($10 or $12A));
	$13H = new Course("CMPS 13H/L",  , array($prof));
	$19A = new Course("MATH 19A",  , array($AP3));
	$19B = new Course("MATH 19B",  , array($19A or $AP5));
	$20A = new Course("MATH 20A",  , array());
	$20B = new Course("MATH 20B",  , array());
	$23A = new Course("MATH 23A",  , array($19B or $20B));
	$AMS10 = new Course("AMS 10",  , array());
	$21 = new Course("MATH 21",  , array());
	$CMPE16 = new Course("CMPE 16",  , array());
	$CMPS101 = new Course("CMPS 101",  , array(($12B or $13H), $CMPE16, ($19B or $20B), $AMS10 or $21 or $22 or $23A));
//need to finish course list
return $courses;
}
function RmvSP($courses, $fps){
	for($i=0; $i<count($courses); $i++){
		foreach($fps as $a){
			for ($d=0; $d<count($courses[i]->$prereqs); d++){
				if ($a==$courses[i]->$prereqs[d]){
					unset($courses[i]->$prereqs[d]);
					$d--;
				}
			}
		}
	}
	return $courses;
}
foreach($prereqs as $x){
	if (!alreadyThere($x)){
		array_push(cleanArray, $x);
	}
}
public function alreadyThere($x){
	foreach($cleanArray as $j){
		if ($x->$name==$j->$name)
			return true;
	}
	return false;
}
?>
