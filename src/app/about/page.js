async function timeTake() {

    await new Promise((reslolve)=>{
        setTimeout(reslolve, 5000);
    })
    
}



export default async function About(){
    await timeTake();

    return (
        <div>
            <h1>
                This is a about page...
            </h1>
        </div>
    )
}