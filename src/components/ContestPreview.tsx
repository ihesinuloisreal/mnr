import * as React from "react"
import {useState} from "react"
const ContestPreview: React.FC< { contest: object}> = ({contest, onClick, deleteContest}) => {
    const [contests, setcontests] = useState(contest)
    
    const handleClick = (event) => {
        event.preventDefault();
        
        onClick(contests.id);
    } 
    const handleDelete = (event) => {
        event.preventDefault();
        deleteContest(contests.id);
        const newList = Object.values(contests).filter((item)=>{
            return item !== contests.id
        })
        setcontests(newList);
        // console.log(newList);
        

    }
    
    
    return (
    <>
    
        <div className="contest-preview" onClick={handleClick}>
            <div className="category">{contests.categoryName}</div>
            <div className="contest">{ contests.contestName }</div>
        </div>
            <button onClick={handleDelete}>Delete</button>
            </>

    )
}
export default ContestPreview;