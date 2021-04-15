class Quiz {
  constructor(){}

  // storing gameState value 
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
  }

  // change gamestate 
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }


  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
    background("yellow");
    fill("blue");
    textSize(20);
    text(" *Note* - the contestant whoes answer is correct is highlighted in green colour", 130, 230);
    Contestant.getPlayerInfo();
    if(allContestants !== undefined){
      var dis = 260;
      var correctans = "2";
      for(var plr in allContestants){
        if(correctans === allContestants[plr].answer)
          fill("green");
        else
          fill("red");
        dis += 20;
        textSize(15);
        text(allContestants[plr].name + ":" + allContestants[plr].answer,130,dis);
      }
    }
    
  }

}
