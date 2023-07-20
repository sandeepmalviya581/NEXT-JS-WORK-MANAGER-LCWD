export default function ProfileLayout({children}){


    return (
        <div>
            <h1> this is profile header </h1>
               {children}
               <h1> this is profile footer  </h1>
        </div>
    )
}