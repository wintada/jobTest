import { useEffect } from "react"

const index = (props) => {

    const logic = (n) => {
        let table = []
        //Row
        for(let i=1;i<((2*n));i++) {
            let col = ''
            //Column
            if(i<=n) { 
                for(let j=1;j<=n*2;j++) {
                    if(j<=n) {
                        if(j<= i) col += j
                    } else {
                        
                        col += (x - y)
                    }
                }
            } else {

            }
        
            table.push(col)
        }
        console.log('x', table)
    }

    useEffect(()=> {
        logic(2)
    },[])
}

export default index