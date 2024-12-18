const player1 ={
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE:3,
    PODER:3,
    PONTOS:0,
};

const player2 ={
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE:4,
    PODER:4,
    PONTOS:0,
};


 async function rolldice(){
    
    return Math.floor(Math.random() * 6)+1;

}

async function getRandonBlock() {

    let random = Math.random()
    let result 

    switch(true){
        case random < 0.33:
            result ="RETA"
            break;
        case random < 0.66:
            result ="CURVA"
            break;
        default:
            result ="CONFRONTO"
            break;

    }
    return result
}

async function logRollResult(characterName,block,diceResult,attribute){

        console.log(`${characterName} 🎲 Rolou um dado de ${block} ${diceResult}+ ${attribute} = ${diceResult+ attribute}`)
}
async function playRaceEngine(character1, character2){
    
    for(let round=1;round <=5; round++){
        console.log(`🏁 Rodade ${round}`);


        //sortear bloco
         let block =  await getRandonBlock();
         console.log(`Bloco:${block}`);


            // rolar dados 

    let diceResult1 = await rolldice();
    let diceResult2 = await rolldice();

    // teste de habilidade

    let totalTesteSkill1 =0;
    let totalTesteSkill2 =0;

    if(block ==="RETA"){
        totalTesteSkill1 =diceResult1 +character1.VELOCIDADE
        totalTesteSkill2 =diceResult2 +character2.VELOCIDADE

        await logRollResult(character1.NOME,"velocidade",diceResult1,character1.VELOCIDADE);
        
        await logRollResult(character2.NOME,"velocidade",diceResult2,character2.VELOCIDADE);

    }
    if(block ==="CURVA"){
        totalTesteSkill1 =diceResult1 +character1.MANOBRABILIDADE
        totalTesteSkill2 =diceResult2 +character2.MANOBRABILIDADE

        await logRollResult(character1.NOME,"manobrabilidade",diceResult1,character1.MANOBRABILIDADE);
        
        await logRollResult(character2.NOME,"manobrabilidade",diceResult2,character2.MANOBRABILIDADE);

        
    }
    if(block ==="CONFRONTO"){
        let powerResult1 = diceResult1 +character1.PODER
        let powerResult2 = diceResult2 +character2.PODER

         console.log(`${character1.NOME} confrotou com ${character2.NOME} 🥊🥊`)

         await logRollResult(character1.NOME,"Poder",diceResult1,character1.PODER);
        
         await logRollResult(character2.NOME,"Poder",diceResult2,character2.PODER);


         // IF TERNARIO ------------character2.PONTOS-= powerREsult1 >powerREsult2 && character2.PONTOS > 0 ? 1:0;
         if (powerResult1 > powerResult2 && character2.PONTOS > 0){

            console.log(`${character1.NOME} Venceu o Confronto ! ${character2.NOME} Perdeu um ponto`)
            character2.PONTOS--;
         }
         

         if (powerResult2 > powerResult1 && character1.PONTOS > 0){

            console.log(`${character2.NOME} Venceu o Confronto ! ${character1.NOME} Perdeu um ponto`)
            character1.PONTOS--;
         }
         

        
         if (powerResult1 === powerResult2){
            console.log("Confronto empatado!  Nenhum vencedor")
         } 
    }


    if (totalTesteSkill1>totalTesteSkill2){
        console.log(`${character1.NOME}  Marcou um ponto!`)
        character1.PONTOS++;
    }else if(totalTesteSkill2>totalTesteSkill1){
        console.log(`${character2.NOME} Marcou um ponto!`);
        character2.PONTOS++;
    }

    console.log("________________________________")
    

    }


}

async function declareWinner(character1, character2) {
    console.log("Resultado Final")
    console.log(`${character1.NOME}: ${character1.PONTOS} Ponto(S)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} Ponto(S)`)

    if(character1.PONTOS > character2.PONTOS){
        console.log(`\n${character1.NOME} Venceu a Corrida! Prabéns ${character1.NOME}`)
    }else if(character2.PONTOS > character1.PONTOS){
        console.log(`\n${character2.NOME} Venceu a Corrida! Prabéns ${character2.NOME}`)
    }else{
        console.log("Corrida Terminou em Empate")
    }

}

(async function main() {

console.log(`🏁🚨 Corrida entre o ${player1.NOME} e ${player2.NOME} começando ... \n`)

await playRaceEngine(player1, player2)
await declareWinner(player1,player2)
    
})();

