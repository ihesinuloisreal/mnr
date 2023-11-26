import * as React from "react"
const ContestPreview: React.FC< { contest: object}> = ({contest, onClick, deleteContest}) => {
    
    
    const handleClick = (event) => {
        event.preventDefault();
        
        onClick(contest.id);
    } 
    const handleDelete = (event) => {
        event.preventDefault();
        deleteContest(contest.id)
        
    }
    
    
    return (
    <>
    
        <div className="contest-preview" onClick={handleClick}>
            <div className="category">{contest.categoryName}</div>
            <div className="contest">{ contest.contestName }</div>
        </div>
            <button onClick={handleDelete}>Delete</button>
            </>

    )
}
export default ContestPreview;