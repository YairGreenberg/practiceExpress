let readlineSync = require('readline-sync')
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
                 _____________________________________________________________`);
    
}


async function GETgreet(BaseURL,name)
{
    try
    {
        const response = await fetch(`${BaseURL}/greet?name=${name}&lang=en`);
        if(!response.ok)
        {
            throw new Error(`http: ${response.status}`)
        }
        const data = await response.json();
        if(data){
            console.log(data);
            
        }
    }catch(error){
        console.error(error.message);
        return null;
    }
}

// GETgreet(BaseURL);

async function POSTMathAverage(BaseURL)
{
    try{
        const resource = await fetch(`${BaseURL}/math/average`,{
            method: "POST",
            headers:{
            "Content-Type": "application/json"
            },
        body: JSON.stringify({"numbers": [10, 20, 30, 40]})}
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
// POSTMathAverage(BaseURL)


async function PUTshoutWord(BaseURL)
{
    try{
        const resource = await fetch(`${BaseURL}/shout/:word`,{
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

// PUTshoutWord(BaseURL)

async function DELETEsecureResource(BaseURL)
{
    try{
        const resource = await fetch(`${BaseURL}/secure/resource`,{
            method: "DELETE",
            headers:{"x-role": "admin"}
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

// DELETEsecureResource(BaseURL)

function CallAllEndpoints(BaseURL)
{
    GETgreet().then(()=>POSTMathAverage()
.then(()=>PUTshoutWord()
.then(()=>DELETEsecureResource())))
}

CallAllEndpoints(BaseURL)