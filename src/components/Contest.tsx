import {useEffect, useState} from "react"
import { addNewNameToContest, fetchSingleContests } from "../api-client";
import Header from "./Header";


const Contest = ({initialContest, navigatecontest}) => {
    const [contest, setContests] = useState(initialContest);

    useEffect(() => {
        if (!contest.names) {
            fetchSingleContests(contest.id).then((contest) => {
                setContests(contest);
            });
        }
        
    },[contest.id, contest.names]);

    const HandleClick = (event) => {
        event.preventDefault();
        navigatecontest();
    }

    const handleNewNameSubmit = async (event) => {
        event.preventDefault();
        const newNameInput = event.target.newName;
        const updatedContest = await addNewNameToContest({
            contestId: contest.id, 
            newNameValue: newNameInput.value
        });
        setContests(updatedContest);
    }
    
    return (
        <>
            <Header message={contest.contestName}/>
            <div className="contest">
                <div className="title">Contest Description</div>
                <div className="description">{contest.description}</div>
                <div className="title">Proposed Name</div>
                <div className="body">
                    {contest.names?.length > 0 ? 
                        (
                        <div className="list">
                            {contest.names.map((proposedName)=>(<div key={proposedName.id} className="item">{proposedName.name}</div>
                            ))}
                        </div>
                        ) 
                        : (<div>No names proposed yet</div>)}
                </div>
                <div className="title">Proposed a new Name</div>
                    <div className="body">
                        <form onSubmit={handleNewNameSubmit}>
                            <input type="text" name="newName" placeholder="New Name Here..." />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                
                <a href="/" className="link" onClick={HandleClick}>Contest Link</a>
            </div>
        </>
    )
}
export default Contest;