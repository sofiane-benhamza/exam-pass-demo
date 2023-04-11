//generate questions array for testing
 
   
   let questions = Array.from({ length: 10 }, (_, i) => {
  return [
    `${i+1}. exemplaire d'une question`,
    'reponse possible, mais incorrect',
    'une autre reponse possible, mais aussi incorrect',
    'reponse possible, Correct',
    'reponse possible, Correct',
    20
  ];
});

    //references of elements outside X < main >
	const sec = $('span#seconds'), min = $('#minutes');
	var auto_putter, auto_counter, q = 0,userResult = Array(10).fill(0);
    const progress       = $('#progress-bar');
    const progressNumber = $('#progress-number');
    var updateExecuted = false;  

    const audioWrong       =  new Audio('wrong.mp3');
    const audioCorrect     =  new Audio('correct.mp3');
    const audioStart       =  new Audio('start.mp3');
    const audioNext        =  new Audio('next.mp3');
    const audioCongrats    =  new Audio('congrats.mp3');
    const audioAgain       =  new Audio('again.mp3');
    var clickNextQuestionPermitted = true;

    const $footer = $('footer'),$main = $('main');

//Start exam by clicking 'commencer' button

$('b').text(subject);$('section.progress').hide();

$('main > div > button').click(function(){
audioStart.play();
     $main.hide(500, function() {
        $main.html('<p></p><br><div><div></div><div></div><div></div><div>Je vais réviser mon cours <i class="bi bi-file-excel"></i></div></div>');
        $('section.progress').show(500);
        putter();
        userControl();
     });


});

function userControl(){

$('main > div > div').on('click',function () {
  var $event = event.target;
  if(clickNextQuestionPermitted){
    clearInterval(auto_counter);         // Stop counter
    if ($event.innerText == questions[q - 1][4]) {
      userResult[q - 1] = 1;
      $($event).css({'backgroundColor':'var(--correct)','animation':'correct .9s 1'}); //correct answer
      $('main > div').find('div').not($event).css('opacity','.2');
      audioCorrect.play();
    } else {
      $($event).css({'backgroundColor':'var(--wrong)','animation':'wrong .9s 1'}); //wrong answer
      audioWrong.play();
       
      $('main > div').find('div').filter(function() {              // colorize correct answer
        return $(this).text() === questions[q-1][4];
      }).css('backgroundColor', 'var(--correct)');
      
      $('main > div').find('div').not($event).filter(function() {
        return $(this).text() != questions[q-1][4];
      }).css('opacity', '.1');

    }
    
    clickNextQuestionPermitted = false;  // prevent user from answering
    clearTimeout(auto_putter);
    setTimeout(putter,3000);
  }
});

}


/*******TESTING***********/

   //q is double used, to calcul total time, and to index question
for (var i = 0; i < 10; i++) {
  q+=questions[i][5];
}
$('header i').html(parseInt(q/60)+'m&nbsp;'+q%60+'s'); //show total fixed time
q=0; //return to origin
 


//to make questions show randomly
  const array = [1, 2, 3];

  function randomSort(a, b) {
      return Math.random() - 0.5;
  }
 
//reorder showing possible answers
  function reorderQuestions(){

    let checkArray = [array[0], array[1], array[2]];

    while(checkArray[0] == array[0] || checkArray[1] == array[1] || checkArray[2] == array[2]){  
      array.sort(randomSort);
    }

  }

//the function controlls countdown and progress bar, and put questions and choices at random places
function putter(){
            $('main > div > div').css({'animation':'none','opacity':'1'});  //make things visible again
            
            if(updateExecuted){                 //fix that 10% default on first click
                update();
                audioNext.play();
            }
              updateExecuted = true;
 
	           clearInterval(auto_counter);
    	if(q<1){ 
                $main.hide(500);
              //define countdown time
 	           sec.text((questions[q][5]-1) > 9 ? (questions[q][5]):'0'+(questions[q][5]).toString());
              sec.css('animation', 'none');
  	          //put question
             $('main > div > div').css('backgroundColor','var(--beach)');
             $('main > p').text(questions[q][0]);                                                         
             reorderQuestions();
  	         $('main > div > div:nth-child(1)').text(questions[q][array[0]]); 
  	         $('main > div > div:nth-child(2)').text(questions[q][array[1]]);
  	         $('main > div > div:nth-child(3)').text(questions[q][array[2]]);
  	         //next question 
             q++;
             //call to next time
             auto_putter  = setTimeout(putter, questions[q-1][5]*1000); 
             //activate countdown
	           auto_counter = setInterval(counter,1000);                  
       }else{
             const sum = userResult.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
             $('main').html(`<section ><p class="flex-column animate__animated animate__zoomInRight"><span>${85}/10</span><button onclick="sendData()">Enregistrer</button></p><br></section>`);
             $('header > div:nth-child(3)').css('opacity','0');       //hide counter

             $('section > p').addClass('animate__animated animate__zoomInRight');
             sum > 5 ? audioCongrats.play() && $('main section p').css('animation', 'succes 1s infinite') : 
                       audioAgain.play()    && $('section > p > button').text('try again') && $('main section p').css('animation', 'fail 1s infinite');
             
       }
       $main.show(500);

       clickNextQuestionPermitted = true; //give user right to answer
}

//seconds countdown, controlled by questions's putter
function counter() {
  let sec_tmp = parseInt(sec.text()); 
  if (sec_tmp > 0) {
    sec.text(sec_tmp <= 10 ? '0' + (sec_tmp - 1).toString() : (parseInt(sec.text()) - 1).toString());
    if (sec_tmp < 11) {
      sec.css('animation', 'look-at-me 1s infinite');
    }
  }
}




//get date if needed
$(document).ready(function showDate(){
    const months     = ["Janvier", "Fevrier", "Mars", "Avril", "mai","juin", "Juillet", "aout", "September", "October", "November", "December"]
    , days       = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"]
    , date       = new Date()
    , month      = months[date.getMonth()]
    , day_name   = days[date.getDay()]
    , year       = date.getFullYear()
    , day        = date.getDate()
    , time       = day_name +"  "+day+"  "+ month +"  "+ year;
  });


//footer over main problem
$(document).ready(updateFooter);
$(window).resize(updateFooter);

function  updateFooter(){
     console.log('window : '+$(window).height());
     console.log('footer : '+($footer.position().top+$footer.height()));
     console.log('----------------------------');
    let statement = $(window).height() > $('body').height();
    if (statement) {
        $footer.css('position','relative');
        $('body').css('overflow-y','visible')
    } else {
        $footer.css('position','absolute');
        $footer.css('bottom','0');
        $('body').css('overflow-y','hidden')

    }

  // make the footer fixed to its position
  }
//progress bar updater
function update(){
       progress.width(parseInt(progressNumber.text())+10+'%');
       progressNumber.text(parseInt(progressNumber.text())+10+'%');
  }

//send data to server
function sendData() {
  $button = $('body > main > section > p > button');
    if($button.text() == 'try again'){
        $button.text('attendez ...');
      setTimeout(function() {location.reload();}, 3000);
    }else{
  console.log('ok sending ...');
   /*var xhr = new XMLHttpRequest();
   xhr.open("POST", "save_result.php", true);
   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   xhr.onreadystatechange = function() {
     if (xhr.readyState === 4 && xhr.status === 200) {
       console.log(xhr.responseText);
     }
   };
   const date = new Date();

   const passTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes();
   const sum = userResult.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
   const subject = "Matlab";

   const data = "id="+userId+"&subject="+subject+"&date="+passTime+"&note="+sum;
   xhr.send(data);*/
   $button.text('shared succesfully');
   }
   };

