import readlineSync from 'readline-sync';
const BaseURL = "http://localhost:3000"

function manu()
{
    console.log(`_____________________________________________________________
                 1.GET/greet(Query params)
                 2.POST/math/average(JSON body)
                 3.PUT/shout/:word(Path param)
                 4.DELETE/secure/resource(Header)
                 5.Call each server endpoint one after the other (in sequence)
                 6.Call all server endpoints in parallel
                 0.Exit
                 _____________________________________________________________`);
    
}


async function GETgreet(BaseURL)
{
    try
    {
        let name = readlineSync.question("Enter your name: ")
        let lang = readlineSync.question("Enter language (en | he | es): ")
        const response = await fetch(`${BaseURL}/greet?name=${name}&lang=${lang}`);
        
        if(!response.ok)
        {
            throw new Error(`http: ${response.status}`)
        }
        const data = await response.json();
        if(data){
            console.log(data);
            
            
        }
    }catch(error){
        console.error(`error: ${error.message}`);
        return null;
    }
}

async function POSTMathAverage(BaseURL)
{
    try{
        let numbersInput = readlineSync.question("Enter numbers separated by commas: ")
        let numbers = numbersInput.split(',').map(Number)
        const resource = await fetch(`${BaseURL}/math/average`,{
            method: "POST",
            headers:{
            "Content-Type": "application/json"
            },
        body: JSON.stringify({"numbers": numbers})}
        )
        if(!resource){
            throw new Error(`http: ${response.status}`)
        }
        const data = await resource.json()
        if (data) {
            console.log(data);
            
            
        }
    }catch(error){
        console.error(error.message);
        return null;
    }

    
}


async function PUTshoutWord(BaseURL)
{
    try{
        let word = readlineSync.question("Enter a word to shout: ")
        const resource = await fetch(`${BaseURL}/shout/${word}`,{
            method : "PUT",
            headers:{
            "Content-Type": "application/json"
            }
        })
        if(!resource){
            throw new Error(`http: ${response.status}`)
        }
        const data = await resource.json()
        if(data){
            console.log(data);
            
        }
    }catch(error){
        console.error(error.message);
        return null;
    }
}


async function DELETEsecureResource(BaseURL)
{
    try{
        let admin = readlineSync.question("Enter your role to access secure resource: ")
        const resource = await fetch(`${BaseURL}/secure/resource`,{
            method: "DELETE",
            headers:{"x-role": admin}
        })
        if(!resource){
            throw new Error(`http: ${response.status}`)
        }
        const data = await resource.json()
        if(data){
            console.log(data);
            
        }
    }catch(error){
        console.error(error.message);
        return null;
    }
}


function CallAllEndpointsSequentially(BaseURL)
{
  return  GETgreet(BaseURL).then(()=>POSTMathAverage(BaseURL))
.then(()=>PUTshoutWord(BaseURL))
.then(()=>DELETEsecureResource(BaseURL))
.then(()=>{
    console.log("All endpoints called in sequence");
}).catch((error)=>{
    console.error(`error: ${error.message}`);
})

}




function CallAllEndpointsInParallel(BaseURL)
{
    return Promise.all([
        GETgreet(BaseURL),
        POSTMathAverage(BaseURL),
        PUTshoutWord(BaseURL),
        DELETEsecureResource(BaseURL)
    ]).then((results)=>{
        console.log("All endpoints called in parallel");
    }).catch((error)=>{
        console.error(`error: ${error.message}`);
    })

}


async function main()
{

let bool = true
while(bool)
{
    manu()
    let choice = readlineSync.questionInt("Enter your choice: ")
    switch(choice)
    {
        case 1:
            await GETgreet(BaseURL);            
            break;  
        case 2:
            await POSTMathAverage(BaseURL);
            break;  
        case 3:
            await PUTshoutWord(BaseURL);
            break;
        case 4:
            await DELETEsecureResource(BaseURL);
            break;
        case 5:
            await CallAllEndpointsSequentially(BaseURL);
            break;
        case 6:
            await CallAllEndpointsInParallel(BaseURL);
            break;
        case 0:
            bool = false;
            console.log("Exiting...");
            break;

    }
}   
}

main();